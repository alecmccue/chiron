import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, Button, Typography, Grid, Chip, Box } from '@mui/material';
import * as faceapi from "face-api.js";
import "./interview.css";
import PersonIcon from "@mui/icons-material/Person";
import { getAuth } from "firebase/auth";
import BubblingAvatar from "../../components/BubblingAvatar";
import Avatar from "@mui/material/Avatar";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast } from "react-toastify";

import { sendMessageToChat } from "../../chat";
import { gradeResponse } from '../../chat';  

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../Firebase";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Importing necessary Firestore functions


const q = [
    "Given the emphasis on cloud-based solution development in this role, can you describe a project where you designed, developed, and deployed a software solution on a cloud platform such as AWS, GCP, or Azure? Please walk us through your decision-making process in choosing the technology stack, how you ensured the application's scalability and security, and any challenges you faced during the deployment.",
    "One of the key responsibilities of this position is full-stack development with a focus on JavaScript, React, HTML/CSS, and other tools. Can you provide an example of a full-stack application you have worked on? Please detail your role in the development process, the technologies you used, how you separated concerns between the client and server-side, and how you contributed to the application's design and user experience.",
    "Considering the importance of Agile development practices and team collaboration for this role, how have you contributed to a positive team dynamic in a past software engineering project? Discuss how you participated in Agile processes, any challenges you and your team faced, how you overcame them, and how you have mentored or shared knowledge with fellow team members to improve project outcomes."
];

const Interview = ({ questions, message, setChatHistory }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState([])
    const [questionDisplayIndex, setQuestionDisplayIndex] = useState(0);
    const [jobsData, setJobsData] = useState([]); // State to hold the jobs data
    const [job, setJob] = useState("")
    const [company, setCompany] = useState("")
    const [requirements, setRequirements] = useState("")

    const [recognizedText, setRecognizedText] = useState("");
    const [listening, setListening] = useState(false);

    const videoRef = React.useRef();
    const canvasRef = React.useRef();
    const intervalRef = React.useRef();
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        const synth = window.speechSynthesis;
        console.log(q[questionDisplayIndex]);
        const u = new SpeechSynthesisUtterance(q[questionDisplayIndex]);

        setUtterance(u);

        return () => {
            synth.cancel();
        };
    }, [questionDisplayIndex]);
    const handlePlay = () => {
        const synth = window.speechSynthesis;

        if (isPaused) {
            synth.resume();
        }

        synth.speak(utterance);

        setIsPaused(false);
    };
    const handlePause = () => {
        const synth = window.speechSynthesis;

        synth.pause();

        setIsPaused(true);
    };

    const handleStop = () => {
        const synth = window.speechSynthesis;

        synth.cancel();

        setIsPaused(false);
    };

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();
    useEffect(() => {
        setRecognizedText(transcript);
        console.log(transcript); // Log the transcript when it changes
    }, [transcript]);

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    setListening(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setListening(false);
  };
  const navigate = useNavigate();

    // Function to fetch jobs data
    const fetchJobs = async () => {
        try {
            console.log(user.uid)
            const d = await getDoc(doc(firestore, "job", user.uid))
            console.log(d.data().company)
            setJob(d.data().job)
            setRequirements(d.data().requirements)
            setCompany(d.data().company)
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }

    };


    const isLastQuestion = () => {
        return questionDisplayIndex === q.length - 1
    }

    // const sendMessage = () => {
    //     console.log(job)
    //     console.log(company)

    //         sendMessageToChat(user, message, job, company, requirements, questions)
    //             .then(response => {
    //                 console.log(message)
    //                 const aiMessage = response.message;

    //                 console.log(aiMessage);

    //                 setChatHistory(prevHistory => [
    //                     ...prevHistory,
    //                     { sender: 'User', content: message },
    //                     { sender: 'AI', content: aiMessage },
    //                 ]);
    //             })
    //             .catch(error => console.error('Error:', error));
    //     };

    useEffect(() => {
        const loadModels = async () => {
            // sendMessage();
            const MODEL_URL = process.env.PUBLIC_URL + '/models';

            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]);
            await setModelsLoaded(true);
            startVideo();
        };
        fetchJobs()
        loadModels();
        // sendMessage()



        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);
  let previousEmotions = [];
  let toastTimeout = null;

  // Inside startVideo function
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: "100%" } })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video
              .play()
              .then(() => {
                console.log("Video playback started successfully.");
                handleVideoOnPlay(); // Call handleVideoOnPlay once video is playing
              })
              .catch((error) => {
                console.error("Error playing video:", error);
              });
          };
        } else {
          console.error("Video element not found.");
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
      });
  };

  const handleVideoOnPlay = () => {
    intervalRef.current = setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        }; // Use videoWidth and videoHeight
        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        if (resizedDetections.length > 0) {
          const emotions = resizedDetections.map((detection) => {
            const expressions = detection.expressions;
            let emotion = "";
            let maxConfidence = 0;
            for (const [emotionName, confidence] of Object.entries(
              expressions
            )) {
              if (confidence > maxConfidence) {
                maxConfidence = confidence;
                emotion = emotionName;
              }
            }
            return emotion;
          });
          // console.log("Emotions detected:", emotions);
          previousEmotions.push(emotions[0]); // Add the new emotion to the array
          if (previousEmotions.length > 3) {
            previousEmotions.shift(); // Remove the oldest emotion if the array exceeds 3
          }
          const happyCount = previousEmotions.filter(
            (e) => e === "happy"
          ).length;
          const sadCount = previousEmotions.filter((e) => e === "sad" || e !== "angry").length;

          clearTimeout(toastTimeout); 

          if (sadCount > 2  && happyCount === 0) {
            toastTimeout = setTimeout(() => {
              toast.warning("Try to Smile More!", {toastId:'anger1'});
              previousEmotions = [];
            }, 3000); // Delay the warning toast by 3 seconds
          } else if (happyCount ===3) {
            toastTimeout = setTimeout(() => {
              toast.success("Great job! You've been smiling a lot!", {toastId:'smile1'});
              previousEmotions = [];

            }, 3000); // Delay the happy toast by 3 seconds
          }
        }
        console.log(previousEmotions)

        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, displaySize.width, displaySize.height);
      }
    }, 5000);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>your browser doesnt support speech recognition</span>;
  }

  return (
    <div className="container-interview">
      <div className="inner-container">
        <div className="question-title">
          <Card sx={{ borderRadius: 4, boxShadow: 4, padding: "1rem" }}>
            {" "}
            {/* Adjust boxShadow and borderRadius as needed */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "10px",
                fontSize: "0.75rem",
              }}
            >
              {q[questionDisplayIndex]}
            </Typography>
          </Card>
          <div style={{ marginTop: "auto" }}>
            <Chip
              label={`Questions Left: ${q.length - questionDisplayIndex - 1}`}
              sx={{
                backgroundColor: "#C8E6C9",
                color: "black",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>
        <Grid container spacing={2} className="card-container">
          <Grid item>
            <Box
              sx={{
                height: "500px",
                width: "300px",
                bgcolor: "#E1E1E1",
                borderRadius: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Avatar
                alt="Chiron"
                src="https://media.istockphoto.com/id/941756036/vector/sagittarius-centaur-zodiac-horoscope-sign.jpg?s=612x612&w=0&k=20&c=SBzTUQEIfzmxxh3M8cfwUt4p9TvH5561lxwQM3zJqz8="
                sx={{ width: "60px", height: "auto" }}
              />
              <Chip
                avatar={
                  <Avatar
                    alt="Chiron"
                    src="https://media.istockphoto.com/id/941756036/vector/sagittarius-centaur-zodiac-horoscope-sign.jpg?s=612x612&w=0&k=20&c=SBzTUQEIfzmxxh3M8cfwUt4p9TvH5561lxwQM3zJqz8="
                  />
                }
                variant="outlined"
                label="Chiron"
                sx={{
                  position: "absolute",
                  zIndex: 5,
                  bottom: "1rem",
                  left: "1rem",
                  backgroundColor: "#00000052",
                  color: "#FFFFFFA1",
                  fontWeight: 700,
                }}
              />
            </Box>
          </Grid>
          <Grid item className="video-container">
            {modelsLoaded ? (
              <video
                className="video"
                ref={videoRef}
                onPlay={handleVideoOnPlay}
              />
            ) : (
              <div className="placeholder"></div>
            )}
            <canvas className="video" ref={canvasRef}></canvas>
            <Chip
              icon={
                <PersonIcon sx={{ "&.MuiChip-icon": { color: "#FFFFFF8A" } }} />
              }
              label={user ? user.displayName : "User"}
              sx={{
                position: "absolute",
                zIndex: 5,
                bottom: "1rem",
                left: "2rem",
                backgroundColor: "#00000052",
                color: "#FFFFFFA1",
                fontWeight: 700,
              }}
            ></Chip>
          </Grid>
        </Grid>
        <div>
          <button
            onClick={toggleListening}
            className="rounded-full bg-blue-500 p-2 m-2"
          >
            {listening ? <MicIcon /> : <MicOffIcon />}
          </button>
          <button
            onClick={handlePlay}
            className="bg-green-500 rounded-md text-white p-2 m-2"
          >
            <PlayArrowIcon />
          </button>
          <button
            onClick={handlePause}
            className="bg-yellow-500 rounded-md text-white p-2 m-2"
          >
            <PauseIcon />
          </button>
          <button
            onClick={handleStop}
            className="bg-red-500 rounded-md text-white p-2 m-2"
          >
            <StopIcon />
          </button>
          <p>{transcript}</p>
          <Grid item sx={{ marginLeft: "auto", marginTop: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (isLastQuestion()) {
                  navigate("/");
                  handleStop();
                  stopListening();
                } else {
                  setQuestionDisplayIndex((prevIndex) => prevIndex + 1);
                  gradeResponse(transcript)
                  
                  gradeResponse(0, transcript)
                  .then(gradingFeedback => {
                  console.log('Grading feedback:', gradingFeedback);
                  const feedback = gradingFeedback.message;
                  console.log(feedback);
                  })
                    handlePlay();
                }
              }}
            >
              {isLastQuestion() ? "End Call" : "Next Question"}
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Interview;

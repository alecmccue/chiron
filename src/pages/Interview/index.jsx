import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Typography, Grid, Chip, Box } from '@mui/material';
import * as faceapi from "face-api.js";
import './interview.css';
import PersonIcon from '@mui/icons-material/Person';
import { getAuth } from "firebase/auth"
import BubblingAvatar from "../../components/BubblingAvatar";

const questions = [
    "Given the emphasis on cloud-based solution development in this role, can you describe a project where you designed, developed, and deployed a software solution on a cloud platform such as AWS, GCP, or Azure? Please walk us through your decision-making process in choosing the technology stack, how you ensured the application's scalability and security, and any challenges you faced during the deployment.",
    "One of the key responsibilities of this position is full-stack development with a focus on JavaScript, React, HTML/CSS, and other tools. Can you provide an example of a full-stack application you have worked on? Please detail your role in the development process, the technologies you used, how you separated concerns between the client and server-side, and how you contributed to the application's design and user experience.",
    "Considering the importance of Agile development practices and team collaboration for this role, how have you contributed to a positive team dynamic in a past software engineering project? Discuss how you participated in Agile processes, any challenges you and your team faced, how you overcame them, and how you have mentored or shared knowledge with fellow team members to improve project outcomes."
];

const Interview = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState([])
    const [questionDisplayIndex, setQuestionDisplayIndex] = useState(0);

    const videoRef = React.useRef();
    const canvasRef = React.useRef();
    const intervalRef = React.useRef();

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';

            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]);
            setModelsLoaded(true);
            startVideo();
        };

        loadModels();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: '100%' } }) // Set width to '100%' for maximum width
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("error:", err);
            });
    };

    const handleVideoOnPlay = () => {
        intervalRef.current = setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight }; // Use videoWidth and videoHeight
                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                if (resizedDetections.length > 0) {
                    const emotions = resizedDetections.map(detection => {
                        const expressions = detection.expressions;
                        let emotion = '';
                        let maxConfidence = 0;
                        for (const [emotionName, confidence] of Object.entries(expressions)) {
                            if (confidence > maxConfidence) {
                                maxConfidence = confidence;
                                emotion = emotionName;
                            }
                        }
                        return emotion;
                    });
                    console.log('Emotions detected:', emotions);
                }

                canvasRef.current.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);
            }
        }, 100);
    };


    const interviewerPlayer = useRef(null);



    return (
        <div className="container-interview">
            <div className="inner-container">
                <div className="question-title">
                    <Card sx={{ borderRadius: 4, boxShadow: 4, padding: "1rem" }}> {/* Adjust boxShadow and borderRadius as needed */}
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', fontSize: "0.75rem" }}>
                            {questions[questionDisplayIndex]}
                        </Typography>
                    </Card>
                    <div style={{ marginTop: 'auto' }}>
                        <Chip
                            label={`Questions Left: ${questions.length - questionDisplayIndex}`}
                            sx={{ backgroundColor: '#C8E6C9', color: 'black', fontWeight: 'bold' }}
                        />
                    </div>
                </div>
                <Grid container spacing={2} className="card-container">
                    <Grid item>
                            <Box
                                sx={{
                                    height: '500px',
                                    width: '300px',
                                    bgcolor: '#E1E1E1',
                                    borderRadius: '1.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}
                            >
                                <BubblingAvatar />
                                <Chip
                                    icon={
                                        <PersonIcon sx={{ '&.MuiChip-icon': { color: '#FFFFFF8A' } }} />
                                    }
                                    label='Chiron'
                                    sx={{
                                        position: 'absolute',
                                        zIndex: 5,
                                        bottom: '1rem',
                                        left: '1rem',
                                        backgroundColor: '#00000052',
                                        color: '#FFFFFFA1',
                                        fontWeight: 700,
                                    }}
                                />
                            </Box>
                    </Grid>
                    <Grid item className="video-container">
                            {modelsLoaded ? (
                                <video className="video" ref={videoRef} onPlay={handleVideoOnPlay} />
                            ) : (
                                <div className="placeholder"></div>
                            )}
                            <canvas className="video" ref={canvasRef}></canvas>
                            <Chip
                                icon={
                                    <PersonIcon sx={{ '&.MuiChip-icon': { color: '#FFFFFF8A' } }} />
                                }
                                label={user ? user.displayName : "User"}
                                sx={{
                                    position: 'absolute',
                                    zIndex: 5,
                                    bottom: '1rem',
                                    left: '2rem',
                                    backgroundColor: '#00000052',
                                    color: '#FFFFFFA1',
                                    fontWeight: 700,
                                }}
                            ></Chip>
                    </Grid>
                </Grid>
                <Grid item sx={{ marginLeft: 'auto', marginTop: '10px' }}>
                    <Button variant="contained" color="primary" onClick={() => console.log('End Call')}>
                        End Call
                    </Button>
                </Grid>
            </div>
        </div>
    );
};

export default Interview;

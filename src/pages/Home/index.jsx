import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { Link } from "react-router-dom";
import InterviewModal from "../InterviewModal";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import { Button, Grid, Icon, Typography } from "@mui/material";
import { useState } from "react";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto w-[75rem]">
      <Navbar signOut={handleLogout} auth={auth} />
      <div className="container mx-auto rounded-lg overflow-hidden">
        <div className="py-8 px-4">
          <Typography variant="h2" align="center" className="mb-4 text-onyx">
            Welcome to Chiron!
          </Typography>
          <Typography variant="h5" align="center" className="mb-8 text-current">
            Your AI Interview Assistant
          </Typography>
          <div className="grid grid-cols-2 gap-20 mb-10 mt-10">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="p-8 bg-gradient-to-br from-[#32949a] to-onyx text-seasalt rounded-lg shadow-md"
            >
              <div className="flex">
                <div className="container float-left w-[20%]">
                  <svg
                    class="w-10 h-10 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"
                    />
                  </svg>
                </div>
                <div className=" container float-right">
                  <Typography variant="h5" className="mb-2 font-bold underline">
                    Feedback And Results!
                  </Typography>
                  <Typography variant="body1 p-1">
                    Chiron analyzes your interview performance and provides
                    detailed feedback. Learn from your mistakes and track your
                    progress over time. Receive metrics and insights to
                    understand your strengths and areas for improvement.
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="p-8 bg-gradient-to-bl from-[#32949a] to-onyx text-seasalt rounded-lg shadow-md"
            >
              <div className="flex">
                <div className="container float-left w-[20%]">
                  <svg
                    class="w-15 h-15 text-gray-800 dark:text-white float-start"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <div className=" container float-right">
                  <Typography variant="h5" className="mb-2 font-bold underline">
                    Find Job Opportunities
                  </Typography>
                  <Typography variant="body1 p-1">
                    Discover job opportunities tailored to your skills and
                    preferences through our in built portal and create mock
                    interviews for them. Or use your own custom job searchs to
                    practice interviewing for the positions that really matter
                    to you
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="p-8 bg-gradient-to-tr from-current to-onyx text-seasalt rounded-lg shadow-md"
            >
              <div className="flex">
                <div className="container float-left w-[20%]">
                  <svg
                    class="w-15 h-15 text-gray-800 dark:text-white float-start"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Zm2 9.387 4.684 1.562A1 1 0 0 0 22 17V7a1 1 0 0 0-1.316-.949L16 7.613v8.774Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div className=" container float-right">
                  <Typography variant="h5" className="mb-2 font-bold underline">
                    Facial Detection
                  </Typography>
                  <Typography variant="body1 p-1">
                    Chiron utilizes facial detection technology to ensure you
                    maintain a positive attitude during the interview. The
                    system analyzes your facial expressions in real-time and
                    evaluates your emotion and mood and provides helpful tips
                    and reminders to assist you
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="p-8 bg-gradient-to-tl from-[#32949a] to-onyx text-seasalt rounded-lg shadow-md"
            >
              <div className="flex">
                <div className="container float-left w-[20%]">
                  <svg
                    class="w-10 h-10 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5h7.586l-.293.293a1 1 0 0 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414l-2-2a1 1 0 0 0-1.414 1.414l.293.293H4V9h5a2 2 0 0 0 2-2Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div className=" container float-right">
                  <Typography variant="h5" className="mb-2 font-bold underline">
                    Tailor-Made Questions
                  </Typography>
                  <Typography variant="body1 p-1">
                    Chiron scans your resume using OCR generates tailor-made
                    questions based on it and the job you are interviewing for.
                    By analyzing your background and experiences, Chiron ensures
                    that the interview questions are relevant and meaningful.
                  </Typography>
                </div>
              </div>
            </Grid>
          </div>
          <div className="flex justify-center">
            <Button variant="contained" onClick={handleOpen} size="large">
              Create New Interview!
            </Button>
            <InterviewModal open={open} onClose={handleClose}>
            </InterviewModal>
          </div>
        </div>
      </div>
      <Link to="/login" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
};

export default Home;

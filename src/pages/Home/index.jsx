import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { Link } from "react-router-dom";
import InterviewModal from "../InterviewModal";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import { Button, Grid, Icon, Typography } from "@mui/material";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import UploadResume from "../UploadResume";
import BackgroundImage from './BackgroundImage.jpg'




const Home = ({ setJob, setRequirements, setCompany }) => {
  const [openInterviewModal, setOpenInterviewModal] = useState(false);
  const [uploadResumeModal, setUploadResumeModal] = useState(false);
  const handleJobModalOpen = () => {
    setOpenInterviewModal(true);
  };

  const handleJobModalClose = () => {
    setOpenInterviewModal(false);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  return (
      <>
        <Navbar signOut={handleLogout} auth={auth}/>

        <div
            style={{
              backgroundImage: `url(${BackgroundImage})`,
              backgroundSize: '100% 100%',
              top: 0,
              left: 0,
              margin: 0,
              padding: 0,
              zIndex: -1
            }}>
          <div
              className="container mx-auto w-[75rem]"
          >
            <div className="container mx-auto rounded-lg overflow-hidden">
              <div className="py-8 px-4">
                <Typography variant="h1" align="left" className="mb-4 text-onyx font-bold">
                  Chiron.
                </Typography>

                <div className="grid grid-cols-2 gap-20 mb-10 mt-10">
                  <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      className="p-8 bg-gradient-to-br from-DB6C53 to-onyx text-onyx rounded-lg shadow-xl"
                  >
                    <div className="flex">
                      <div className="container float-left w-[20%]">
                        <svg
                            className="w-10 h-10 text-gray-800 dark:text-onyx"
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
                      <div className=" container float-right" align="center">
                        <Typography variant="h6" className="mb-2 font-bold">
                          Feedback And Results
                        </Typography>
                        <Typography variant="body1 p-1" align="right">
                          Chiron analyzes your interview performance, provides
                          detailed feedback and tracks your progress over time.
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                      container
                      direction="row"
                      justifyContent="right"
                      alignItems="right"
                      className="p-8 bg-gradient-to-bl from-DB6C53 to-onyx text-onyx rounded-lg shadow-xl"
                  >
                    <div className="flex">
                      <div className="container float-left w-[20%]">
                        <svg
                            className="w-15 h-15 text-gray-800 dark:text-onyx float-start"
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
                        <Typography variant="h6" className="mb-2 font-bold" align="center">
                          Find Job Opportunities
                        </Typography>
                        <Typography variant="body1 p-1" align="right">
                          Discover job opportunities tailored to your skills and
                          preferences through our in built portal and create mock
                          interviews for them.
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                      container
                      direction="row"
                      justifyContent="right"
                      alignItems="right"
                      className="p-8 bg-gradient-to-tr from-DB6C53 to-onyx text-onyx rounded-lg shadow-xl"
                  >
                    <div className="flex">
                      <div className="container float-left w-[20%]">
                        <svg
                            className="w-15 h-15 text-gray-800 dark:text-onyx float-start"
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
                        <Typography variant="h6" className="mb-2 font-bold" align="center">
                          Facial Detection
                        </Typography>
                        <Typography variant="body1 p-1" align="right">
                          Chiron utilizes facial detection technology to ensure you
                          maintain a positive attitude during the interview.
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                      container
                      direction="row"
                      justifyContent="right"
                      alignItems="right"
                      className="p-8 bg-gradient-to-tl from- to-onyx text-onyx rounded-lg shadow-xl"
                  >
                    <div className="flex">
                      <div className="container float-left w-[20%]">
                        <svg
                            className="w-10 h-10 text-gray-800 dark:text-onyx"
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
                        <Typography variant="h6" className="mb-2 font-bold">
                          Tailor-Made Questions
                        </Typography>
                        <Typography variant="body1 p-1" align="right">
                          Chiron scans your resume using OCR generates tailor-made
                          questions based on it and the job you are interviewing for.
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                </div>
                <div className="flex justify-left">
                  <Button variant="contained" onClick={handleJobModalOpen} size="large"
                          sx={{fontWeight: 'bold', padding: '0.5rem', background: '#DB6C53', marginBottom: '1rem', color: '#32373B'}}>
                    Create New Interview
                  </Button>
                  <InterviewModal open={openInterviewModal} onClose={handleJobModalClose}>
                  </InterviewModal>
                </div>
                <div className="flex justify-left">
                  <Button variant="contained" onClick={() => setUploadResumeModal(true)} size="large"
                          sx={{fontWeight: 'bold', padding: '0.5rem', background: '#DB6C53', marginBottom: '10rem', color: '#32373B', paddingRight: '17px'}}>
                    Upload your Resume
                  </Button>
                  <UploadResume open={uploadResumeModal} onClose={() => setUploadResumeModal(false)}>
                  </UploadResume>
                </div>
              </div>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>

        </div>
      </>


)
  ;
};

export default Home;

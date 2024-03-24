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
            <div className="container mx-auto rounded-lg overflow-hidden min-h-screen">
              <div className="py-8 px-4">
                

              <div className="flex items-center justify-start space-x-4 ">
                <Typography variant = "h1" className="text-onyx font-bold ">
                  Chiron.
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleJobModalOpen}
                  size="large"
                  className="bg-DB6C53 text-onyx font-bold py-5 px-5"
                  sx={{fontWeight: 'bold', padding: '1rem', background: '#DB6C53'}}
                >
                  Create New Interview
                </Button>
                <InterviewModal open={openInterviewModal} onClose={handleJobModalClose} />

                <Button
                  variant="contained"
                  onClick={() => setUploadResumeModal(true)}
                  size="large"
                  className="bg-DB6C53 text-onyx font-bold py-5 px-5"
                  sx={{fontWeight: 'bold', padding: '1rem', background: '#DB6C53'}}
                >
                  Upload your Resume
                </Button>
                <UploadResume open={uploadResumeModal} onClose={() => setUploadResumeModal(false)} />
              </div>

                <div className="grid grid-cols-2 gap-20 mb-10 mt-10">
                  <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      className="p-8 bg-gradient-to-br from-DB6C53 to-onyx text-onyx rounded-lg shadow-xl"
                  >
                    <div className="flex">
                      <div className="icon-container float-left w-[20%]">
                        <svg
                            style={{ color: 'gray', position: 'relative', top: '30px' }}
                            className="w-15 h-15 text-gray-800 dark:text-onyx"                            
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
                      <div className="container float-right" align="center">
                        <Typography variant="h6" className="mb-2 font-bold">
                          Feedback And Results
                        </Typography>
                        <Typography variant="body1 p-1" align="right">
                          Chiron revolutionizes your interview preparation by offering 
                          personalized feedback and meticulously tracking your progress                        
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
                      <div className="icon-container float-left w-[20%]">
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
                          Discover your ideal job through Chiron's specialized portal, 
                          designed to match you with opportunities that align perfectly with your skills and preferences
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
                      <div className="icon-container float-left w-[20%]">
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
                          Our platform ensures you're presenting your best self, using facial detection technology to encourage a positive demeanor throughout your interview
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
                      <div className="icon-container float-left w-[20%]">
                        <svg
                            className="w-10 h-10 text-gray-800 dark:text-onyx float-start"
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
                          Chiron's advanced resume analysis uses OCR to generate questions specifically designed around your experiences and the role you're targeting
                        </Typography>
                      </div>
                    </div>
                  </Grid>
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

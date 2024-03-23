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
    <div className="container mx-auto">
      <Navbar signOut={handleLogout} auth={auth} />
      <div className="container mx-auto rounded-lg overflow-hidden shadow-sm ">
        <div className="py-8 px-4">
          <Typography variant="h2" align="center" className="mb-4">
            AI Interview Assistant!
          </Typography>
          <Typography variant="subtitle1" align="center" className="mb-8">
            AI Interview Assistant helps you prepare for your interviews by
            providing insights and feedback.
          </Typography>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              className="p-6 bg-gradient-to-br from-isabelline to-onyx text-white"
            >
              <div>
                <VideoChatIcon size={48} className="mb-4" />
                <Typography variant="h5" className="mb-2 font-bold">
                  Interview With AI!
                </Typography>
              </div>
              <Typography variant="body1">
                Train your interview skills using AI! Get live feedback on your question 
              </Typography>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              className="p-6 bg-gradient-to-br from-green-400 to-blue-600 text-white"
            >
              <Icon size={48} className="mb-4" />
              <Typography variant="h5" className="mb-2 font-bold">
                Grid 2
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              className="p-6 bg-gradient-to-br from-yellow-400 to-red-600 text-white"
            >
              <Icon size={48} className="mb-4" />
              <Typography variant="h5" className="mb-2 font-bold">
                Grid 3
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
          </div>
          <div className="flex justify-center">
            <Button variant="contained" onClick={handleOpen}>
              New Interview
            </Button>
            <InterviewModal open={open} onClose={handleClose}>
              <h2 id="modal-modal-title">Centered Modal</h2>
              <p id="modal-modal-description">
                This modal is centered in the middle of the screen.
              </p>
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

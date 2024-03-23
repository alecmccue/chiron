import {  signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { Link } from 'react-router-dom';
import InterviewModal from "../InterviewModal";
import { Button } from "@mui/material";
import { useState } from "react";

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
        <div>
            hi
            <Link to="/login" onClick={handleLogout}>
                Logout
            </Link>
            <Button variant="contained" onClick={handleOpen}>
                Open Modal
            </Button>
            <InterviewModal open={open} onClose={handleClose}>
                <h2 id="modal-modal-title">Centered Modal</h2>
                <p id="modal-modal-description">This modal is centered in the middle of the screen.</p>
            </InterviewModal>
        </div>
    )
}

export default Home
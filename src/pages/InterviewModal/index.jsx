import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const InterviewModal = ({ open, onClose, children }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: 600, // Adjust the width as needed
                    maxWidth: '90%', // Ensure it's responsive
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 4,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1, pt: 1 }}>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box p={2}>
                    {children}
                </Box>
            </Box>
        </Modal>
    );
};

export default InterviewModal
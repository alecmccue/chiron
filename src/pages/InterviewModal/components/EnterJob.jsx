import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const EnterJob = ({ onSubmit, handleNext }) => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ jobTitle, jobDescription });
        setJobTitle('');
        setJobDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='container p-2 pr-3'>
                <h1 className='text-xl p-2 ml-1'>Enter Job Information</h1>
            <TextField
                label="Job Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                sx={{padding:'5px', margin:'5px'}}
            />
            <TextField
                label="Job Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                sx={{padding:'5px', margin:'5px'}}

            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1, pt: 1 }}>
                <Button onClick={() => handleNext(4)} color="primary">
                    Next
                </Button>
            </Box>
            </div>
        </form>
    );
};

export default EnterJob;

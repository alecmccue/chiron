import React from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const CreateInterview = () => {
    const [title, setTitle] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = () => {
        // Handle submission logic here
        console.log('Job Title:', title);
        console.log('Job Location:', location);
        console.log('Job Description:', description);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Job Information
                </Typography>
                <TextField
                    label="Job Title"
                    value={title}
                    onChange={handleTitleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Job Location"
                    value={location}
                    onChange={handleLocationChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Job Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={handleDescriptionChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </CardContent>
        </Card>
    );
};

export default CreateInterview
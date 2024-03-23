import React from "react";
import { Modal, Box, Button, Card, CardContent, Typography, ButtonBase } from '@mui/material';

const ModalStart = ({ handleNext }) => {

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                Begin your job search
            </Typography>
            <Button onClick={() => handleNext(2)} variant="outlined" size="large" fullWidth>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" component="div">
                            Adzuna Search
                        </Typography>
                    </CardContent>
                </Card>
            </Button>
            <Box mt={2}>
                <Button onClick={() => handleNext(3)} variant="outlined" size="large" fullWidth>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Manual Job Search
                            </Typography>
                        </CardContent>
                    </Card>
                </Button>
            </Box>
        </Box>
    )
}

export default ModalStart
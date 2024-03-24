import React from "react";
import {
    Modal,
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    ButtonBase,
    CardActionArea,
    CardMedia,
} from "@mui/material";

const ModalStart = ({ handleNext }) => {
    return (
        <Box p={2} sx={{ backgroundColor: '#FFE8E0' }}>
            <div className="container flex w-auto">
                <Typography
                    variant="h4"
                    gutterBottom
                    className="mb-2 font-bold p-1 items-center text-onyx"
                >
                    Tell Us About The Role
                </Typography>
            </div>
            {/* Wrapping cards in a Box with display flex and a gap */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Card onClick={() => handleNext(2)}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            src="https://zunastatic-abf.kxcdn.com/assets/images/press/adzuna_logo/adzuna_logo.jpg"
                            alt="adzuna job search"
                            sx={{
                                maxHeight: "100px",
                                maxWidth: "100%",
                                width: "auto",
                                height: "auto",
                                marginLeft: "10px",
                                marginTop: "10px",
                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" className="mb-4 text-onyx font-bold">
                                Find Your Role Using Adzuna Search
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Find the role you are preparing for through Adzuna Search.
                                Search for the roles based on your location, job title, and
                                employment type.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card onClick={() => handleNext(3)}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            src="https://static.vecteezy.com/system/resources/thumbnails/009/223/045/small/modern-blue-low-poly-triangle-shapes-banner-background-free-vector.jpg"
                            alt="manually enter job"
                            sx={{
                                maxHeight: "140px",
                                maxWidth: "100%",
                                width: "100%",
                                height: "auto",
                                marginLeft: "10px",
                                marginTop: "10px"
                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" className="mb-4 text-onyx font-bold" color={"#FFE8E0"}>
                                Create Your Own Custom Roles
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Enter in the job title and your specified qualifications to get started with your interview.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Box>
    );
};

export default ModalStart;

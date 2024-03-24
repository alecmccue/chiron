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
    <Box p={2}>
      <div className="container flex w-auto">
        <Typography
          variant="h4"
          gutterBottom
          className="mb-2 font-bold p-1 items-center"
        >
          Select A Job
        </Typography>
      </div>
      <Card onClick={() => handleNext(2)}>
        <CardActionArea>
          <CardMedia
            component="img"
            src="https://zunastatic-abf.kxcdn.com/assets/images/press/adzuna_logo/adzuna_logo.jpg"
            alt="adzuna job search"
            sx={{
              maxHeight: "70px",
              maxWidth: "100%",
              width: "auto",
              height: "auto",
              marginLeft: "10px",
              marginTop: "10px"

            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Find Job With Adzuna Search
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Find your dream job with Chiron using the Adzuna Search API.
              Search for the jobs based on your location, job title, and
              employment type
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
              maxHeight: "70px",
              maxWidth: "100%",
              width: "100%",
              height: "auto",
              marginLeft: "10px",
              marginTop: "10px"
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             Enter Job Infomation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              If you have already found your dream job, fear not! Enter in the Job Title and Description and get started with your Interview!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ModalStart;

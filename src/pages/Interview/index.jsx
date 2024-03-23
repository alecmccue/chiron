import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import * as faceapi from "face-api.js";
import { deepPurple } from '@mui/material/colors';
import './interview.css';

const Interview = () => {
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [question, setQuestion] = useState('');

    const videoRef = React.useRef();
    const canvasRef = React.useRef();
    const intervalRef = React.useRef();

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';

            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]);
            setModelsLoaded(true);
            startVideo();
        };

        loadModels();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: '100%' } }) // Set width to '100%' for maximum width
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("error:", err);
            });
    };

    const handleVideoOnPlay = () => {
        intervalRef.current = setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight }; // Use videoWidth and videoHeight
                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                if (resizedDetections.length > 0) {
                    const emotions = resizedDetections.map(detection => {
                        const expressions = detection.expressions;
                        let emotion = '';
                        let maxConfidence = 0;
                        for (const [emotionName, confidence] of Object.entries(expressions)) {
                            if (confidence > maxConfidence) {
                                maxConfidence = confidence;
                                emotion = emotionName;
                            }
                        }
                        return emotion;
                    });
                    console.log('Emotions detected:', emotions);
                }

                canvasRef.current.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);
            }
        }, 100);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Grid container spacing={3} style={{ maxWidth: '100%' }}>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card sx={{ width: 'fit-content' }}>
                        <CardContent style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="h5" gutterBottom>
                                Interviewer
                            </Typography>
                            <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                        {modelsLoaded ? (
                            <video ref={videoRef} onPlay={handleVideoOnPlay} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ width: '100%', height: '100%', borderRadius: '10px', backgroundColor: 'black' }}></div>
                        )}
                        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Interview;

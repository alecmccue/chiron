// import React, { useEffect, useRef } from 'react';
// import * as faceapi from 'face-api.js';
//
// const FaceDetectionComponent = () => {
//     const [modelsLoaded, setModelsLoaded] = React.useState(false);
//     const [captureVideo, setCaptureVideo] = React.useState(false);
//
//     const videoRef = React.useRef();
//     const videoHeight = 480;
//     const videoWidth = 640;
//     const canvasRef = React.useRef();
//
//     React.useEffect(() => {
//         const loadModels = async () => {
//             const MODEL_URL = process.env.PUBLIC_URL + '/models';
//
//             Promise.all([
//                 faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//                 faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//                 faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//                 faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//             ]).then(setModelsLoaded(true));
//         }
//         loadModels();
//     }, []);
//
//     const startVideo = () => {
//         setCaptureVideo(true);
//         navigator.mediaDevices
//             .getUserMedia({ video: { width: 300 } })
//             .then(stream => {
//                 let video = videoRef.current;
//                 video.srcObject = stream;
//                 video.play();
//             })
//             .catch(err => {
//                 console.error("error:", err);
//             });
//     }
//
//     const handleVideoOnPlay = () => {
//         setInterval(async () => {
//             if (canvasRef && canvasRef.current) {
//                 canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
//                 const displaySize = {
//                     width: videoWidth,
//                     height: videoHeight
//                 }
//
//                 faceapi.matchDimensions(canvasRef.current, displaySize);
//
//                 const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
//
//                 const resizedDetections = faceapi.resizeResults(detections, displaySize);
//
//                 // Instead of drawing detections on the canvas, log emotions to console
//                 if (resizedDetections.length > 0) {
//                     const emotions = resizedDetections.map(detection => {
//                         const expressions = detection.expressions;
//                         let emotion = '';
//                         let maxConfidence = 0;
//                         for (const [emotionName, confidence] of Object.entries(expressions)) {
//                             if (confidence > maxConfidence) {
//                                 maxConfidence = confidence;
//                                 emotion = emotionName;
//                             }
//                         }
//                         return emotion;
//                     });
//                     console.log('Emotions detected:', emotions);
//                 }
//
//                 // Clear canvas
//                 canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
//             }
//         }, 100);
//     }
//
//     const closeWebcam = () => {
//         videoRef.current.pause();
//         videoRef.current.srcObject.getTracks()[0].stop();
//         setCaptureVideo(false);
//     }
//
//     return (
//         <div>
//             <div style={{ textAlign: 'center', padding: '10px' }}>
//                 {
//                     captureVideo && modelsLoaded ?
//                         <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
//                             Close Webcam
//                         </button>
//                         :
//                         <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
//                             Open Webcam
//                         </button>
//                 }
//             </div>
//             {
//                 captureVideo ?
//                     modelsLoaded ?
//                         <div>
//                             <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
//                                 <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
//                                 <canvas ref={canvasRef} style={{ position: 'absolute' }} />
//                             </div>
//                         </div>
//                         :
//                         <div>loading...</div>
//                     :
//                     <>
//                     </>
//             }
//         </div>
//     );
// }
//
// export default FaceDetectionComponent;

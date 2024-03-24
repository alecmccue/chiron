import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material"; // Import Material-UI components
import { auth, firestore } from "../../Firebase";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";

const Summary = () => {
    const [feedback, setFeedback] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;

    const location = useLocation();
    const { feedbackArr } = location.state || {}; // feedback will be your feedbackArray
    // Now you can use the feedback array in your Login component
    console.log(feedbackArr);
    console.log("ABNSJDBAHNBDSINAHELLLOOOOOOO");
    

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const feedbackDoc = await getDoc(doc(firestore, "feedback", user.uid));
                if (feedbackDoc.exists()) {
                    setFeedback(feedbackDoc.data().feedbackJSON);
                } else {
                    console.log("Feedback document does not exist");
                }
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };

        if (user) {
            fetchFeedback();
        }
    }, [user]); // Only run the effect if user changes

    return (
        <>
            <Navbar />
            <Card sx={{ maxWidth: 800, margin: "auto", marginTop: '3rem', marginBottom: '3rem', padding: 10, backgroundColor:"#FFE8E0"}}>
                <CardContent>
                    {feedback ? (
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="h4" align="center" className="font-bold">Interview Feedback</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" className="font-sm p-2 border-3 border-top-4 border-seasalt"><strong>Score:</strong> {feedback.score}%</Typography>
                                <Typography variant="body1" className="font-sm p-2 border-3 border-seasalt"><strong>Clarity:</strong> {feedback.clarity}</Typography>
                                <Typography variant="body1" className="font-sm p-2 border-3 border-seasalt"><strong>Depth:</strong> {feedback.depth}</Typography>
                                <Typography variant="body1" className="font-sm p-2 border-3 border-seasalt"><strong>Relevance:</strong> {feedback.relevance}</Typography>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container justifyContent="center">
                            <CircularProgress />
                        </Grid>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default Summary;

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material"; // Import Material-UI components
import { auth, firestore } from "../../Firebase";

const Summary = () => {
    const [feedback, setFeedback] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;

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
        <Card sx={{ maxWidth: 800, margin: "auto", marginTop: 20, padding: 10 }}>
            <CardContent>
                {feedback ? (
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2" align="center">Interview Feedback</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Score:</strong> {feedback.score}%</Typography>
                            <Typography variant="body1"><strong>Clarity:</strong> {feedback.clarity}</Typography>
                            <Typography variant="body1"><strong>Depth:</strong> {feedback.depth}</Typography>
                            <Typography variant="body1"><strong>Relevance:</strong> {feedback.relevance}</Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default Summary;

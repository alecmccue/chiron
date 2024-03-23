import { auth } from "../Firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';


const Login = () => {
    const handleGoogleLogin = ({ history }) => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    return (
        <Container maxWidth="xs">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: '100vh' }}
            >
                <Grid item style={{ marginBottom: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome to My App
                    </Typography>
                </Grid>
                <Grid item style={{ marginBottom: '20px' }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Please sign in to continue
                    </Typography>
                </Grid>
                <Grid item>
                    <Link to="/" onClick={handleGoogleLogin}>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            style={{ textTransform: 'none' }}
                        >
                            <img
                                src="https://img.icons8.com/fluent/24/000000/google-logo.png"
                                alt="Google Logo"
                                style={{ marginRight: '10px' }}
                            />
                            Sign in with Google
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login
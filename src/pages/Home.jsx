import {  signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { Link } from 'react-router-dom';

const Home = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            hi
            <Link to="/login" onClick={handleLogout}>
                Logout
            </Link>
            <Link to="create">
                <button>Show New Component</button>
            </Link>
        </div>
    )
}

export default Home
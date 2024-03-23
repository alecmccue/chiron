import {  signOut } from "firebase/auth";
import { auth } from "../Firebase";

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
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home
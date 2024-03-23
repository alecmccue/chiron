import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth"
import Login from "./pages/Login";
import Home from "./pages/Home";
import JobList from './pages/JobList';
function App() {
    const [user, setUser] = useState(null)

    onAuthStateChanged(auth, (user) => {
        setUser(user)
    })

    return (
        <div className="App">
            { user ?
                <JobList />
                :
                <Login />
            }
        </div>
    );
}

export default App;

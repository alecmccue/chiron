import './App.css';
import { useState } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth"
import Home from "./pages/Home";
import CreateInterview from "./pages/CreateInterview";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";

import JobList from './pages/JobList';
function App() {
    const [user, setUser] = useState(null)

    onAuthStateChanged(auth, (user) => {
        setUser(user)
    })

    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreateInterview />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

import './App.css';
import { useState } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth"
import Home from "./pages/Home";
import InterviewModal from "./pages/InterviewModal";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import JobList from './pages/JobList';
import Chat from './pages/Chat';

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
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<InterviewModal />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

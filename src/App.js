import './App.css';
import { useEffect, useState } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth"
import Home from "./pages/Home";
import InterviewModal from "./pages/InterviewModal";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import JobList from './pages/JobList';
import Chat from './pages/Chat';

import Interview from "./pages/Interview";
import AdzunaSearch from "./pages/InterviewModal/components/AdzunaSearch";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Charts from './pages/Charts/Charts';
function App() {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState("Ask me the beginning questions.")
    const [job, setJob] = useState("")
    const [company, setCompany] = useState("")
    const [requirements, setRequirements] = useState("")
    const [questions, setQuestions] = useState("")
    const [chatHistory, setChatHistory] = useState([]);

    onAuthStateChanged(auth, (user) => {
        setUser(user)
    })

    useEffect(() => {
        console.log(job)
    },[job])

    return (
        <>
        <ToastContainer/>
        <Router>
            <div className="App">
                <div className="content">
                    <Routes>
                        <Route path="/" element={
                            <Home
                                setJob={setJob}
                                setCompany={setCompany}
                                setRequirements={setRequirements}
                            />
                        } />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/charts" element={<Charts />} />
                        <Route path="/create" element={<InterviewModal />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/interview" element={
                            <Interview
                                user={user}
                                message={message}
                                job={job}
                                company={company}
                                requirements={requirements}
                                questions={questions}
                                setChatHistory={setChatHistory}
                            />
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
        </>
    );
}

export default App;

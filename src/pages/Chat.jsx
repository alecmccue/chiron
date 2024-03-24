import React, { useState } from 'react';
import { sendMessageToChat } from "../chat";
import { gradeResponse } from '../chat';

const Chat = () => {
    const [userID, setUserID] = useState('0');
    const [message, setMessage] = useState('');
    const [job, setJob] = useState('Software Engineer');
    const [company, setCompany] = useState('Google');
    const [requirements, setRequirements] = useState('3+ years in Python');
    const [questions, setQuestions] = useState('');

    const [chatHistory, setChatHistory] = useState([]);
    const [gradeHistory, setGradeHistory] = useState([]);

    const handleQuery = () => {
        const userMessage = message; // Store the current message to append to chat history
        const userJob = job;
        const userCompany = company;
        const userRequirements = requirements;
        const userQuestions = questions;
        sendMessageToChat(userID, message, job, company, requirements, questions)
            .then(response => {
            // Assuming the response object has a message property
            const aiMessage = response.message;
            
            // Update chat history with both the user's message and the AI's response
            setChatHistory(prevHistory => [
                ...prevHistory,
                { sender: 'User', content: message },
                { sender: 'AI', content: aiMessage },
            ]);

            // Call gradeResponse to grade the user's message
            return gradeResponse(userID, message); // You may adjust this to send the last AI's message for grading instead
            })
            .then(gradingFeedback => {
            console.log('Grading feedback:', gradingFeedback);
            const feedback = gradingFeedback.message;
            
            // Update grading history with the feedback
            setGradeHistory(prevHistory => [
                ...prevHistory,                
                { sender: 'user', content: gradingFeedback },
            ]);
            })
            .catch(error => console.error('Error:', error));
        };

    return (
        <>
            <h1>Chat with AI Assistant</h1>

            <div>
                <label htmlFor="userIDInput">User ID :</label>
                <input 
                    className = "border-1 border-onyx"
                    type="text" 
                    id="userIDInput" 
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="messageInput">Message:</label>
                <input 
                    className = "border-1 border-onyx"
                    type="text" 
                    id="messageInput" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="jobInput">Job :</label>
                <input 
                    className = "border-1 border-onyx"
                    type="text" 
                    id="jobInput" 
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="companyInput">Company :</label>
                <input 
                    className = "border-1 border-onyx"
                    type="text" 
                    id="companyInput" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="requirementInput">Requirements :</label>
                <input 
                    className = "border-1 border-onyx"
                    type="text" 
                    id="requirementInput" 
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="questionsInput">Questions :</label>
                <input 
                    className = "border-1 border-onyx"
                    type="text" 
                    id="questionsInput" 
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                />
            </div>

            <button onClick={handleQuery}>Send Message</button>

            <div style={{ marginTop: '20px', height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}
                className = "border-1 border-onyx">
                {chatHistory.map((msg, index) => (
                    <div key={index} style={{ margin: '10px 0' }}>
                        <b>{msg.sender}:</b> {msg.content}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Chat;

import React, { useState } from 'react';
import { sendMessageToChat } from "../chat";

const Chat = () => {
    const [userID, setUserID] = useState('0');
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleQuery = () => {
        const userMessage = message; // Store the current message to append to chat history
        sendMessageToChat(userID, message)
            .then(response => {
                // Assuming the response object has a message property
                const aiMessage = response.message;
                console.log(aiMessage);
                
                // Update chat history with both the user's message and the AI's response
                setChatHistory(prevHistory => [
                    ...prevHistory,
                    { sender: 'User', content: userMessage },
                    { sender: 'AI', content: aiMessage },
                ]);

                // Optionally clear the message input after sending
                setMessage('');
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <>
            <h1>Chat with AI Assistant</h1>

            <div>
                <label htmlFor="userIDInput">User ID:</label>
                <input 
                    type="text" 
                    id="userIDInput" 
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="messageInput">Message:</label>
                <input 
                    type="text" 
                    id="messageInput" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>

            <button onClick={handleQuery}>Send Message</button>

            <div style={{ marginTop: '20px', height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
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

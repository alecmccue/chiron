// chatRoutes.js
const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store conversation histories keyed by a unique identifier (e.g., userID or sessionID)
const conversationHistories = {};

router.post('/chat', async (req, res) => {
    const { userID, message } = req.body; // Expect userID to be sent with the request

    // Initialize conversation history for the user if it doesn't exist
    if (!conversationHistories[userID]) {
        conversationHistories[userID] = [
            { role: "system", content: "You are a helpful assistant." },
        ];
    }

    // Add the user's message to the conversation history
    conversationHistories[userID].push({ role: "user", content: message });

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4-0125-preview",
            messages: conversationHistories[userID],
        });

        const aiMessage = completion.choices[0].message.content;

        // Add the AI's response to the conversation history
        conversationHistories[userID].push({ role: "assistant", content: aiMessage });

        res.json({ message: aiMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching response from OpenAI');
    }
});

module.exports = router;

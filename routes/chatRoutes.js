const express = require('express');
const { OpenAI } = require('openai');
const fs = require('fs');

require('dotenv').config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store conversation histories keyed by a unique identifier (e.g., userID or sessionID)
const conversationHistories = {};
const responses = {};
const conversationState = {};

router.post('/chat', async (req, res) => {
    const { userID, message, job, company, requirements, questions } = req.body;

    console.log("ANSDJANDJASDI");
    console.log(company);
    // Initialize conversation history for the user if it doesn't exist
    if (!conversationHistories[userID]) {
        console.log(company);
        // Crafting a more directive rolePrompt for the AI
        const rolePrompt = `You are an interviewer known for your thorough and challenging questions. 
            Your role is to simulate a tough interview environment by asking probing questions related 
            to the role of ${job} at ${company}, and offer detailed feedback to help the candidate prepare better.`;
        
        // Content prompt directly instructing the AI on its role and expectations
        const contentPrompt = `The candidate has applied for the position of ${job} at ${company}, 
            which requires skills such as ${requirements}. The interview questions should test these areas. 
            Remember to provide feedback that is insightful and constructive, helping the candidate to understand areas of improvement. Make sure to ask exactly three questions at time. 
            If the user prompts something other than asking you to ask a question, then do not ask a question, just answer as the interviewer.
            Phrase the question like this:
            Question 1: startquestion/ *question content* endquestion/
            Question 2: startquestion/ *question content* endquestion/
            Question 3: startquestion/ *question content* endquestion/`;

        conversationHistories[userID] = [
            { role: 'system', content: `${rolePrompt} ${contentPrompt}` },
        ];
    }

    if (!responses[userID]) {
        responses[userID] = [];
    }

    if (!conversationState[userID]) {
        conversationState[userID] = { isFirstInteraction: true };
    }    

    // Add the user's message to the conversation history
    conversationHistories[userID].push({ role: "user", content: message });

    // Add the user's message to the response
    responses[userID].push({ role: "user", content: message });

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

router.post('/grade', async (req, res) => {
    const { userID, response } = req.body; // Assuming 'response' is what you want to grade

    // if (conversationState[userID].isFirstInteraction) {
    //     conversationState[userID].isFirstInteraction = false; // Update state
    //     return; 
    // }

    // Check if the conversation history exists to ensure context is available
    if (!responses) {
        return res.status(400).send({ error: "User conversation history not found." });
    }

    // Define a grading prompt based on the response and possibly the conversation context
    const gradingPrompt = `Given the role of a critical interviewer, grade the following response by the candidate: "${response}". Provide a detailed assessment that is quite harsh based on clarity, relevance, and depth scored out of 100, just list the number of points scored. 
    At the end, make to also provide a numerical grade (out of 100) in the format just the points scored, then To Format the clarity, relevance, depth, and score, make sure to return it as a JSON string that can be JSON parsed with no augmentation with the keys being clarity, relevance, depth, and score`;

    const messagesWithGradingPrompt = [        
        { 
            role: "user",
            content: response // The candidate's response you want to grade
        },
        { 
            role: "system",
            content: gradingPrompt // The grading instruction
        }
    ];

    try {
        // Use OpenAI's API to generate a grading assessment
        const gradingCompletion = await openai.chat.completions.create({
            model: "gpt-4-0125-preview",
            messages: messagesWithGradingPrompt
        });

        const gradingFeedback = gradingCompletion.choices[0].message.content;
        
        console.log(gradingFeedback);

        // Respond with the grading feedback
        res.json({ gradingFeedback });
    } catch (error) {
        console.error("Error fetching grading response from OpenAI", error);
        res.status(500).send('Error fetching grading response from OpenAI');
    }
});

module.exports = router;


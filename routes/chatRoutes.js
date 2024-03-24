// // chatRoutes.js
// const express = require('express');
// const { OpenAI } = require('openai');
// require('dotenv').config();

// const router = express.Router();
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Store conversation histories keyed by a unique identifier (e.g., userID or sessionID)
// const conversationHistories = {};

// router.post('/chat', async (req, res) => {
//     const { userID, message, job, company, requirements, questions } = req.body; // Expect userID to be sent with the request

//     const rolePrompt = `Imagine you're a highly critical interviewer known for your tough questioning style.
//         You provide candid, constructive feedback designed to significantly improve interview skills. 
//         After hearing a response, you meticulously analyze performance, highlighting both strengths and weaknesses in detail, 
//         and offer precise, actionable advice for improvement.`;

//     const contentPrompt = `You will brainstorm an interview question for a candidate doing an interview. 
//         The candidate is applying for the role ${job} at the company ${company}. 
//         The requirements for this job are the following: ${requirements}. 
//         The questions the candidate is already being asked are provided in an array here: ${questions} 
//         Please limit the question to one to two sentences and don’t repeat any other question. 
//         The question should be directed to the candidate in second person. 
//         Your answer should be in the format of a string.`;

//     // Initialize conversation history for the user if it doesn't exist
//     if (!conversationHistories[userID]) {
//         conversationHistories[userID] = [
//             { role: 'system', content: rolePrompt }, // Set the role behavior
//         ];
//     }

//     // Now, when you add the content prompt, ensure it's also part of a system message if it's for the AI to 'read' before user interaction:
//     conversationHistories[userID].push({ role: 'system', content: contentPrompt });

//     // Add the user's message to the conversation history
//     conversationHistories[userID].push({ role: "user", content: message });

//     try {
//         const completion = await openai.chat.completions.create({
//             model: "gpt-4-0125-preview",
//             messages: conversationHistories[userID],
//         });

//         const aiMessage = completion.choices[0].message.content;

//         // Add the AI's response to the conversation history
//         conversationHistories[userID].push({ role: "assistant", content: aiMessage });

//         res.json({ message: aiMessage });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error fetching response from OpenAI');
//     }
// });

// module.exports = router;

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
    const { userID, message, job, company, requirements, questions } = req.body;

    // Initialize conversation history for the user if it doesn't exist
    if (!conversationHistories[userID]) {
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
            Question 1: *question content* endquestion/
            Question 2: *question content* endquestion/
            Question 3: *question content* endquestion/`;

        conversationHistories[userID] = [
            { role: 'system', content: `${rolePrompt} ${contentPrompt}` },
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

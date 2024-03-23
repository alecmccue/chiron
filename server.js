require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors')

// For Accessing Job Listing
const PORT = 3001; 
const apiKey = process.env.ADZUNA_API_KEY;
const apiID = process.env.ADZUNA_API_ID;
const app = express();

const chatRoutes = require('./routes/chatRoutes');
app.use(express.json());
app.use(cors());
app.use(chatRoutes);

// For Querying to OpenAI 
const { OpenAI } = require('openai');
const readline = require('readline');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


app.get('/getJobs', async (req, res) => {    
    const country = req.query.country || 'us';
    const resultsPerPage = req.query.resultsPerPage || '5';
    const page = req.query.page || '1';
    const what = req.query.what || 'Software Engineer';
    const fullTime = req.query.fullTime || '1';

    // Construct the API URL with these parameters
    const apiUrl = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${apiID}&app_key=${apiKey}&results_per_page=${resultsPerPage}&what=${encodeURIComponent(what)}&full_time=${fullTime}`;

    try {
        const response = await axios.get(apiUrl);
        // console.log(response.data);
        // Send the data back to the client
        res.json(response.data);
    } catch (error) {
        console.error(error);
        // Send an HTTP 500 response if an error occurs
        res.status(500).send(error.toString());
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

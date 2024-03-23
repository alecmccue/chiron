require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors')

const PORT = 3001; 
const apiKey = process.env.ADZUNA_API_KEY;
const apiID = process.env.ADZUNA_API_ID;
const app = express();
app.use(cors());


app.get('/getJobs', async (req, res) => {    
    const country = req.query.country || 'us';
    const resultsPerPage = req.query.resultsPerPage || '5';
    const page = req.query.page || '1';

    // Construct the API URL with these parameters
    const apiUrl = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${apiID}&app_key=${apiKey}&results_per_page=${resultsPerPage}`;

    try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        // Send the data back to the client
        res.json(response.data);
    } catch (error) {
        console.error(error);
        // Send an HTTP 500 response if an error occurs
        res.status(500).send(error.toString());
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

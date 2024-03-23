require('dotenv').config();
const axios = require('axios');
const PORT = 3001;
const apiKey = process.env.ADZUNA_API_KEY;
const apiID = process.env.ADZUNA_API_ID;

function fetchJobs(country = "us", resultsPerPage = 5, page = 1) {
    const apiUrl = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${apiID}&app_key=${apiKey}&results_per_page=${resultsPerPage}`;

    return axios.get(apiUrl)
        .then(response => {
        console.log(response.data);
        return response.data;
        })
        .catch(error => {
        console.error(error);
        throw error;
        });
}

export function getJob(country = "us", resultsPerPage = 5, page = 1) {
    const queryParams = new URLSearchParams({
        country, 
        resultsPerPage, 
        page
    }).toString();

    return fetch(`http://localhost:${PORT}/getJobs?${queryParams}`)
        .then(response => response.json())
        .then(data => {
            if (data) {            
                console.log(data);
                console.log("hello");
                return data;
            } else {
                console.log('No data found');
                return null;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return Promise.reject(error);
        });
}

getJob();


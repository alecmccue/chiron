require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.ADZUNA_API_KEY;
const apiID = process.env.ADZUNA_API_ID;
const apiUrl = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${apiID}&app_key=${apiKey}&results_per_page=5`;

axios.get(apiUrl)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
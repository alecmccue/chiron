import React, { useState } from 'react';
import { getJob } from "../jobListing";

const JobList = () => {
    const [country, setCountry] = useState('us');
    const [resultsPerPage, setResultsPerPage] = useState('5'); // Default of 5 results per page
    const [page, setPage] = useState('1'); // Adding state for page number
    
    const handleGetJobs = () => {
        // Call the renamed imported function
        getJob(country, resultsPerPage, page)
            .then(data => {
                // console.log(data);
                // Process your data here. For example, display it in the component.
            })
            .catch(error => console.error('Error fetching jobs:', error));
    };

    return (
        <>
            <h1>Job List Query</h1>

            <label htmlFor="countryInput">Country:</label>
            <input 
                type="text" 
                id="countryInput" 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />

            <label htmlFor="resultsPerPage">Results per page:</label>
            <input 
                type="text" 
                id="resultsPerPage" 
                value={resultsPerPage}
                onChange={(e) => setResultsPerPage(e.target.value)}
            />

            <label htmlFor="pageInput">Page number:</label>
            <input 
                type="text" 
                id="pageInput" 
                value={page}
                onChange={(e) => setPage(e.target.value)}
            />

            <button onClick={handleGetJobs}>Fetch Jobs</button>
        </>
    );
};

export default JobList;
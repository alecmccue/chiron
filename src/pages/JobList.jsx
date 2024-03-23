import React, { useState } from 'react';
import { getJob } from "../jobListing";
import './css/joblist.css';

const JobList = () => {
    const [country, setCountry] = useState('us');
    const [resultsPerPage, setResultsPerPage] = useState('5');
    const [page, setPage] = useState('1');
    const [what, setWhat] = useState(''); // For job title or category
    const [fullTime, setFullTime] = useState(false); // Boolean to indicate full-time jobs

    const [jobs, setJobs] = useState([]); // State to store the job listings

    const handleGetJobs = () => {
        getJob(country, resultsPerPage, page, what, fullTime)
            .then(response => {
                setJobs(response.results); // Assuming the response has a 'results' field with the job listings
            })
            .catch(error => console.error('Error fetching jobs:', error));
    };

    return (
        <>
            <h1>Job List Query</h1>

            <div>
                <label htmlFor="countryInput">Country:</label>
                <input 
                    type="text" 
                    id="countryInput" 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="resultsPerPage">Results per page:</label>
                <input 
                    type="text" 
                    id="resultsPerPage" 
                    value={resultsPerPage}
                    onChange={(e) => setResultsPerPage(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="pageInput">Page number:</label>
                <input 
                    type="text" 
                    id="pageInput" 
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="whatInput">What:</label>
                <input 
                    type="text" 
                    id="whatInput" 
                    value={what}
                    onChange={(e) => setWhat(e.target.value)}
                />
            </div>

            <div>
                <label>
                    <input 
                        type="checkbox" 
                        checked={fullTime}
                        onChange={(e) => setFullTime(e.target.checked)}
                    />
                    Full Time Only
                </label>
            </div>

            <button onClick={handleGetJobs}>Fetch Jobs</button>

            <div className="job-listings">
                {jobs.map((job, index) => (
                    <div key={index} className="job">
                        <h2>{job.title}</h2>
                        <h3>{job.company.display_name}</h3>
                        <p>Location: {job.location.display_name}</p>
                        <p>Salary Range: ${job.salary_min} - ${job.salary_max}</p>
                        <p>Type: {job.contract_time}</p>
                        <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">View Job</a>
                    </div>
                ))}
            </div>
        </>
    );
};

export default JobList;
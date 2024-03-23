import React, { useState } from 'react';
import { getJob } from "../jobListing";
import './css/joblist.css';

const JobList = () => {
    const [country, setCountry] = useState('us');
    const [resultsPerPage, setResultsPerPage] = useState('10');
    const [page, setPage] = useState('1');
    const [what, setWhat] = useState(''); // For job title or category
    const [fullTime, setFullTime] = useState(false); // Boolean to indicate full-time jobs

    const [jobs, setJobs] = useState([]); // State to store the job listings

    const [selectedJob, setSelectedJob] = useState(null);

    const handleGetJobs = () => {
        getJob(country, resultsPerPage, page, what, fullTime)
            .then(response => {
                setJobs(response.results); // Assuming the response has a 'results' field with the job listings
                if (response.results.length > 0) {
                    setSelectedJob(response.results[0]); // Automatically select the first job
                }                
            })
            .catch(error => console.error('Error fetching jobs:', error));
    };

    const handleSelectJob = (job) => {
        setSelectedJob(job); // Set the selected job to the job that was clicked
      };

    return (
        <>
            <h1>Job List Query</h1>
        
            <div className="filter-container">
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
            </div>            
            
            <div className="main-container">
            <div className="job-listings">
                {jobs.map((job, index) => (
                    <div key={index} className="job" onClick={() => handleSelectJob(job)}>
                        <h2>{job.title}</h2>
                        <h3>{job.company.display_name}</h3>
                        <p>Location: {job.location.display_name}</p>
                        <p>Salary Range: ${job.salary_min} - ${job.salary_max}</p>
                        <p>Type: {job.contract_time} / {job.contract_type}</p>                        
                        <a href={job.redirect_url} target="_blank" rel="noopener noreferrer" className="view-job-button">View Job</a>
                    </div>
            ))}
            </div>
                {selectedJob && (
                    <div className="job-details">
                        <h2>{selectedJob.title}</h2>
                        <h3>{selectedJob.company.display_name}</h3>
                        <p className="job-description">
                            {selectedJob.description.endsWith('\u2026') ? (
                                <>
                                    {selectedJob.description.replace(/\u2026/g, '')}
                                    {' '}
                                    <a href={selectedJob.redirect_url} target="_blank" rel="noopener noreferrer" className="read-more">
                                        Read More
                                    </a>
                                </>
                            ) : (
                                selectedJob.description
                            )}
                        </p>
                        
                        <p>Location: {selectedJob.location.display_name}</p>
                        <p>Salary Range: ${selectedJob.salary_min} - ${selectedJob.salary_max}</p>
                        <p>Type: {selectedJob.contract_time} / {selectedJob.contract_type}</p>
                        <a href={selectedJob.redirect_url} target="_blank" rel="noopener noreferrer">Apply Now</a>
                    </div>
                )}
            </div>
        </>
    );
};

export default JobList;

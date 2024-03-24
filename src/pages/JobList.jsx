import React, { useState } from 'react';
import { getJob } from "../jobListing";
import './css/joblist.css';
import 'tailwindcss/tailwind.css'; // Tailwind utilities come after

const JobList = () => {
    const [country, setCountry] = useState('us');
    const [resultsPerPage, setResultsPerPage] = useState('30');
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
            <h1 style={{ fontFamily: 'Arial, sans-serif' }} className='text-3xl font-bold bg-isabelline text-onyx' >Chiron</h1>
            
            <div style={{ fontFamily: 'Arial, sans-serif' }} className='filter-container font-bold bg-isabelline text-onyx' >
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
                    <label htmlFor="whatInput">Job Title:</label>
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

                <button onClick={handleGetJobs} style={{ fontFamily: 'Arial, sans-serif' }} className = "border-2 border-current bg-sienna text-seasalt font-bold px-3 py-1" >Fetch Jobs</button>
            </div>            
            
            <div className="main-container bg-isabelline">
                <div className="job-listings bg-white border-t-4 border-r-8 border-sienna">
                    {jobs.map((job, index) => (
                        <div key={index} className="job border border-b-7 border-onyx rounded-none" onClick={() => handleSelectJob(job)}>
                            <h2 className="text-onyx text-3xl font-bold">{job.title}</h2>
                            <h3 className = "text-current text-2xl font-bold">{job.company.display_name}</h3>
                            <p className = "text-onyx font-bold">Location: {job.location.display_name}</p>
                            <p className="text-onyx font-bold text-sm">
                                {job.salary_min !== job.salary_max ? (
                                    `Salary Range: ${new Intl.NumberFormat('en-US').format(Math.round(job.salary_min))} - ${new Intl.NumberFormat('en-US').format(Math.round(job.salary_max))}`
                                ) : (
                                    `Salary: $${new Intl.NumberFormat('en-US').format(Math.round(job.salary_min))}`
                                )}
                            </p>
                                                                            
                        </div>
                ))}
                </div>
                {selectedJob && (
                    <div className="job-details border-t-4 border-l-8 border-sienna">
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
                        <p className="text-onyx font-bold text-sm">
                                {selectedJob.salary_min !== selectedJob.salary_max ? (
                                    `Salary Range: ${new Intl.NumberFormat('en-US').format(Math.round(selectedJob.salary_min))} - ${new Intl.NumberFormat('en-US').format(Math.round(selectedJob.salary_max))}`
                                ) : (
                                    `Salary: $${new Intl.NumberFormat('en-US').format(Math.round(selectedJob.salary_min))}`
                                )}
                            </p>  
                        <p>Type: {selectedJob.contract_time} </p>
                        <a href={selectedJob.redirect_url} target="_blank" rel="noopener noreferrer">Apply Now</a>
                    </div>
                )}
            </div>
        </>
    );
};

export default JobList;

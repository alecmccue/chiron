import React, { useEffect, useState } from "react";
import "react-icons/ri";
import "../../css/joblist.css";
import "tailwindcss/tailwind.css"; // Tailwind utilities come after

import { FaMoneyCheck } from "react-icons/fa";
import { RiSuitcaseFill } from "react-icons/ri";
import { FaPlaneArrival } from "react-icons/fa";
import { Card, Input, Typography,Button } from "@mui/material";
import { AddLocation, Paid, Search } from "@mui/icons-material";
import { getJob } from "../../../jobListing";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../../Firebase";
import { getAuth } from "firebase/auth";
import { sendMessageToChat } from "../../../chat";

const AdzunaSearch = ({ setJob, setRequirements, setCompany, handleClose }) => {
    const navigate = useNavigate()
    const [country, setCountry] = useState("us");
    const [resultsPerPage, setResultsPerPage] = useState("30");
    const [page, setPage] = useState("1");
    const [what, setWhat] = useState(""); // For job title or category
    const [fullTime, setFullTime] = useState(false); // Boolean to indicate full-time jobs
    const [chatHistory, setChatHistory] = useState("")
    const [jobs, setJobs] = useState([]); // State to store the job listings

    const [selectedJob, setSelectedJob] = useState(null);

    const handleGetJobs = () => {
        getJob(country, resultsPerPage, page, what, fullTime)
            .then((response) => {
                setJobs(response.results); // Assuming the response has a 'results' field with the job listings
                if (response.results.length > 0) {
                    setSelectedJob(response.results[0]); // Automatically select the first job
                }
            })
            .catch((error) => console.error("Error fetching jobs:", error));
    };

    const handleSelectJob = (job) => {
        setSelectedJob(job); // Set the selected job to the job that was clicked
    };
    const auth = getAuth();
    const user = auth.currentUser;

    const createMockInterview = async() => {
        // await setDoc(doc(firestore, "job", user.uid), {
        //     company: selectedJob.company.display_name,
        //     requirements: selectedJob.description,
        //     job: selectedJob.title
        // });

        const company =  selectedJob.company.display_name
        const requirements = selectedJob.description
        const job = selectedJob.title
        const message = "ask me about the interview questions"
        const questions = ""

        const response = await sendMessageToChat(user, message, job, company, requirements, questions)
            // .then(response => {
            //     setDoc(doc(firestore, "questions", user.uid), {
            //         ready: false
            //     });
                console.log(message)
                const aiMessage = response.message;

                console.log(aiMessage);

                const questionsArray = aiMessage.split('startquestion/').filter(question => question.trim() !== '').map(question => question.split('endquestion/')[0]);
                console.log(questionsArray)

                await setDoc(doc(firestore, "questions", user.uid), {
                    questions_array: questionsArray.slice(1)
                    // ready: true
                });

                setChatHistory(prevHistory => [
                    ...prevHistory,
                    { sender: 'User', content: message },
                    { sender: 'AI', content: aiMessage },
                ]);

                navigate("/interview")
            // })
            // .catch(error => console.error('Error:', error));
    }

    return (
        <div className="">
            <h1
                style={{ fontFamily: "Montserrat, sans-serif" }}
                className="text-3xl font-bold bg-seashell text-onyx pt-1 pl-9 ml-1"
            >
                Job Search
            </h1>
            <div
                style={{ fontFamily: "Montserrat, sans-serif" }}
                className="filter-container font-bold bg-seashell text-onyx"
            >
                <div className="grid grid-cols-2">
                    <div className="m-auto p-1">
                        <label htmlFor="countryInput">Country:</label>
                        <Input
                            type="text"
                            variant = "outlined"
                            id="countryInput"
                            value={country}
                            onChange={(e) => setCountry(e.target.value.toLowerCase())}
                            className="border-isabelline p-1"
                        />
                    </div>
                    <div>
                        <div className="m-auto p-1">
                            <label htmlFor="whatInput" className="m-auto p-1">
                                Job Title:
                            </label>
                            <Input
                                type="text"
                                id="whatInput"
                                value={what}
                                onChange={(e) => setWhat(e.target.value)}
                                className="border-isabelline p-1"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <label>
                        <input
                            type="checkbox"
                            checked={fullTime}
                            onChange={(e) => setFullTime(e.target.checked)}
                            className="mr-1"
                        />
                        Full Time Only
                    </label>
                </div>

                <Button
                    onClick={handleGetJobs}
                    style={{ fontFamily: "Open Sans, sans-serif" }}
                    variant="outlined"
                    className="border-2 border-onyx bg-sienna hover:bg-onyx text-seasalt  font-bold px-3 py-1 mt-2 rounded-lg p-2"
                >
                    <div className="flex">
                        <Search className="float-left mr-1" />
                    <Typography className="text-lg float-right ml-1" variant="h1">
                        Search
                    </Typography>

                    </div>
                </Button>
            </div>

            <div className="main-container rounded-none ">
                <div className="job-listings bg-seasalt p-2 border-onyx border-1">
                    {jobs.map((job, index) => (
                        <div
                            key={index}
                            className="job  border-onyx mt-2 hover:bg-isabelline shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                            onClick={() => handleSelectJob(job)}
                        >
                            <Typography className="text-onyx text-2xl font-bold">
                                {job.title}
                            </Typography>
                            <Typography className="text-current text-xl font-bold">
                                {job.company.display_name}
                            </Typography>
                            <Typography className="text-onyx font-medium ">
                                Location: {job.location.display_name}
                            </Typography>
                            <Typography className="text-onyx font-meidum">
                                {job.salary_min !== job.salary_max
                                    ? `Salary Range: ${new Intl.NumberFormat("en-US").format(
                                        Math.round(job.salary_min)
                                    )} - ${new Intl.NumberFormat("en-US").format(
                                        Math.round(job.salary_max)
                                    )}`
                                    : `Salary: $${new Intl.NumberFormat("en-US").format(
                                        Math.round(job.salary_min)
                                    )}`}
                            </Typography>
                        </div>
                    ))}
                </div>

                {/* JOB DETAILS */}
                {selectedJob && (
                    <Card className="job-details border-1 border-onyx rounded-none bg-[#FFE8E0]">
                        {/* DISPLAY NAME */}
                        <Typography
                            style={{ fontSize: "2rem", fontFamily: "Montserrat, sans-serif" }}
                            className="font-bold"
                        >
                            {selectedJob.company.display_name}
                        </Typography>

                        {/* JOB TITLE */}
                        <Typography
                            style={{
                                fontSize: "1.3rem",
                                fontFamily: "Montserrat, sans-serif",
                            }}
                            className="font-bold"
                        >
                            {selectedJob.title}
                        </Typography>

                        {/* LOCATION */}
                        <div className="icon-box">
                            <AddLocation style={{ color: "#156064", fontSize: "3rem" }} />
                            <Typography
                                style={{
                                    fontSize: "1.2rem",
                                    fontFamily: "Open Sans, sans-serif",
                                }}
                                className="text-onyx font-bold"
                            >
                                Location: {selectedJob.location.display_name}
                            </Typography>
                        </div>

                        {/* SALARY */}
                        <div className="icon-box">
                            <Paid style={{ color: "#156064", fontSize: "3rem" }} />
                            <Typography
                                style={{
                                    fontSize: "1.2rem",
                                    fontFamily: "Open Sans, sans-serif",
                                    margin: "0", // Removes default paragraph margin
                                }}
                                className="text-onyx font-bold"
                            >
                                {selectedJob.salary_min !== selectedJob.salary_max
                                    ? `Salary Range: ${new Intl.NumberFormat("en-US").format(
                                        Math.round(selectedJob.salary_min)
                                    )} - ${new Intl.NumberFormat("en-US").format(
                                        Math.round(selectedJob.salary_max)
                                    )}`
                                    : `Salary: $${new Intl.NumberFormat("en-US").format(
                                        Math.round(selectedJob.salary_min)
                                    )}`}
                            </Typography>
                        </div>

                        {/* JOB TYPE */}
                        <div className="icon-box">
                            <RiSuitcaseFill style={{ color: "#156064", fontSize: "3rem" }} />
                            <Typography
                                style={{
                                    fontSize: "1.2rem",
                                    fontFamily: "Open Sans, sans-serif",
                                }}
                                className="text-onyx font-bold"
                            >
                                Type:{" "}
                                {selectedJob.contract_time === "full_time"
                                    ? "Full Time"
                                    : selectedJob.contract_time === "part_time"
                                        ? "Part Time"
                                        : selectedJob.contract_time}
                            </Typography>
                        </div>
                        <div className="grid grid-row-2">
                            <button onClick={createMockInterview} 
                                style={{ fontSize: "1rem", fontFamily: "Open Sans, sans-serif", alignItems:"center", textAlign:"center"}} 
                                className="bg-sienna text-seasalt font-bold border-onyx border-2 px-2 py-2 rounded-lg hover:bg-onyx mt-2">
                                    Mock Interview
                            </button>
                            <button
                                onClick={() =>
                                    window.open(
                                        selectedJob.redirect_url,
                                        "_blank",
                                        "noopener,noreferrer"
                                    )
                                }
                                style={{ fontSize: "1rem", fontFamily: "Open Sans, sans-serif", alignItems:"center", textAlign:"center"}}
                                className="bg-sienna text-seasalt font-bold border-onyx border-2 px-2 py-2 rounded-lg hover:bg-onyx mt-2"
                            >
                                Apply For Positon
                            </button>

                        </div>
                        <div className="mt-3 p-1">
                        <Typography
                            className="job-description mt-2"
                            style={{
                                fontSize: "1.2rem",
                                fontFamily: "Open Sans, sans-serif",
                            }}
                        >
                            {selectedJob.description.endsWith("\u2026") ? (
                                <>
                                    {selectedJob.description.replace(/\u2026/g, "")}{" "}
                                    <a
                                        href={selectedJob.redirect_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="read-more"
                                    >
                                        Read More
                                    </a>
                                </>
                            ) : (
                                selectedJob.description
                            )}
                        </Typography>

                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default AdzunaSearch;

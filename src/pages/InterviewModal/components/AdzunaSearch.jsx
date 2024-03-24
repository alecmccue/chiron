import React, { useState } from "react";
import { getJob } from "../../../jobListing";
import { Box, Button } from "@mui/material";
import JobList from "../../JobList";

const AdzunaSearch = ({ handleNext }) => {
  return (
    <>
      <JobList />
    </>
  );
};

export default AdzunaSearch;

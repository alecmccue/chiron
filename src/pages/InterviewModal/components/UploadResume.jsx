import React, { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Box, Button } from "@mui/material";
import { Link } from 'react-router-dom';

// Configure PDFJS worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UploadResume = () => {
    const [file, setFile] = useState(null);
    const [extractedText, setExtractedText] = useState("");

    useEffect(() => {
        handleExtractText()
    }, [file])
    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleExtractText = async () => {
        if (!file) return;
        const textContent = await extractTextFromPDF(file);
        setExtractedText(textContent);
    };

    const extractTextFromPDF = async (pdfFile) => {
        try {
            const loadingTask = pdfjs.getDocument(URL.createObjectURL(pdfFile));
            const pdf = await loadingTask.promise;
            let textContent = "";

            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                const page = await pdf.getPage(pageNumber);
                const textContentForPage = await page.getTextContent();
                textContent += textContentForPage.items.map(item => item.str).join(" ");
            }

            return textContent;
        } catch (error) {
            console.error("Error extracting text:", error);
            return "";
        }
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            {file && (
                <div>
                    <button onClick={handleExtractText}>Extract Text</button>
                </div>
            )}
            {extractedText && (
                <div>
                    <h2>Extracted Text:</h2>
                    <p>{extractedText}</p>
                </div>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1, pt: 1 }}>
                <Link to="/interview">
                    <Button color="primary">
                        Next
                    </Button>
                </Link>
            </Box>
        </div>
    );
};

export default UploadResume;

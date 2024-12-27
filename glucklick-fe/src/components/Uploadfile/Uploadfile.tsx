import React, { useRef, useState } from "react";
import axios from "axios";
import "./UploadFlie.css";

interface Question {
  question: string;
  options: string[] | null; // Cho phép null nếu options không tồn tại
  correctAnswer: string;
}

const UploadFile: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [googleDocLink, setGoogleDocLink] = useState<string | null>(null);
  const [stage, setStage] = useState<"upload" | "processing" | "completed" | "error">("upload");

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setErrorMessage(null);
      setSuccessMessage(null);
      setStage("processing"); // Move to "processing" stage

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://localhost:4001/generate-mcq", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          setQuestions(response.data.result);
          if (response.data.link_google_form) {
            setGoogleDocLink(response.data.link_google_form);
            setStage("completed"); // Move to "completed" stage
            setSuccessMessage("File uploaded successfully!");
          } else {
            setErrorMessage("Google Form link not available.");
            setStage("error"); // Move to "error" stage
          }
        } else {
          setErrorMessage("Failed to upload the file.");
          setStage("error"); // Move to "error" stage
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrorMessage("An error occurred while uploading the file.");
        setStage("error"); // Move to "error" stage
      }
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {stage === "upload" && (
        <>
          <i className="fas fa-upload"></i>
          <p>Drag image here to upload or</p>
          <button className="Upload" onClick={handleButtonClick}>
            ADD FILE
          </button>
        </>
      )}

      {stage === "processing" && (
        <p className="processing-message">Processing your file... Please wait.</p>
      )}

      {stage === "completed" && (
        <>
          <p className="success-message">{successMessage}</p>
          {googleDocLink && (
            <p className="google-doc-link">
              View your Google Doc:{" "}
              <a href={googleDocLink} target="_blank" rel="noopener noreferrer">
                {googleDocLink}
              </a>
            </p>
          )}
        </>
      )}

      {stage === "error" && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default UploadFile;

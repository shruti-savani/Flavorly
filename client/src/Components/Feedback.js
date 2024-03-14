import React, { useState } from "react";
import { addFeedback } from "./Slices/FeedbackReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField, FormHelperText } from "@mui/material";
import Navbar from "./Navbar";
import "../styles/feedback.css";
import Gtt from "./GoToTop/Gtt";
import Footer from "./Footer";

function FeedbackTry() {

  const url = process.env.REACT_APP_BASE_URL;
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const feedbacks = useSelector((state) => state.feedbacks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = () => {
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    if (atIndex === -1 || dotIndex === -1 || dotIndex < atIndex) {
      setEmailError("Please enter a valid email address.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError("")
    setEmailError("")
    setFeedbackError("")

    let isError = false;
    
    if (name === "") {
      setNameError("Please enter your full name");
      isError = true;
    }

    if (email === "") {
      setEmailError("Please enter your email");
      isError = true;
    }else {
      const isEmailValid = validateEmail();

      if (!isEmailValid) {
        isError = true;
      }
    }

    if (feedback === "") {
      setFeedbackError("Please enter your feedback");
      isError = true;
    }

    if (isError) {
      return;
    }

    try {
      const response = await fetch(`${url}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, feedback }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      const newFeedback = await response.json();

      console.log("Before dispatch and navigate");
      dispatch(addFeedback(newFeedback));

      setName("");
      setEmail("");
      setFeedback("");
      console.log("After dispatch and navigate");

      navigate("/");
      window.scrollTo(0, 0);
      // window.location.href = "/";
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="feedback-bg">
        <div className="feedback-above flex flex-col justify-center items-center text-center">
          <h1 className="text-8xl">Feedback</h1>
          <p className="mt-12">
            Your thoughts matter: Share your feedback, shape our flavorful
            journey!
          </p>
        </div>
      </div>
      <div className="feedback-content">
        <form className="feedback-form flex flex-col w-96">
          <TextField
            className="input"
            variant="outlined"
            label="Full Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setNameError("")}
            required
            sx={{
              "& fieldset": { border: 'none' },
              backgroundColor: "rgb(232, 232, 232)",
              borderRadius: '8px',
            }}
            error={!!nameError}
          /> 
          <FormHelperText error={!!nameError}>{nameError}</FormHelperText>
          
          <TextField
            className="input"
            variant="outlined"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailError("")}
            required
            sx={{
              "& fieldset": { border: 'none' },
              marginTop: "20px",
              backgroundColor: "rgb(232, 232, 232)",
              borderRadius: '8px',
            }}
            error={!!emailError}
          />
          <FormHelperText error={!!emailError}>{emailError}</FormHelperText>

          <TextField
            className="input"
            variant="outlined"
            label="Feedback"
            name="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            onFocus={() => setFeedbackError("")}
            required
            multiline
            rows={5}
            error={!!feedbackError}
            sx={{
              "& fieldset": { border: 'none' },
              backgroundColor: "rgb(232, 232, 232)",
              borderRadius: '8px',
              marginTop: "20px",
            }}
          />
          <FormHelperText error={!!feedbackError}>{feedbackError}</FormHelperText>

          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{
              margin: "auto",
              marginTop: "15px",
              backgroundColor: "rgb(255, 136, 39)",
              borderRadius: '100rem',
            }}
            name="submit"
          >
            Submit
          </Button>
        </form>
      </div>
      <Footer/>
      <Gtt/>
    </div>
  );
}

export default FeedbackTry;

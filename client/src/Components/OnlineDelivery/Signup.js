import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./login.css";
import { Button, FormHelperText, TextField } from "@mui/material";
import {useDispatch, useSelector} from 'react-redux'
import { addUser } from "../Slices/UserReducer"
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie'

function Signup() {

    const url = process.env.REACT_APP_BASE_URL;

    const users = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState("");
    const [error, setError] = useState(null);
    const [isUsersigned, setIsUserSigned] = useState(false);

    const handleSignupSubmit = async (e) => {

        e.preventDefault();

        setError(null)

        if (password !== confirmPassword){
            setPasswordMatchError("Confirm password does not match the password!");
            return;
        }

        try {
            const response = await fetch(`${url}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name, phone, password }),
            });
            
            const user = await response.json()

            if(!response.ok) {
                setError(user.error)
            }
            if(response.ok) {
                Cookies.set('jwt', user.token)
                dispatch(addUser({name, phone, password}));
                setName("")
                setPhone("")
                setPassword("")
                setConfirmPassword("")
                setError(null)

                setIsUserSigned(true)
        
            }
          } catch (error) {
            console.error("Error signing up:", error);
            setError("An error occurred during signup");
          } 
    }

    const handleSignupClose = () => {
        setIsUserSigned(false)
        window.location.href = '/delivery-menu'
    }

  return (
    <div>
      <Navbar />
      <div className="signup-page flex">
        <div className="signup-form flex justify-center items-center w-3/5">
          <form className="flex flex-col gap-y-4 items-center">
            <TextField
              variant="outlined"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "400px",
                backgroundColor: "rgb(232, 232, 232)",
                borderRadius: "8px",
              }}
              sx={{ "& fieldset": { border: "none" } }}
              required
            />
            <TextField
              variant="outlined"
              label="Phone Number"
              value={phone}
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: "400px",
                backgroundColor: "rgb(232, 232, 232)",
                borderRadius: "8px",
              }}
              sx={{ "& fieldset": { border: "none" } }}
              required
            />
            <TextField
              variant="outlined"
              label="Create Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "400px",
                backgroundColor: "rgb(232, 232, 232)",
                borderRadius: "8px",
              }}
              sx={{ "& fieldset": { border: "none" } }}
              required
            />
            <div>
                <TextField
                variant="outlined"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                    width: "400px",
                    backgroundColor: "rgb(232, 232, 232)",
                    borderRadius: "8px",
                }}
                sx={{ "& fieldset": { border: "none" } }}
                required
                error={!!passwordMatchError}
                onFocus={()=>{setPasswordMatchError("")}}
                />
                <FormHelperText error={!!passwordMatchError}>{passwordMatchError}</FormHelperText>
            </div>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>{" "}
            </p>
            <Button variant="contained" onClick={handleSignupSubmit} style={{ width: "fit-content" }}>
              Register Now
            </Button>

            {error && <div className="error text-red-500">{error}</div>}
          </form>
        </div>

        <div className="signup-head w-2/5 flex justify-center items-center">
          <div className="signup-head-above w-full flex items-center justify-center">
            <h1 className="signup-text text-9xl text-center">Sign Up</h1>
          </div>
        </div>
      </div>

    {isUsersigned && (
        <div className="signup-overlay">
            <div className="signup-message">
                <div className="flex">
                    <h1 className="pr-1 text-blue-600 font-bold">{`${users[0].name}`}</h1>
                    <h1 className="pr-5"> signed in</h1>
                </div>
                <Button variant="contained" onClick={handleSignupClose} sx={{':hover': {backgroundColor: '#115496'}}}>Close</Button>
            </div>
       </div>
    )}
     
    </div>
  );
}

export default Signup;

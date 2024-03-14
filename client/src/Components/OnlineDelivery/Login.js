import React, { useState } from "react";
import Navbar from "../Navbar";
import "./login.css";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Slices/UserReducer";
import Cookies from "js-cookie";


function Login() {

  const url = process.env.REACT_APP_BASE_URL;

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleLoginsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({phone, password }),
      });
      
      const user = await response.json()

      if(!response.ok) {
          setError(user.error)
      }
      if(response.ok) {
          Cookies.set('jwt', user.token)
          dispatch(login({phone, password}));
          setPhone("")
          setPassword("")
          setError(null)

          window.location.href = "/delivery-menu";

      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred during login");
    } 

  };

  return (
    <div>
      <Navbar />
      <div className="login-page flex">
        <div className="login-head w-2/5 flex justify-center items-center">
          <div className="login-head-above w-full flex items-center justify-center">
            <h1 className="login-text text-9xl text-center">Login</h1>
          </div>
        </div>
        <div className="login-form flex justify-center items-center w-3/5">
          <form className="flex flex-col gap-y-6 items-center">
            <div>
                <TextField
                variant="outlined"
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                    width: "400px",
                    backgroundColor: "rgb(232, 232, 232)",
                    borderRadius: "8px",
                }}
                sx={{ "& fieldset": { border: "none" } }}
                required
                />
            </div>
            <div>
                <TextField
                variant="outlined"
                label="Password"
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
            </div>
            
            <p className="">
              Don't have account?{" "}
              <Link to="/signup" className="text-blue-600">
                Sign Up
              </Link>{" "}
            </p>
            <Button
              variant="contained"
              style={{ width: "fit-content" }}
              onClick={handleLoginsubmit}
            >
              Log In
            </Button>

            {error && <div className="text-red-500">{error}</div>}

          </form>
        </div>
      </div>

    </div>
  );
}

export default Login;

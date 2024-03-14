import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Select, MenuItem, InputLabel, FormHelperText } from "@mui/material";
import { addReservation } from "./Slices/ReservationReducer";
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/reservation.css'

function Reservation() {

    const url = process.env.REACT_APP_BASE_URL;

    const reservations = useSelector((state) => state.reservations);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState(null);
    const [time, setTime] = useState("");
    const [people, setPeople] = useState("");

    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [peopleError, setPeopleError] = useState("");
    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");

    const numOfPeople = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];

    const handleDateChange = (date) => {
        setDate(date);
      };
    
      const handleBookingSubmit = async (e) => {
        e.preventDefault();
    
        setNameError("");
        setPhoneError("");
        setPeopleError("");
        setDateError("");
        setTimeError("");
    
        let hasError = false;
    
        if (name === "") {
          setNameError("Please enter your name");
          // setNameError("Enter your name");
          hasError = true;
        }
    
        if (phone === "") {
          setPhoneError("Please enter phone number");
          // setPhoneError("Enter phone number");
          hasError = true;
        } else if (phone.length !== 10) {
          setPhoneError("Phone number should be exactly 10 digits");
          hasError = true;
        }
    
        if (people === "") {
          setPeopleError("Please enter no. of people");
          // setPeopleError("Enter people");
          hasError = true;
        }
    
        if (!date) {
          setDateError("Please select a date");
          // setDateError("Select a date");
          hasError = true;
        }
    
        if (time === "") {
          setTimeError("Please select a time");
          // setTimeError("Select a time");
          hasError = true;
        }
    
        if (hasError) {
          return;
        }
    
        try {
          const response = await fetch(`${url}/about`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, people, date, time }),
          });
    
          const newReservation = await response.json();
    
          dispatch(addReservation(newReservation));
    
          window.location.href = "/";
          // navigate('/')
    
          setName("");
          setPhone("");
          setPeople("");
          setDate("");
          setTime("");
        } catch (error) {
          console.error("Error submitting reservation:", error);
        }
      };

  return (
    <div>

        <Navbar/>
        
        <div className="reserve-heading flex justify-center items-center text-center">
            <div className='reserve-head-above flex flex-col justify-center items-center'>
                <h1 className='text-8xl'>Reservation</h1>
                <p className="text-white mt-5">
                    Reserve Your Table Online Today!
                </p>
            </div>
        </div>

        <form className="online-booking-form mt-24 mb-10 flex flex-col items-center justify-center">
          <div className="name-field">
            <TextField
              variant="outlined"
              label="Name"
              className="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameError("")}
              style={{ width: "400px"}}
              sx={{
                "& fieldset": { border: 'none' },
                backgroundColor: "rgb(232, 232, 232)",
                borderRadius: '8px',
              }}
              error={!!nameError}
              required
            />
            <FormHelperText error={!!nameError}>{nameError}</FormHelperText>
          </div>

          <div className="phone-people-field flex">
            <div>
              <TextField
                variant="outlined"
                label="Phone Number"
                type="number"
                className="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setPhoneError("")}
                style={{
                  width: "215px",
                  marginRight: "15px",
                  marginTop: "28px",
                }}
                sx={{
                  "& fieldset": { border: 'none' },
                  backgroundColor: "rgb(232, 232, 232)",
                  borderRadius: '8px',
                }}
                error={!!phoneError}
                required
              />
              <FormHelperText error={!!phoneError}>{phoneError}</FormHelperText>
            </div>

            <div>
              <InputLabel shrink={true} id="People" sx={{marginTop: "5px"}} error={!!peopleError} required>
                People
              </InputLabel>
              <Select
                labelId="People"
                variant="outlined"
                label="People"
                type="number"
                className="people"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                onFocus={() => setPeopleError("")}
                error={!!peopleError}
                style={{ width: "170px", }}
                sx={{
                  "& fieldset": { border: 'none' },
                  backgroundColor: "rgb(232, 232, 232)",
                  borderRadius: '8px',
                }}
                required
              >
                {numOfPeople.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
              <FormHelperText error={!!peopleError}>
                {peopleError}
              </FormHelperText>
            </div>
          </div>

          <div className="date-field">
            <TextField
              variant="outlined"
              label="Select Date"
              type="date"
              className="date"
              value={date ? date.toISOString().split("T")[0] : ""}
              style={{ width: "400px", marginTop: "28px" }}
              sx={{
                "& fieldset": { border: 'none' },
                backgroundColor: "rgb(232, 232, 232)",
                borderRadius: '8px',
              }}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              onFocus={() => setDateError("")}
              InputLabelProps={{ shrink: true }}
              error={!!dateError}
              required
            />
            <FormHelperText error={!!dateError}>{dateError}</FormHelperText>
          </div>

          <div className="time-field">
            <TextField
              variant="outlined"
              label="Select Time"
              type="time"
              className="time"
              style={{ width: "400px", marginTop: "28px" }}
              sx={{
                "& fieldset": { border: 'none' },
                backgroundColor: "rgb(232, 232, 232)",
                borderRadius: '8px',
              }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onFocus={() => setTimeError("")}
              InputLabelProps={{ shrink: true }}
              error={!!timeError}
              required
            />
            <FormHelperText error={!!timeError}>{timeError}</FormHelperText>
          </div>

          <Button variant="contained" onClick={handleBookingSubmit} style={{marginTop: '20px', borderRadius: '100rem',}}>
            Submit
          </Button>
        </form>

        <Footer/>
    </div>
  )
}

export default Reservation

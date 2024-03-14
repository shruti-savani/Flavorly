import React, { useState, useEffect } from 'react'
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from 'react-redux';
import { addCheckoutInfo } from '../Slices/CheckoutReducer';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

function Checkout({onCancel, onCheckoutValid, onCheckoutDetails, deliveryInstructions}) {

  const url = process.env.REACT_APP_BASE_URL;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [time, setTimeValue] = useState("");
  const [method, setMethodValue] = useState("");

  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState("");

  const dispatch = useDispatch();
  const checkOutDetails = useSelector((state) => state.checkoutInfo)

  useEffect(() => {
    const fetchId = async () => {
        try {
            const cookiesToken = Cookies.get("jwt");
            if(cookiesToken) {
                const decodedToken = jwtDecode(cookiesToken);
                if (decodedToken) {
                    const userIdFromToken = decodedToken._id;
                    setUserId(userIdFromToken);

                    const response = await axios.get(`${url}/user-details/${userIdFromToken}`, {
                      headers: {
                          Authorization: `Bearer ${cookiesToken}`
                      }
                  });
                    setUserDetails(response.data);
                }
            }
        } 
        catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    fetchId();
  }, [userId]);

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name || ''); 
      setPhone(userDetails.phone || '');
    }
  }, [userDetails])

  const handleMethodChange = (e) => {
    const newMethod = e.target.value;
    setMethodValue(newMethod)
    if(method === 'pickup') {
      setAddress("")
      setPincode("")
    }
  }

  const handleCheckoutConfirm = () => {
    
    setCheckoutError("");

    if(method === "") {
        setCheckoutError("Please Select a Method type");
        return;
    }

    if(method === "delivery"){
      if (name === "" || phone === "" || address === "" || pincode === "") {
        setCheckoutError("All fields need to be filled");
        return;
      }
      if(pincode.length  !== 6){
        setCheckoutError("Pincode should be of 6 digits")
        return;
      }
    }
    else if(method === 'pickup') {
      if (name === "" || phone === "" || time === "") {
        setCheckoutError("All fields need to be filled");
        return;
      }
      setAddress("")
      setPincode("")  
    }

    dispatch(addCheckoutInfo({name, phone, address, pincode, method, time, deliveryInstructions}));

    const Details = {name, phone, address, pincode, method, time, deliveryInstructions};

    console.log("Details inside handleCheckoutConfirm:", Details);

    onCheckoutDetails(Details);

    console.log(Details);
    onCheckoutValid();
    
  };

  const handleCancel = () => {
    onCancel();
  }

  return (
    <div>
      <div className="checkout-overlay overlay flex justify-center items-center">
            <div className="checkout-form bg-white rounded-xl p-10 flex flex-col relative">

              <div className="method-radio flex">
                <h1 className="mr-5 font-bold tracking-wider w-2/5">Method: </h1>
                <div className="flex flex-col w-3/5">
                  <RadioGroup value={method}>
                    <FormControlLabel control={<Radio size="small"/>} label='Delivery' value='delivery' onClick={handleMethodChange} onFocus={() => setCheckoutError(false)}/>
                    <FormControlLabel control={<Radio size="small"/>} label='Pick Up' value='pickup' onClick={handleMethodChange} onFocus={() => setCheckoutError(false)}/>
                  </RadioGroup>
                </div>
              </div>
              
              <div className="method-form flex mt-10">
                <h1 className="mr-5 font-bold tracking-wider w-2/5">Details: </h1>
                <form className="flex flex-col w-3/5">
                  <TextField
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size="small"
                    sx={{
                      "& fieldset": { border: "none" },
                      width: "300px",
                      backgroundColor: "rgb(232, 232, 232)",
                      borderRadius: "6px",
                    }}
                    required
                    onFocus={() => setCheckoutError(false)}
                  />
                  <TextField
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    size="small"
                    type="tel"
                    sx={{
                      marginTop: "10px",
                      "& fieldset": { border: "none" },
                      width: "300px",
                      backgroundColor: "rgb(232, 232, 232)",
                      borderRadius: "6px",
                    }}
                    required
                    onFocus={() => setCheckoutError(false)}
                  />

                  {method === 'delivery' ? (
                    <>
                      <TextField
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        size="small"
                        multiline
                        rows={3}
                        type="tel"
                        sx={{
                          marginTop: "10px",
                          "& fieldset": { border: "none" },
                          backgroundColor: "rgb(232, 232, 232)",
                          borderRadius: "6px",
                        }}
                        required
                        onFocus={() => setCheckoutError(false)}
                      />
                      <TextField
                        label="Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        size="small"
                        type="number"
                        sx={{
                          marginTop: "10px",
                          "& fieldset": { border: "none" },
                          backgroundColor: "rgb(232, 232, 232)",
                          borderRadius: "6px",
                        }}
                        required
                        onFocus={() => setCheckoutError(false)}
                      />
                    </>
                  ) : (
                  <></>
                  )}
                </form>
              </div>

              {method === 'pickup' ? (
                <div className="pickup-time mt-10 flex">
                  <h1 className="mr-5 font-bold tracking-wider w-2/5">Pickup Time: </h1>
                  <div className="w-3/5 flex">
                    <p className="mr-2">After</p>
                    <select className="bg-slate-100" value={time} onChange={(e) => setTimeValue(e.target.value)}>
                      <option value="" disabled>Select time</option>
                      <option value='0.5hr'>30 min</option>
                      <option value='1hr'>1 hour</option>
                      <option value='1.5hr'>1.5 hour</option>
                      <option value='2hr'>2 hour</option>
                      <option value='2.5hr'>2.5 hour</option>
                      <option value='3hr'>3 hour</option>
                    </select>
                  </div>
                </div>
              ) : (
                <></>
              )}

              <Button
                variant="contained"
                sx={{ marginTop: "40px", width: "fit-content" }}
                onClick={() => handleCheckoutConfirm()}
              >
                Continue to Payment
              </Button>
              
              <CancelIcon
                onClick={() => handleCancel()}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  cursor: "pointer",
                  fontSize: "30px",
                }}
              />

              {checkoutError && (
                <div className="font-bold text-red-600 mt-3 text-left">
                  {checkoutError}
                </div>
              )}
            </div>
      </div>
    </div>
  )
}

export default Checkout

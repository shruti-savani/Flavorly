import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import historyIcon from "./assets/history.webp";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import './userdetails.css'
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function UserDetails() {
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [editFields, setEditFields] = useState(false)
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [cookiesToken, setCookiesToken] = useState("")

  const url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchId = async () => {
        try {
            const cookiesToken = Cookies.get("jwt");
            if(cookiesToken) {
              setCookiesToken(cookiesToken);
                const decodedToken = jwtDecode(cookiesToken);
                if (decodedToken) {
                    const userIdFromToken = decodedToken._id;
                    setUserId(userIdFromToken);
                    const response = await axios.get(`${url}/user-details/${userIdFromToken}`,{
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
    if(userDetails){
      setNewName(userDetails.name)
      setNewPhone(userDetails.phone)
    }   
  }, [userDetails])

  const handleEditDetails = () => {
    setEditFields(!editFields)
  }

  const handleEditSave = () => {
    if(userDetails.phone !== newPhone) {
      setAlertMessage("Changing your phone number will lead to changing your credentials while logging in")
      return;
    }
    axios.post(`${url}/user-details/${userId}`, { name : newName, phone : newPhone }, {
      headers: {
          Authorization: `Bearer ${cookiesToken}`
      }
  })
         .then((res) => {
            setAlertMessage("data updated successfully"); 
            window.location.href = `/user-details/${userId}`;
          })
         .catch((err) => console.log(err))

    setEditFields(false)
  }

  const isUserDetailsPage = window.location.pathname === `/user-details/${userId}`;
  const isHistoryPage = window.location.pathname === `/user-details/history/${userId}`;

  return (
    <div>
      <Navbar />

      <div className={`user-details bg-blue-50 ${isUserDetailsPage ? "min-height" : ""}`}>

        <div className="bg-blue-100 h-14">
          <ul className="pl-10 flex items-center h-full user-details-menu">
            <li className={`tracking-wider font-bold mr-16 ${isUserDetailsPage ? "active" : ""}`}>
              <Link to={`/user-details/${userId}`}><ManageAccountsIcon/> Your Details</Link>
            </li>
            <li className={`tracking-wider font-bold ${isHistoryPage ? "active" : ""}`}>
              <Link to={`/user-details/history/${userId}`}><img src={historyIcon} className="h-5 inline"/> Order History</Link>
            </li>
          </ul>
        </div>

        <div className="pt-10 pl-10 flex">
            {isUserDetailsPage && (
              <div className="w-1/2">
                <h1 className="text-4xl tracking-wider font-serif font-bold">User Details:</h1>
                {userDetails ? (
                  <div>
                    <div className="user-details-info mt-10 bg-white w-fit p-5 rounded-2xl relative">
                      <EditIcon onClick={() => handleEditDetails()} style={{position: "absolute", top: 2, right: 4, border: '1px solid rgb(219, 234, 254)', borderRadius: "100%", padding: '3px', fontSize: '30px', color: 'rgb(109, 138, 175)', cursor: 'pointer'}}/>
                      <h1 className="font-bold tracking-widest pt-5 mb-3">Full Name: <span className="ml-32 font-normal">{userDetails.name}</span></h1>
                      <h1 className="font-bold tracking-widest">Phone Number: <span className="ml-20 font-normal">{userDetails.phone}</span></h1>
                    </div>
                  </div>

                ) : (
                  <div>no user</div>
                )}
              </div>  
            )}

            {editFields && (
              <div className="edit-fields mt-5 text-lg flex flex-col">
                <input className="mb-5 pl-3 h-10 tracking-widest rounded-lg w-80" value={newName} onChange={(e) => setNewName(e.target.value)}/>
                <input className="mb-5 pl-3 h-10 tracking-widest rounded-lg w-80" value={newPhone} onChange={(e) => setNewPhone(e.target.value)}/>
                <div className="flex justify-center">
                  <Button className="w-20" variant="contained" onClick={() => handleEditSave()} style={{backgroundColor: "rgb(46, 64, 89)"}}>Save</Button>
                </div>
              </div>
            )}
        </div>

        {alertMessage && (
          <div className="absolute bottom-5 right-5 bg-white w-auto h-10 pl-5 pr-5 pt-2 border-red-500 border-2 tracking-wider">
            <h1>{alertMessage}</h1>
          </div>
        )}

      </div>
    </div>
  );
}

export default UserDetails;

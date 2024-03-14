import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from "react-redux";
import { logout } from "./Slices/UserReducer";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Navbar({ isHomePage }) {

    const orderItems = useSelector((state) => state.deliveryorder.items);
    

  const location = useLocation();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.user);

  const [userId, setUserId] = useState(null)

    useEffect(() => {
        const cookiesToken = Cookies.get("jwt")
        if(cookiesToken) {
            const decodedToken = jwtDecode(cookiesToken)
            if(decodedToken) {
                const userIdFromToken = decodedToken._id;
                setUserId(userIdFromToken);
            }
        }
    }, [])

  const handleLogout = () => {
    Cookies.remove("jwt");
    dispatch(logout());
    window.location.href = "/"
  };

  const isUser = Cookies.get("jwt");
  const isUserLength = isUser ? isUser.length : 0;

  const isDeliveryPage = location.pathname === "/delivery-menu" || location.pathname === `/user-details/${userId}` || location.pathname === "/delivery-summary" || location.pathname === `/user-details/history/${userId}`;

  return (
    <div>
      <nav className="pt-3 nav">
        <div className="menu-nav flex p-3">
          <h1 className={`sitename text-8xl tracking-wide ${ isHomePage ? "text-white" : "text-black" }`}>
            <a href="/">Flavorly</a>
          </h1>

          <ul className={`nav-items uppercase flex justify-evenly items-center w-full tracking-widest flex-wrap ${ isHomePage ? "text-white" : ""}`}>

            {isDeliveryPage ? (
                <div className="flex justify-end w-full items-center flex-wrap" >
                    <li className="mr-6">
                        <Link
                            to="/"
                            className={location.pathname === "/" ? "active" : ""}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="mr-6">
                        <Link
                            to="/delivery-menu"
                            className={location.pathname === "/delivery-menu" ? "active" : ""}
                        >
                            menu
                        </Link>
                    </li>
                    <li className="mr-10 relative">
                        <Link
                            to="/delivery-summary"
                            className={location.pathname === "/delivery-summary" ? "active" : ""}
                        >
                            <ShoppingCartIcon />
                            <h5 className="bg-red-500 text-white rounded-full inline-block w-6 h-6 text-center text-sm tracking-tighter absolute bottom-3 pr-0.5">{orderItems.length}</h5>
                        </Link>
                    </li>
                    <li className="mr-6">
                        <Link
                        to={`/user-details/${userId}`}
                        className={location.pathname === `/user-details/${userId}` || location.pathname === `/user-details/history/${userId}` ? "active" : ""}
                        >
                        <AccountCircleIcon />
                        </Link>
                    </li>
    
                    {isUserLength !== 0 ? (
                        <li className="mr-4">
                        <button onClick={handleLogout}>Log out</button>
                        </li>
                    ) : null }
                </div>
            ) : (
                <div className="flex justify-evenly w-full items-center flex-wrap">
                    <li>
                        <Link
                            to="/"
                            className={location.pathname === "/" ? "active" : ""}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/menu"
                            className={location.pathname === "/menu" ? "active" : ""}
                        >
                            Menu
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/gallery"
                            className={location.pathname === "/gallery" ? "active" : ""}
                        >
                            Gallery
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/feedback"
                            className={location.pathname === "/feedback" ? "active" : ""}
                        >
                            Feedback
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className={location.pathname === "/about" ? "active" : ""}
                        >
                            About us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/reservation"
                            className={location.pathname === "/reservation" ? "active" : ""}
                        >
                            Reservation
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/delivery-menu"
                            className={location.pathname === "/delivery-menu" ? "active" : ""}
                        >
                            <span className=" border-2 rounded-md border-slate-400 p-1">Order Online</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/order"
                            className={location.pathname === "/order" ? "active" : ""}
                        >
                            <ShoppingBasketIcon />
                        </Link>
                    </li>
                </div>
            ) }
            
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

import "../styles/menu.css"
import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import {Button} from "@mui/material"
import { useDispatch } from "react-redux";
import { addItem } from "./Slices/OrderReducer";
import { useParams } from "react-router-dom";
import Gtt from "./GoToTop/Gtt";
import Footer from "./Footer";

function Menu() {

  const url = process.env.REACT_APP_BASE_URL;

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { section } = useParams(); 

  const [placeOrder, setPlaceOrder] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');

  const openPlaceOrder = (item) => {
    setOrderMessage(
      <p id="place-order-message">
        <span style={{ color: '#bc7b30', fontWeight: 'bold' }}>{item.name}&nbsp; </span> has been added to your order!
      </p>
    );
    setPlaceOrder(true);
  };

  const closePlaceOrder = () => {
    setPlaceOrder(false);
  };

  useEffect(() => {
      axios.get(`${url}/menu`)
        .then(response => {setMenuItems(response.data); setLoading(false)})
        .catch(error => {console.error("Error fetching menu items:", error); setLoading(false)});
  }, []);

  const StarterItems = menuItems.filter(item => item.category === 'starter')
  const MainCourseItems = menuItems.filter(item => item.category === 'maincourse')
  const DrinkItems = menuItems.filter(item => item.category === 'drinks')
  const DessertItems = menuItems.filter(item => item.category === 'dessert')

  useEffect(() => {
    if (section && !loading) {
      const targetSection = document.getElementById(section);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [section, loading]);

  const dispatch = useDispatch(); 

  const handleOrder = (item)=> () => {
    console.log(item)
    dispatch(addItem(item));
    // openPlaceOrder(`${item.name} has been added to your order!`);
    openPlaceOrder(item)
  }

  return (
    <div>
      <Navbar />

      <div className="menu-bg" style={{ backgroundImage: `url(${url}/MenuPage/bg.avif)`}}>
        <div className="menu-above flex flex-col justify-center items-center">
          <h1 className="text-8xl text-center">Our Menu</h1>
        </div>
      </div>

      <div className="menu-heading">
        <p className="text-center p-14 tracking-widest">
          Discover a delightful array of dishes at our restaurant, where finding
          your go-to favorites is a breeze. Our menu has been thoughtfully
          crafted to offer simple yet satisfying options that cater to every
          appetite. From hearty meals to light bites, each dish is prepared with
          care, inviting you to create memorable moments with family and
          friends. Join us as we invite you to explore the delicious
          possibilities waiting to be uncovered on our menu.
        </p>
      </div>

      <div className="starter-menu" id="starter">
        <div className="starter-head" style={{ backgroundImage: `url(${url}/MenuPage/starter-heading.avif)`}}>
          <div className="category-head-above flex flex-col justify-center items-center">
              <h2 className="text-7xl tracking-wide">Starters</h2>
              <p className="text-white tracking-widest text-center">Ignite Your Appetite: Begin Your Culinary Journey with Flavorful Starters!</p>
          </div>
        </div>
        <div className="starter-item">
          {StarterItems.map((item) => (
            <div key={item._id} className="menu-item">
              <img src={`${url}/${item.image}`} alt={item.name} className="menu-item-img"/>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h5>₹{item.price}/-</h5>
                <Button className="add-to-order" style={{marginLeft: "10px", color: "rgb(230, 167, 95)"}} onClick={handleOrder(item)}>Add to Order</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="maincourse-menu" id="maincourse">
        <div className="maincourse-head" style={{ backgroundImage: `url(${url}/MenuPage/maincourse-heading.jpg)`}}>
            <div className="category-head-above flex flex-col justify-center items-center">
                <h2 className="text-7xl tracking-wide">Main Course</h2>
                <p className="text-white tracking-widest text-center">Awaken Your Taste Buds: Elevate Every Bite with Our Irresistible Main Courses!</p>
            </div>
        </div>
        <div className="maincourse-item">
          {MainCourseItems.map((item) => (
            <div key={item._id} className="menu-item">
              <img src={`${url}/${item.image}`} alt={item.name} className="menu-item-img"/>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h5>₹{item.price}/-</h5>
                <Button style={{marginLeft: "10px", color: "rgb(230, 167, 95)"}} onClick={handleOrder(item)}>Add to Order</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="drink-menu" id="drinks">
        <div className="drink-head" style={{ backgroundImage: `url(${url}/MenuPage/drinks-heading.jpg)`}}>
            <div className="category-head-above flex flex-col justify-center items-center">
                <h2 className="text-7xl tracking-wide">Drinks</h2>
                <p className="text-white tracking-widest text-center">Indulge your sweet cravings with our exquisite dessert menu, where every bite is a blissful delights.</p>
            </div>
        </div>
        <div className="drink-item">
          {DrinkItems.map((item) => (
            <div key={item._id} className="menu-item">
              <img src={`${url}/${item.image}`} alt={item.name} className="menu-item-img"/>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h5>₹{item.price}/-</h5>
                <Button style={{marginLeft: "10px", color: "rgb(230, 167, 95)"}} onClick={handleOrder(item)}>Add to Order</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dessert-menu" id="dessert">
        <div className="dessert-head" style={{ backgroundImage: `url(${url}/MenuPage/dessert-heading.jpg)`}}>
            <div className="category-head-above flex flex-col justify-center items-center">
                <h2 className="text-7xl tracking-wide">Dessert</h2>
                <p className="text-white tracking-widest text-center">Indulge your sweet cravings with our exquisite dessert menu, where every bite is a blissful delights.</p>
            </div>
        </div>
        <div className="dessert-item">
          {DessertItems.map((item) => (
            <div key={item._id} className="menu-item">
              <img src={`${url}/${item.image}`} alt={item.name} className="menu-item-img"/>
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h5>₹{item.price}/-</h5>
                <Button style={{marginLeft: "10px", color: "rgb(230, 167, 95)"}} onClick={handleOrder(item)}>Add to Order</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {placeOrder && (
        <div id="place-order-overlay">
          <div id="place-order">
            {orderMessage}
            <Button variant="contained" onClick={closePlaceOrder} sx={{backgroundColor: 'rgb(255, 136, 39)', ':hover': {backgroundColor: 'rgb(185, 85, 4)'}}}>Close</Button>
          </div>
        </div>
      )}
      
      <Footer/>
      <Gtt/>

    </div>
  );
}

export default Menu;

import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Gtt from '../GoToTop/Gtt'
import './delivery.css'
import axios from 'axios'
import { Button } from '@mui/material'
import { addItem } from '../Slices/DeliveryOrderReducer'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from "js-cookie";

function DeliveryMenu() {

  const url = process.env.REACT_APP_BASE_URL;

  const [menuItems, setMenuItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [active, setActive] = useState("")

  const dispatch = useDispatch()
  const orderItems = useSelector(state => state.deliveryorder.items)

  const openIndividualItem = (item) => {
    setSelectedItem({...item, quantity: 1})
  }
  const closeItem = () => {
    setSelectedItem(null)
  }

  useEffect(() => {

    const cookiesToken = Cookies.get("jwt");

    axios.get(`${url}/menu`,{ headers: { Authorization: `Bearer ${cookiesToken}`}})
      .then(response => setMenuItems(response.data))
      .catch(error => console.log("Error fetching menu items", error))
  }, [])

  const StarterItems = menuItems.filter(item => item.category === "starter")
  const MainCourseItems = menuItems.filter(item => item.category === "maincourse")
  const DrinkItems = menuItems.filter(item => item.category === "drinks")
  const DessertItems = menuItems.filter(item => item.category === "dessert")

  const handleAddItem = (item) => {
      dispatch(addItem({...item, quantity: selectedItem.quantity}))
      setSelectedItem(false)
  }

  const scrollToCategory = (category) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActive(category)
    }
  };

  return (
    <div id='delivery'>
      
        <Navbar/>

        <div className='delivery-main'>
            <div className='delivery-head flex items-center'>
                <div className='delivery-head-above w-full h-36 text-center flex flex-col justify-center'>
                    <h1 className='text-7xl'>Online Delivery</h1>
                    <p className='text-white mt-5 tracking-widest'>Savor convenience, delivered fresh, your culinary journey just a click away!</p>
                </div>
            </div>
        </div>

        <div className=''>
          <div className='delivery-menu-categories sticky top-0 left-0 bg-white h-16 z-40'>
            <div className='rounded-xl w-full flex items-center pt-4'>
              <ul className='font-bold tracking-widest text-center flex justify-start pl-5'>
                <li className={`mr-10 ${active === 'starter' ? 'active' : ''}`}><a onClick={() => scrollToCategory('starter')}>Starters</a></li>
                <li className={`mr-10 ${active === 'maincourse' ? 'active' : ''}`}><a onClick={() => scrollToCategory('maincourse')}>Main Course</a></li>
                <li className={`mr-10 ${active === 'drink' ? 'active' : ''}`}><a onClick={() => scrollToCategory('drink')}>Drinks</a></li>
                <li className={`mr-10 ${active === 'dessert' ? 'active' : ''}`}><a onClick={() => scrollToCategory('dessert')}>Desserts</a></li>
              </ul>
            </div>
          </div>

          <div className='delivery-menu pt-10'>

            <h1 className=' ml-3 text-4xl font-bold tracking-wider pl-5 border-b-2'>Our Menu</h1>

            <h1 className='font-bold tracking-wider pl-5 mt-5 text-2xl' id='starter'>Starters</h1>
            <div className='delivery-starter-items flex flex-wrap items-center'>
                {StarterItems.map((item) => (
                    <div className='delivery-menu-item flex rounded-2xl p-5 m-3 bg-white' key={item._id} onClick={() => openIndividualItem(item)}>
                      <img src={`${url}/${item.image}`}/>
                      <div className='w-3/5'>
                        <h1 className='pl-5 tracking-wider font-bold'>{item.name}</h1>
                        <p className='pl-5 text-xs tracking-wider font-semibold text-gray-500 h-2/5 pt-2 relative truncate'>{item.description}</p>
                        <h3 className='pl-5 tracking-wider font-bold'>₹{item.price}</h3>
                      </div>
                    </div>
                ))}
            </div>

            <h1 className='font-bold tracking-wider pl-5 mt-5 text-3xl' id='maincourse'>Main Course</h1>
            <div className='delivery-starter-items flex flex-wrap items-center'>
                {MainCourseItems.map((item) => (
                    <div className='delivery-menu-item flex rounded-2xl p-5 m-3 bg-white' key={item._id} onClick={() => openIndividualItem(item)}>
                      <img src={`${url}/${item.image}`}/>
                      <div className='w-3/5'>
                        <h1 className='pl-5 tracking-wider font-bold'>{item.name}</h1>
                        <p className='pl-5 text-xs tracking-wider font-semibold text-gray-500 h-2/5 pt-2 relative truncate'>{item.description}</p>
                        <h3 className='pl-5 tracking-wider font-bold'>₹{item.price}</h3>
                      </div>
                    </div>
                ))}
            </div>

            <h1 className='font-bold tracking-wider pl-5 mt-5 text-3xl' id='drink'>Drinks</h1>
            <div className='delivery-starter-items flex flex-wrap items-center'>
                {DrinkItems.map((item) => (
                    <div className='delivery-menu-item flex rounded-2xl p-5 m-3 bg-white' key={item._id} onClick={() => openIndividualItem(item)}>
                      <img src={`${url}/${item.image}`}/>
                      <div className='w-3/5'>
                        <h1 className='pl-5 tracking-wider font-bold'>{item.name}</h1>
                        <p className='pl-5 text-xs tracking-wider font-semibold text-gray-500 h-2/5 pt-2 relative truncate'>{item.description}</p>
                        <h3 className='pl-5 tracking-wider font-bold'>₹{item.price}</h3>
                      </div>
                    </div>
                ))}
            </div>

            <h1 className='font-bold tracking-wider pl-5 mt-5 text-3xl' id='dessert'>Dessert</h1>
            <div className='delivery-starter-items flex flex-wrap items-center'>
                {DessertItems.map((item) => (
                    <div className='delivery-menu-item flex rounded-2xl p-5 m-3 bg-white' key={item._id} onClick={() => openIndividualItem(item)}>
                      <img src={`${url}/${item.image}`}/>
                      <div className='w-3/5'>
                        <h1 className='pl-5 tracking-wider font-bold'>{item.name}</h1>
                        <p className='pl-5 text-xs tracking-wider font-semibold text-gray-500 h-2/5 pt-2 relative truncate'>{item.description}</p>
                        <h3 className='pl-5 tracking-wider font-bold'>₹{item.price}</h3>
                      </div>
                    </div>
                ))}
            </div>

          </div>
        </div>

        {selectedItem && (
          <div className='delivery-item-overlay flex justify-center items-center z-50'>
              <div className='delivery-each-item bg-white rounded-xl flex flex-col justify-center items-center relative p-10'>
                  <span className="close-button text-3xl font-bold absolute top-0 right-2" onClick={closeItem}>×</span>
                  <img src={`${url}/${selectedItem.image}`} className='h-48 w-48'/>
                  <h1 className='tracking-wider font-bold text-2xl mt-3 mb-3'>{selectedItem.name}</h1>
                  <p  className='text-sm text-center tracking-wider font-semibold text-gray-500 mb-3'>{selectedItem.description}</p>
                  <h3 className='tracking-wider font-bold mb-3'>₹{selectedItem.price}</h3>
                  <div className="delivery-input-display flex mt-3">
                      <button className="delivery-order-minus mb-5 w-9 h-9 text-center text-2xl flex justify-center items-center" onClick={() => setSelectedItem({...selectedItem, quantity: Math.max(1, selectedItem.quantity - 1)})}>-</button>
                      <input className="delivery-quantity-input pl-5 font-bold" type="number" value={selectedItem.quantity} onChange={(e) => setSelectedItem({ ...selectedItem, quantity: e.target.value })} min="1"/>
                      <button className="delivery-order-plus mb-5 w-9 h-9 text-center text-2xl flex justify-center items-center" onClick={() => setSelectedItem({...selectedItem, quantity: selectedItem.quantity + 1})}>+</button>
                  </div>
                  <Button variant='contained' onClick={() => handleAddItem(selectedItem)}>Add to cart</Button>
              </div>
          </div>
        )}

        <Footer/>
        <Gtt/>

    </div>
  )
}

export default DeliveryMenu

import React, { useState } from "react"
import Navbar from "./Navbar"
import { useDispatch, useSelector } from "react-redux"
import { updateQuantity, removeItem } from "./Slices/OrderReducer"
import "../styles/order.css"
import { Button, FormHelperText, TextField } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Footer from "./Footer"

function OrderSummary() {

  const url = process.env.REACT_APP_BASE_URL;

  const [table, setTable] = useState("");
  const [tableError, setTableError] = useState("");
  const [itemsError, setItemsError] = useState("");

  const orderItems = useSelector(state => state.order.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateQuantity = (itemId, quantity) => {
    const selectedQuantity = parseInt(quantity, 10) || 0;
    const min = 1
    if(selectedQuantity < min) {
      quantity = min;
    } else {
      quantity = selectedQuantity;
    }

    dispatch(updateQuantity({ itemId, quantity }));
  };


  const handleRemoveItem = itemId => {
    dispatch(removeItem(itemId));
  }

  const calculateOrderPrice = () => {
    let orderPrice = 0;

    orderItems.forEach(item => {
      orderPrice += item.price * item.quantity;
    });

    return orderPrice;
  };

  const calculateTotalPrice = () => {
    let totalPrice = calculateOrderPrice();

    totalPrice += (18/100) * totalPrice;
    totalPrice = totalPrice.toFixed(1)

    return totalPrice;
  };

  const handleConfirmOrder = async () => {

    try {

      const tableNo = table;

      const orderDetails = {
        table: tableNo,
        items:  orderItems,
        totalAmount: calculateTotalPrice(orderItems),
      }

      if (orderItems.length === 0) {
        setItemsError("NO ITEMS ADDED! Please add items to your order before confirming.")
        return;
      } 
      else if(tableNo === "") {
        setTableError("Please enter your table number");
      }
      else {
        setTableError("")
        setItemsError("")
      }

      const response = await axios.post(`${url}/order`, orderDetails);

      window.location.href = "/";  
      // navigate('/');
      window.scrollTo(0,0);
  } 
  catch (error) {
      console.error("Error confirming order:", error);
  }
  }

  return (
    <div>
      <Navbar/>

      <div className="order-bg mb-20">
        <div className="order-above flex flex-col justify-center items-center">
          <h1 className="text-8xl text-center">Your order</h1>
        </div>
      </div>

      {itemsError && (
        <div className="no-items-error text-3xl">
          <h1 className="text-red-600 font-bold text-center">{itemsError}</h1>
        </div>
      )}

      <div className="order-list flex flex-wrap justify-center">
        {orderItems.map((item) => (
            <div key={item._id} className="order-item">
                <img src={`${url}/${item.image}`} alt={`${item.name}-pic`}/>
                <div className="flex flex-col">
                  <h3>{item.name}</h3>
                  <h5>₹{item.price}/-</h5>
                  <div className="input-display flex ml-5">
                    <button className="order-minus mt-10 w-10 text-center text-2xl flex justify-center items-center" onClick={() => handleUpdateQuantity(item._id, item.quantity - 1 )}>-</button>
                    <input className="quantity-input" type="number" value={item.quantity} onChange={e => handleUpdateQuantity(item._id, e.target.value)} min="1"/>
                    <button className="order-plus mt-10 w-10 text-center text-2xl flex justify-center items-center" onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <DeleteForeverIcon variant="contained" onClick={() => handleRemoveItem(item._id)} style={{marginLeft: "17px", marginTop: "11px", width: "50px", cursor: "pointer"}} className="delete-icon">Remove</DeleteForeverIcon>
            </div>
        ))}
      </div>
      <div className="bill flex justify-center mt-14">
        <table className="w-96">
          <tbody>
            <tr>
              <td>Order Price:</td>
              <td> ₹{calculateOrderPrice()}</td>
            </tr>
            <tr>
              <td>GST:</td>
              <td>18%</td>
            </tr>
            <tr>
              <td>Total Order Price:</td>
              <td> ₹{calculateTotalPrice()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center">
        <TextField variant="outlined" label='Table Number' type="text" className="table-no pl-3" value={table} onChange={(e)=>setTable(e.target.value)} onFocus={() => setTableError("")} required error={!!tableError}  sx={{ "& fieldset": { border: 'none' }, }}/>
        <FormHelperText error={!!tableError}>{tableError}</FormHelperText>
        <div className="confirm-order mb-10">
          <Button variant="contained" onClick={handleConfirmOrder} className="confirm-order" style={{backgroundColor: "rgb(230, 167, 95)", marginBottom: "10px", marginTop: "10px"}}>Confirm order</Button>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default OrderSummary;

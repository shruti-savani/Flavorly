import React, { useState } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../Slices/DeliveryOrderReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import emptyCartImage from "./assets/emptycart.webp";
import "./deliverysummary.css";
import { Button } from "@mui/material";
import Checkout from "./Checkout";
import Payment from "./Payment";

function DeliverySummary() {

  const url = process.env.REACT_APP_BASE_URL;

  const [showTextarea, setShowTextarea] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [checkoutInfo, setCheckoutInfo] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  const toggleTextarea = () => {
    setShowTextarea(!showTextarea);
  };

  const handleCheckoutDetails = (info) => {
    setCheckoutInfo(info);
  };

  const orderItems = useSelector((state) => state.deliveryorder.items);

  const dispatch = useDispatch();

  const handleUpdateQuantity = (itemId, quantity) => {
    const selectedQuantity = parseInt(quantity, 10) || 0;
    const min = 1;
    if (selectedQuantity < min) {
      quantity = min;
    } else {
      quantity = selectedQuantity;
    }

    dispatch(updateQuantity({ itemId, quantity }));
  };

  const handleDeleteItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handlingCharge = 39;

  const calculateSubTotal = () => {
    let subtotal = 0;

    orderItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    return parseInt(subtotal, 10);
  };

  const calculateGst = () => {
    let subtotal = calculateSubTotal();
    let totalGst = (5 / 100) * subtotal;

    totalGst = totalGst.toFixed(2);

    return parseFloat(totalGst, 10);
  };

  const calculateTotalPrice = () => {
    let subtotal = calculateSubTotal();
    let totalGst = calculateGst();
    let totalprice = subtotal + totalGst + handlingCharge;

    totalprice = totalprice.toFixed(2);

    return totalprice;
  };

  const handleCheckout = () => {
    if (orderItems.length === 0) {
      setError("Your cart is empty!");
      return;
    }

    const orderInfo = orderItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    setOrderInfo(orderInfo)

    setShowCheckout(true);
  };

  return (
    <div>
      <Navbar/>

      <div className="delivery-summary-main-bg bg-blue-50 flex">
        <div className="delivery-summary flex flex-col w-4/5">
          <div className="delivery-items-display flex flex-wrap items-center m-7 w-4/5">
            {orderItems.map((item) => (
              <div
                key={item._id}
                className="delivery-summary-items flex m-2 p-6 relative bg-white"
              >
                <span className="delete-icon absolute top-2 right-2">
                  <DeleteIcon onClick={() => handleDeleteItem(item._id)} />
                </span>
                <img src={`${url}/${item.image}`} className="h-36 w-36" />
                <div className="ml-5">
                  <h1 className="tracking-wider font-bold mt-3">{item.name}</h1>
                  <h3 className="tracking-wider font-bold text-lg mb-4 mt-4">
                    ₹{item.price}
                  </h3>
                  <div className="delivery-input-display flex">
                    <button
                      className="delivery-order-minus w-8 text-center text-2xl flex justify-center items-center"
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      className="delivery-quantity-input pl-5 font-bold"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item._id, e.target.value)
                      }
                      min="1"
                    />
                    <button
                      className="delivery-order-plus w-8 text-center text-2xl flex justify-center items-center"
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {orderItems.length === 0 && (
              <div className="m-10">
                <img
                  src={emptyCartImage}
                  alt="emoty cart image"
                  className="h-96"
                />
              </div>
            )}
          </div>

          <div className="delivery-add-instructions w-3/5 ml-9">
            <div className="bg-white flex flex-col p-3">
              <div className="flex justify-between w-full">
                <h1 className="font-bold tracking-wider">
                  Add Delivery Instructions
                </h1>
                <span className="text-2xl" onClick={toggleTextarea}>
                  {showTextarea ? "-" : "+"}
                </span>
              </div>
              {showTextarea && (
                <div className="w-full pt-3">
                  <textarea
                    className="w-full p-2 border-2"
                    rows="4"
                    placeholder="Enter delivery instructions..."
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="delivery-bill w-1/5 mt-10 mr-20 mb-10">
          <h1 className="font-bold mb-2 tracking-wider">Total Charges</h1>
          <div className="delivery-bill-bg bg-white p-5 rounded-xl">
            <div className="total-payable flex justify-between pb-2">
              <h1 className="font-bold tracking-wider">Total Payable: </h1>
              <span>₹ {calculateTotalPrice()}</span>
            </div>
            <div className="mt-5 flex justify-between">
              <h1 className="">Subtotal: </h1>
              <span>₹ {calculateSubTotal()}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <p>Handling Charges: </p>
              <span>₹ {handlingCharge}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <p>GST: </p>
              <span>₹ {calculateGst()}</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              onClick={() => handleCheckout()}
            >
              Go to Checkout
            </Button>
            {error && <h1 className="text-red-600 font-bold mt-3">{error}</h1>}
          </div>
        </div>

        {showCheckout && (
          <Checkout onCancel={() => setShowCheckout(false)} onCheckoutValid={() => {setShowCheckout(false); setShowPayment(true)}} onCheckoutDetails={handleCheckoutDetails} deliveryInstructions={deliveryInstructions}/>
        )}

        {showPayment && (
          <Payment onCancel={() => setShowPayment(false)} onBack={() => {setShowPayment(false); setShowCheckout(true)}} totalprice={calculateTotalPrice()} checkoutInfo={checkoutInfo} orderInfo={orderInfo}/>
        )}
      </div>
    </div>
  );
}

export default DeliverySummary;

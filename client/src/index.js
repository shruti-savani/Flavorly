import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import FeedbackReducer from "./Components/Slices/FeedbackReducer";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import OrderReducer from  "./Components/Slices/OrderReducer"
import ReservationReducer from "./Components/Slices/ReservationReducer"
import UserReducer from "./Components/Slices/UserReducer";
import DeliveryOrderReducer from "./Components/Slices/DeliveryOrderReducer";
import CheckoutReducer from "./Components/Slices/CheckoutReducer";

const store = configureStore({
  reducer: {
    feedbacks: FeedbackReducer,
    order: OrderReducer,
    reservations: ReservationReducer,
    user: UserReducer,
    deliveryorder: DeliveryOrderReducer,
    checkoutInfo: CheckoutReducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

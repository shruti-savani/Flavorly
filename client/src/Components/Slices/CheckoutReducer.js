import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  phone: "",
  address: "",
  pincode: "",
  method: "",
  time: "",
  items: [],
};

const CheckoutSlice = createSlice({
  name: "checkoutInfo",
  initialState,
  reducers: {
    addCheckoutInfo: (state, action) => {
      return { 
        ...state, 
        ...action.payload 
    };
    },
  },
});

export const { addCheckoutInfo } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;

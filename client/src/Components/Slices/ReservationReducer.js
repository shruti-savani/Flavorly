import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  phone: "",
  people: "",
  date: "",
  time: "",
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState: initialState,
  reducers: {
    addReservation: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
  },
});

export const { addReservation } = reservationSlice.actions;
export default reservationSlice.reducer;

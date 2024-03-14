import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  feedback: "",
};

const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState: initialState,
  reducers: {
    addFeedback: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
  },
});

export const { addFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;

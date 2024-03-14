import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:[],
}

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      return {...state.user, user: [action.payload]};
    },
    login: (state, action) => {
      return {user: [action.payload]}
      
    },
    logout: (state, action) => {
      return {user: []}
    },
    viewUser: (state, action) => {
      return {user: [action.payload]}
    }
  },
});


export const {addUser, login, logout} = UserSlice.actions;
export default UserSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);
            
            console.log(newItem._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } 
            else {
                state.items.push({ ...newItem, quantity: 1 });
                console.log("New item added to cart: ", newItem);
            }
        },
        updateQuantity: (state, action) => {
            const { itemId, quantity} = action.payload;
            const itemToUpdate = state.items.find(item => item._id === itemId)
            if(itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter(item => item._id !== itemId);
        }
    }
})

export const {addItem, updateQuantity, removeItem} = orderSlice.actions;
export default orderSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        addedItems: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find((product) => product._id === action.payload._id);

            if(!isExist) {
                state.products.push({...action.payload, quantity: 1})
            } else {
                console.log("Item has been already added.")
            };
            state.addedItems = setAddedItems(state);
            state.totalPrice = setTotalPrice(state);
        }
    }
})

// function to keep added items
export const setAddedItems = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity)
})

// function to calculate total price
export const setTotalPrice = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity * product.price)
})

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
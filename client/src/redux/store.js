import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/Cart/cartslice.js'

// using redux to manage states of the app

export default configureStore({
    reducer: {
        cart: cartReducer,
    },
})
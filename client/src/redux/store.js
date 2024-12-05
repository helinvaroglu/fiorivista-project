import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/Cart/cartslice.js'
import productsApi from './features/Products/productApi.js'

// using redux to manage states of the app

export default configureStore({
    reducer: {
        cart: cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});
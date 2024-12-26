import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/Cart/cartslice.js'
import productsApi from './features/Products/productApi.js'
import ordersApi from "../pages/ShoppingCart/api.js";
import authReducer from './features/Auth/authslice.js';
import authenticationApi from '../pages/Authentication/Login/api.js';
import recipientReducer from './features/RecipientInfo/recipientSlice.js'
// using redux to manage states of the app

export default configureStore({
    reducer: {
        cart: cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        auth: authReducer,
        [authenticationApi.reducerPath]: authenticationApi.reducer,
        recipient: recipientReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productsApi.middleware,
            ordersApi.middleware,
            authenticationApi.middleware,
        ),
});
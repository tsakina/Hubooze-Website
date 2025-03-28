// store.js
import { configureStore } from '@reduxjs/toolkit';
import Cart from './Cart';
const store = configureStore({
         reducer: {
         cart: Cart
        }
});

export default store;

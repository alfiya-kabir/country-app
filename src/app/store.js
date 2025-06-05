// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../features/countries/countrySlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    countries: countryReducer,
    auth: authReducer,
  },
});

export default store;

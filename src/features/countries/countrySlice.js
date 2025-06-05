// src/features/countries/countrySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1️⃣ Thunk to fetch country data
export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://restcountries.com/v2/all?fields=name,region,flag'
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 2️⃣ Slice
const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCountries.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default countrySlice.reducer;

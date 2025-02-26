import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '../../ultils/request/httpRequest';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

// Fetch all bookings
export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  const response = await httpRequest.get('/bookings');
  return response.data;
});

// Create new booking
export const createBooking = createAsyncThunk('bookings/createBooking', async (bookingData) => {
  const response = await httpRequest.post('/bookings', bookingData);
  return response.data;
});

// Update booking
export const updateBooking = createAsyncThunk('bookings/updateBooking', async ({ id, bookingData }) => {
  const response = await httpRequest.put(`/bookings/${id}`, bookingData);
  return response.data;
});

// Delete booking
export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id) => {
  await httpRequest.delete(`/bookings/${id}`);
  return id;
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex((booking) => booking.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
      });
  },
});

export default bookingSlice.reducer;

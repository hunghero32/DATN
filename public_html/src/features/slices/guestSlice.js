import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '../../ultils/request/httpRequest';


const initialState = {
  guests: [],
  loading: false,
  error: null,
};

// Fetch all guests
export const fetchGuests = createAsyncThunk('guests/fetchGuests', async () => {
  const response = await httpRequest.get('/guests');
  return response.data;
});

// Create new guest
export const createGuest = createAsyncThunk('guests/createGuest', async (guestData) => {
  const response = await httpRequest.post('/guests', guestData);
  return response.data;
});

// Update guest
export const updateGuest = createAsyncThunk('guests/updateGuest', async ({ id, guestData }) => {
  const response = await httpRequest.put(`/guests/${id}`, guestData);
  return response.data;
});

// Delete guest
export const deleteGuest = createAsyncThunk('guests/deleteGuest', async (id) => {
  await httpRequest.delete(`/guests/${id}`);
  return id;
});

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.loading = false;
        state.guests = action.payload;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createGuest.fulfilled, (state, action) => {
        state.guests.push(action.payload);
      })
      .addCase(updateGuest.fulfilled, (state, action) => {
        const index = state.guests.findIndex((guest) => guest.id === action.payload.id);
        if (index !== -1) {
          state.guests[index] = action.payload;
        }
      })
      .addCase(deleteGuest.fulfilled, (state, action) => {
        state.guests = state.guests.filter((guest) => guest.id !== action.payload);
      });
  },
});

export default guestSlice.reducer;

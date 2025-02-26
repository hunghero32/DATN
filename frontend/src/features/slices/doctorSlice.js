import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '../../ultils/request/httpRequest';

const initialState = {
  doctors: [],
  loading: false,
  error: null,
};

// Fetch all doctors
export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await httpRequest.get('/doctors');
  return response.data;
});

// Create new doctor
export const createDoctor = createAsyncThunk('doctors/createDoctor', async (doctorData) => {
  const response = await httpRequest.post('/doctors', doctorData);
  return response.data;
});

// Update doctor
export const updateDoctor = createAsyncThunk('doctors/updateDoctor', async ({ id, doctorData }) => {
  const response = await httpRequest.put(`/doctors/${id}`, doctorData);
  return response.data;
});

// Delete doctor
export const deleteDoctor = createAsyncThunk('doctors/deleteDoctor', async (id) => {
  await httpRequest.delete(`/doctors/${id}`);
  return id;
});

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.doctors.push(action.payload);
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        const index = state.doctors.findIndex((doctor) => doctor.id === action.payload.id);
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter((doctor) => doctor.id !== action.payload);
      });
  },
});

export default doctorSlice.reducer;

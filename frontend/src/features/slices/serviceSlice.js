import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '../../ultils/request/httpRequest';

const initialState = {
  services: [],
  loading: false,
  error: null,
};

// Fetch all services
export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await httpRequest.get('/services');
  return response.data;
});

// Create new service
export const createService = createAsyncThunk('services/createService', async (serviceData) => {
  const response = await httpRequest.post('/services', serviceData);
  return response.data;
});

// Update service
export const updateService = createAsyncThunk('services/updateService', async ({ id, serviceData }) => {
  const response = await httpRequest.put(`/services/${id}`, serviceData);
  return response.data;
});

// Delete service
export const deleteService = createAsyncThunk('services/deleteService', async (id) => {
  await httpRequest.delete(`/services/${id}`);
  return id;
});

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex((service) => service.id === action.payload.id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter((service) => service.id !== action.payload);
      });
  },
});

export default serviceSlice.reducer;

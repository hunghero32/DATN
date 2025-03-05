import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '../../ultils/request/httpRequest';

const initialState = {
  schedules: [],
  loading: false,
  error: null,
};

export const fetchSchedules = createAsyncThunk('schedule/fetchSchedules', async () => {
  const response = await httpRequest.get('/schedules');
  return response.data;
});

export const createSchedule = createAsyncThunk('schedule/createSchedule', async (scheduleData) => {
  const response = await httpRequest.post('/schedules', scheduleData);
  return response.data;
});

export const updateSchedule = createAsyncThunk('schedule/updateSchedule', async ({ id, scheduleData }) => {
  const response = await httpRequest.put(`/schedules/${id}`, scheduleData);
  return response.data;
});

export const deleteSchedule = createAsyncThunk('schedule/deleteSchedule', async (id) => {
  await httpRequest.delete(`/schedules/${id}`);
  return id;
});

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.schedules.push(action.payload);
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        const index = state.schedules.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.schedules[index] = action.payload;
        }
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.schedules = state.schedules.filter((s) => s.id !== action.payload);
      });
  },
});

export default scheduleSlice.reducer;

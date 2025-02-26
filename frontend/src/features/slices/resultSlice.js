import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '../../ultils/request/httpRequest';

const initialState = {
  results: [],
  loading: false,
  error: null,
};

// Fetch all results
export const fetchResults = createAsyncThunk('results/fetchResults', async () => {
  const response = await httpRequest.get('/results');
  return response.data;
});

// Create new result
export const createResult = createAsyncThunk('results/createResult', async (resultData) => {
  const response = await httpRequest.post('/results', resultData);
  return response.data;
});

// Update result
export const updateResult = createAsyncThunk('results/updateResult', async ({ id, resultData }) => {
  const response = await httpRequest.put(`/results/${id}`, resultData);
  return response.data;
});

// Delete result
export const deleteResult = createAsyncThunk('results/deleteResult', async (id) => {
  await httpRequest.delete(`/results/${id}`);
  return id;
});

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createResult.fulfilled, (state, action) => {
        state.results.push(action.payload);
      })
      .addCase(updateResult.fulfilled, (state, action) => {
        const index = state.results.findIndex((result) => result.id === action.payload.id);
        if (index !== -1) {
          state.results[index] = action.payload;
        }
      })
      .addCase(deleteResult.fulfilled, (state, action) => {
        state.results = state.results.filter((result) => result.id !== action.payload);
      });
  },
});

export default resultSlice.reducer;

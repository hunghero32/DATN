import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '../../ultils/request/httpRequest';


const initialState = {
  records: [],
  loading: false,
  error: null,
};

export const fetchRecords = createAsyncThunk('records/fetchRecords', async () => {
  const response = await httpRequest.get('/records');
  return response.data;
});

export const createRecord = createAsyncThunk('records/createRecord', async (recordData) => {
  const response = await httpRequest.post('/records', recordData);
  return response.data;
});

export const updateRecord = createAsyncThunk('records/updateRecord', async ({ id, recordData }) => {
  const response = await httpRequest.put(`/records/${id}`, recordData);
  return response.data;
});

export const deleteRecord = createAsyncThunk('records/deleteRecord', async (id) => {
  await httpRequest.delete(`/records/${id}`);
  return id;
});

const medicalRecordSlice = createSlice({
  name: 'medicalRecord',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        const index = state.records.findIndex((record) => record.id === action.payload.id);
        if (index !== -1) {
          state.records[index] = action.payload;
        }
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.records = state.records.filter((record) => record.id !== action.payload);
      });
  },
});

export default medicalRecordSlice.reducer;

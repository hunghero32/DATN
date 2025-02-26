import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '../../ultils/request/httpRequest';

const initialState = {
  invoices: [],
  loading: false,
  error: null,
};

export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async () => {
  const response = await httpRequest.get('/invoices');
  return response.data;
});

export const createInvoice = createAsyncThunk('invoices/createInvoice', async (invoiceData) => {
  const response = await httpRequest.post('/invoices', invoiceData);
  return response.data;
});

export const updateInvoice = createAsyncThunk('invoices/updateInvoice', async ({ id, invoiceData }) => {
  const response = await httpRequest.put(`/invoices/${id}`, invoiceData);
  return response.data;
});

export const deleteInvoice = createAsyncThunk('invoices/deleteInvoice', async (id) => {
  await httpRequest.delete(`/invoices/${id}`);
  return id;
});

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.invoices.push(action.payload);
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        const index = state.invoices.findIndex((invoice) => invoice.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
      });
  },
});

export default invoiceSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '../../ultils/request/httpRequest';
import { ToastError, ToastSucess } from '../../ultils/toast';

const initialState = {
  users: [],
  loading: false,
  error: null,
  status: 'idle',
};

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await httpRequest.get('/users');
  return response.data;
});

// Create new user
export const createUser = createAsyncThunk('users/createUser', async (userData) => {
  const response = await httpRequest.post('/users', userData);
  return response.data;
});

// Update user
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }) => {
  console.log(id, userData);
  
  const response = await httpRequest.put(`/users/${id}`, userData);
  return response.data;
});

// Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (user) => {
  await httpRequest.delete(`/users/${user?.id}`);
  return user?.id;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload.user);
        if (action.payload.user) {
          ToastSucess(action.payload.message);
        } else {
          ToastError('Có lỗi xảy ra khi thêm user');
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload.user);
        
        const i = state?.users?.findIndex((u)=>u?.id == action.payload.user?.id);
        if (i != -1) {
          state.users[i] = action.payload.user;
          ToastSucess(action.payload.message);

        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id != action.payload);
        ToastSucess('Xóa người dùng thành công.');

        state.status = 'idle';
      });
  },
});

export default userSlice.reducer;

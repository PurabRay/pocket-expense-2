import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '../utils/storage';  

const API_URL = 'http://localhost:5000/api'; 

axios.defaults.baseURL = API_URL;

export const register = createAsyncThunk('auth/register', async (userData) => {
  const res = await axios.post('/auth/register', userData);
  await AsyncStorage.setItem('token', res.data.token);
  return res.data;
});

export const login = createAsyncThunk('auth/login', async (userData) => {
  const res = await axios.post('/auth/login', userData);
  await AsyncStorage.setItem('token', res.data.token);
  return res.data;
});

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, isAuthenticated: false, loading: true },
  reducers: {
    logout: (state) => {
      AsyncStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
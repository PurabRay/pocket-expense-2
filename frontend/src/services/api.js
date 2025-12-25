// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_URL = 'http://localhost:5000/api';  // works for web or emulator'; // CHANGE TO YOUR BACKEND IP or ngrok URL

// const api = axios.create({
//   baseURL: API_URL,
// });

// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});


api.defaults.headers.common['Authorization'] = 'Bearer fake-token-for-demo';

export default api;
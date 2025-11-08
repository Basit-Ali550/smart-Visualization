// hooks/apiClient.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = "https://api.unitec.run.place"; // No trailing slash

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 120000, // 30 seconds
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      
      if (token && token !== 'null' && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Token added to request');
      }

      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
        
        console.log('Multipart/Form-Data detected:');
        console.log('Method:', config.method?.toUpperCase());
        console.log('Final URL:', BASE_URL + config.url); // Fixed double slash
        
        console.log('FormData Parts:');
        for (let [key, value] of config.data._parts) {
          if (key === 'image' && value.uri) {
            console.log(`   ${key}: [FILE] ${value.name || 'photo.jpg'} (${value.type})`);
          } else {
            console.log(`   ${key}: ${value}`);
          }
        }
      }

      return config;
    } catch (err) {
      console.error('Interceptor Error:', err);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - For better error logging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

export default apiClient;
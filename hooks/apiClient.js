// hooks/apiClient.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// ✅ CORRECT Base URL (without trailing slash)
const BASE_URL = "https://api.unitec.run.place";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get token
      const token = await SecureStore.getItemAsync('authToken');
      
      if (token && token !== 'null' && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('✅ Token added to request');
      }

      // Multipart/Form-Data Handling
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
        
        console.log('📁 Multipart/Form-Data detected:');
        console.log('🔹 Method:', config.method?.toUpperCase());
        
        // ✅ CORRECT URL will be: https://api.unitec.run.place/api/v1/users/profile
        console.log('🔹 Final URL:', config.baseURL + '/' + config.url);
        
        console.log('🔹 FormData Parts:');
        if (config.data._parts) {
          config.data._parts.forEach(([key, value], index) => {
            if (key === 'avatar' && typeof value === 'object') {
              console.log(`   ${index}. ${key}: [FILE] ${value.name} (${value.type})`);
            } else {
              console.log(`   ${index}. ${key}: ${value}`);
            }
          });
        }
      }

      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return config;
    }
  }
);

export default apiClient;
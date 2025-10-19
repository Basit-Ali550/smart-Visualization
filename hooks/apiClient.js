
// import axios from 'axios';

// const BASE_URL = "https://api.unitec.run.place/";

// const apiClient = axios.create({
//   baseURL: BASE_URL,

// });
// apiClient.interceptors.request.use(
//   async (config) => {

//     const token = await SecureStore.getItemAsync('authToken');
    
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }


//     if (config.data && !(config.data instanceof FormData)) {
//       config.headers['Content-Type'] = 'application/json';
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized access - logout user
//       console.log('Unauthorized access - logging out');
//       // You can add logout logic here
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
// apiClient.js
// hooks/apiClient.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = "https://api.unitec.run.place/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get token from SecureStore
      const token = await SecureStore.getItemAsync('authToken');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Don't set Content-Type for FormData - let axios handle it
      if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
      }

      console.log('API Request:', {
        url: config.url,
        method: config.method,
        data: config.data instanceof FormData ? 
          `FormData with ${Array.from(config.data.entries()).length} entries` : 
          config.data,
        headers: { ...config.headers }
      });

      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return config;
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      responseData: error.response?.data,
      requestHeaders: error.config?.headers
    });

    if (error.code === 'NETWORK_ERROR' || !error.response) {
      console.error('Network connectivity issue');
    }

    if (error.response?.status === 401) {
      console.log('Unauthorized access - token may be expired');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
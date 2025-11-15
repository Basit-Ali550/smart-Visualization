// api/apiClient.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { setGlobalTokenUpdater } from '../context/AuthContext';

const BASE_URL = "https://api.unitec.run.place";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
});

let updateTokenInContext = null;
setGlobalTokenUpdater((updater) => {
  updateTokenInContext = updater;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('authToken');
    if (token && token !== 'null') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        // صرف یہی لائن اہم ہے — apiClient نہیں، axios استعمال کرو!
        const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token: newRefreshToken } = response.data.tokens;

        await SecureStore.setItemAsync('authToken', access_token);
        await SecureStore.setItemAsync('refreshToken', newRefreshToken || refreshToken);

        if (updateTokenInContext) updateTokenInContext(access_token);

        processQueue(null, access_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);
        await Promise.all([
          SecureStore.deleteItemAsync('authToken'),
          SecureStore.deleteItemAsync('refreshToken'),
          SecureStore.deleteItemAsync('userData'),
        ]);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
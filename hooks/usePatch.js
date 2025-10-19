// hooks/usePatch.js
import { useState } from 'react';
import apiClient from './apiClient';

const usePatch = (endpoint) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchData = async (data, options = {}) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    
    try {
      // For FormData, let axios set the Content-Type automatically
      const config = {
        ...options,
        headers: {
          ...options.headers,
        },
      };

      // Remove Content-Type for FormData to let browser set it with boundary
      if (data instanceof FormData) {
        delete config.headers['Content-Type'];
      }

      console.log('PATCH Request Config:', {
        url: endpoint,
        data: data instanceof FormData ? 'FormData' : data,
        headers: config.headers
      });

      const res = await apiClient.patch(endpoint, data, config);
      setResponse(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error('PATCH Error:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Network Error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { patchData, response, loading, error };
};

export default usePatch;
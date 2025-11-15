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
  
      
      const config = {
        ...options,
        headers: {
          ...options.headers,
        },
      };

      if (data instanceof FormData) {
        delete config.headers['Content-Type'];
      }

      const res = await apiClient.patch(endpoint, data, config);
      
      setResponse(res.data);
      return { success: true, data: res.data };
      
    } catch (err) {
     ;
      
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Request failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { patchData, response, loading, error };
};

export default usePatch;
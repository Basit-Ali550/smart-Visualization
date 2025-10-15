import { useState } from 'react';
import apiClient from './apiClient';

const usePost = (endpoint) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (data) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    
    try {
      const res = await apiClient.post(endpoint, data);
      setResponse(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { postData, response, loading, error };
};

export default usePost;
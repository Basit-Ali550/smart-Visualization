import { useState } from 'react';
import apiClient from './apiClient';

const usePut = (endpoint) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.put(endpoint, data);
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { putData, response, loading, error };
};

export default usePut;
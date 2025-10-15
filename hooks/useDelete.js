import { useState } from 'react';
import apiClient from './apiClient';

const useDelete = (endpoint) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.delete(endpoint);
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, response, loading, error };
};

export default useDelete;
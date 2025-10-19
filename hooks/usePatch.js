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
      console.log('🔧 PATCH Request Details:');
      console.log('📍 Endpoint:', endpoint);
      console.log('📦 Data Type:', data instanceof FormData ? 'FormData (multipart)' : 'JSON');
      
      // ✅ For FormData - NO Content-Type header (axios will set it automatically with boundary)
      const config = {
        ...options,
        headers: {
          ...options.headers,
        },
      };

      // ✅ IMPORTANT: Remove Content-Type for FormData to let axios set it automatically
      if (data instanceof FormData) {
        delete config.headers['Content-Type'];
        console.log('📋 Content-Type: Will be set automatically by axios with boundary');
      }

      console.log('🚀 Making PATCH request...');
      const res = await apiClient.patch(endpoint, data, config);
      
      console.log('✅ PATCH Success - Status:', res.status);
      setResponse(res.data);
      return { success: true, data: res.data };
      
    } catch (err) {
      console.error('❌ PATCH Error Details:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        headers: err.response?.headers
      });
      
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
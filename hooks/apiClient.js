// import { BASE_URL } from '.env';
import axios from 'axios';
const BASE_URL="https://api.unitec.run.place/"
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
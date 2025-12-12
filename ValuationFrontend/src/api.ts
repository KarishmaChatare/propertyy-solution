import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',   // ← changed here
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

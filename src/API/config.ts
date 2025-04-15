import axios from 'axios';

export const RequestHandler = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

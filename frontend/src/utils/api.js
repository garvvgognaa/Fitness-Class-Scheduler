import axios from 'axios';

const getDefaultBaseUrls = () => {
  const urls = [];

  if (process.env.REACT_APP_API_URL) {
    urls.push(process.env.REACT_APP_API_URL);
  }

  if (typeof window !== 'undefined') {
    const { hostname, protocol } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      urls.push('http://localhost:5000/api');
      urls.push('http://localhost:5001/api');
    } else {
      urls.push(`${protocol}//${hostname}/api`);
    }
  } else {
    urls.push('http://localhost:5000/api');
  }

  return Array.from(new Set(urls)); // remove duplicates while preserving order
};

const baseUrls = getDefaultBaseUrls();
let currentBaseIndex = 0;

const API = axios.create({
  baseURL: baseUrls[currentBaseIndex]
});

const rotateBaseUrl = () => {
  if (baseUrls.length <= 1) return API.defaults.baseURL;
  currentBaseIndex = (currentBaseIndex + 1) % baseUrls.length;
  API.defaults.baseURL = baseUrls[currentBaseIndex];
  return API.defaults.baseURL;
};

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config || {};
    const isNetworkError = error.code === 'ERR_NETWORK' || error.message === 'Network Error';

    if (isNetworkError && !originalRequest.__retried && baseUrls.length > 1) {
      originalRequest.__retried = true;
      const nextBase = rotateBaseUrl();
      originalRequest.baseURL = nextBase;
      return API(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);
export const getMe = () => API.get('/auth/me');

export const getAllClasses = () => API.get('/classes');
export const getClassById = (id) => API.get(`/classes/${id}`);
export const createClass = (classData) => API.post('/classes', classData);
export const updateClass = (id, classData) => API.put(`/classes/${id}`, classData);
export const deleteClass = (id) => API.delete(`/classes/${id}`);

export const createBooking = (bookingData) => API.post('/bookings', bookingData);
export const getUserBookings = () => API.get('/bookings/my-bookings');
export const getAllBookings = () => API.get('/bookings/all');
export const cancelBooking = (id) => API.delete(`/bookings/${id}`);

export const getProgress = () => API.get('/progress');
export const updateProgress = (progressData) => API.put('/progress', progressData);

export default API;
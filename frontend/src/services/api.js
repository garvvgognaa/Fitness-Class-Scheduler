import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const classService = {
  getClasses: (filter) => api.get(`/classes${filter ? `?filter=${filter}` : ''}`),
  getClass: (id) => api.get(`/classes/${id}`),
  createClass: (data) => api.post('/classes', data),
  updateClass: (id, data) => api.put(`/classes/${id}`, data),
  deleteClass: (id) => api.delete(`/classes/${id}`)
};

export const bookingService = {
  bookClass: (classId) => api.post('/bookings', { classId }),
  cancelBooking: (bookingId) => api.patch(`/bookings/${bookingId}/cancel`),
  getUserBookings: () => api.get('/bookings/me')
};

export const workoutService = {
  createWorkoutPlan: (data) => api.post('/workouts', data),
  getUserWorkoutPlans: () => api.get('/workouts/me'),
  getWorkoutPlan: (id) => api.get(`/workouts/${id}`)
};

export default api;
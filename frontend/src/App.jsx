import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Classes from './pages/Classes';
import Bookings from './pages/Bookings';
import AdminDashboard from './pages/AdminDashboard';
import CreateClass from './pages/CreateClass';
import CreateWorkout from './pages/CreateWorkout';
import MyWorkouts from './pages/MyWorkouts';
import WorkoutGenerating from './pages/WorkoutGenerating';
import WorkoutDetail from './pages/WorkoutDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/classes" element={
              <ProtectedRoute>
                <Classes />
              </ProtectedRoute>
            } />
            
            <Route path="/bookings" element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/create-class" element={
              <ProtectedRoute adminOnly={true}>
                <CreateClass />
              </ProtectedRoute>
            } />
            
            <Route path="/create-workout" element={
              <ProtectedRoute>
                <CreateWorkout />
              </ProtectedRoute>
            } />
            
            <Route path="/my-workouts" element={
              <ProtectedRoute>
                <MyWorkouts />
              </ProtectedRoute>
            } />
            
            <Route path="/workout-generating" element={
              <ProtectedRoute>
                <WorkoutGenerating />
              </ProtectedRoute>
            } />
            
            <Route path="/workout/:id" element={
              <ProtectedRoute>
                <WorkoutDetail />
              </ProtectedRoute>
            } />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
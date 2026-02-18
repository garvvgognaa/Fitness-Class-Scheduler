# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Backend (from `backend/`)
```bash
npm run dev      # Start dev server with nodemon (port 5000)
npm start        # Start production server
npm run kill-port  # Kill process on port 5000 if stuck
```

### Frontend (from `frontend/`)
```bash
npm run dev      # Start Vite dev server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build
```

Note: No linting or test scripts are configured. Both packages use ES Modules (`"type": "module"`).

## Environment Variables

### Backend (`backend/.env`)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret for signing JWTs
- `NODE_ENV` - `development` or `production`
- `CLIENT_URL` - Frontend URL for CORS in production

### Frontend (`frontend/.env`)
- `VITE_API_BASE_URL` - Backend API URL (default: `http://localhost:5000/api`)

## Architecture

### Backend (Express + MongoDB)
Follows MVC pattern with route to controller to model flow:

- `server.js` - Express app setup, CORS config, route mounting
- `config/database.js` - Mongoose connection
- `routes/` - Route definitions (auth, classes, bookings, workouts)
- `controllers/` - Business logic for each route
- `models/` - Mongoose schemas (User, FitnessClass, Booking, WorkoutPlan)
- `middleware/auth.js` - `authMiddleware` (JWT validation) and `adminMiddleware` (role check)
- `middleware/errorHandler.js` - Central error handling

### Frontend (React + Vite)
- `src/context/AuthContext.jsx` - Auth state via React Context + useReducer. Provides `login`, `register`, `logout`, and auth state.
- `src/services/api.js` - Axios instance with interceptors for auto-attaching JWT and handling 401s. Exports `classService`, `bookingService`, `workoutService`.
- `src/components/` - Reusable UI (Navbar, ClassCard, ProtectedRoute)
- `src/pages/` - Route components with co-located CSS files

### Auth Flow
1. JWT stored in `localStorage` (keys: `token`, `user`)
2. `AuthContext` initializes from localStorage on mount
3. `api.js` interceptor adds `Authorization: Bearer <token>` to all requests
4. 401 responses trigger automatic logout and redirect to `/login`

### API Endpoints
- `POST /api/auth/register`, `POST /api/auth/login`
- `GET/POST/PUT/DELETE /api/classes` (admin-only for mutations)
- `POST /api/bookings`, `PATCH /api/bookings/:id/cancel`, `GET /api/bookings/me`
- `POST /api/workouts`, `GET /api/workouts/me`, `GET /api/workouts/:id`
- `GET /api/health` - Health check

## Test Users
- Admin: `admin@fitclass.com` / `admin123`
- User: `user@fitclass.com` / `user123`

## Deployment
- Frontend deploys to Vercel (see `vercel.json` for SPA rewrite config)
- Backend deploys separately (Heroku/Railway) - update CORS `CLIENT_URL` for production

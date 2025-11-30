# Fitness Class Scheduler

A full-stack web application for managing fitness class bookings with a bold, motivational UI designed to inspire users to achieve their fitness goals.

## 🚀 Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Router** for client-side routing
- **Axios** for API communication with interceptors
- **Plain CSS** with custom variables and animations
- **JWT Authentication** with localStorage persistence

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication and authorization
- **Bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

### Database
- **MongoDB Atlas** (Cloud database)
- Collections: Users, FitnessClasses, Bookings

## 🎯 Features

### User Features
- **User Registration & Login** with JWT authentication
- **Browse Fitness Classes** with filtering (upcoming/past/all)
- **Book Classes** with capacity validation
- **View Bookings** separated into upcoming and past
- **Cancel Bookings** for upcoming classes
- **Responsive Design** optimized for mobile and desktop

### Admin Features
- **Admin Dashboard** with class management overview
- **Create Classes** with full details (trainer, date, time, capacity)
- **Edit Classes** (update class information)
- **Cancel Classes** (soft delete with status change)
- **View Statistics** (total classes, bookings, etc.)

### System Features
- **Capacity Management** prevents overbooking
- **Real-time Updates** after booking/canceling actions
- **Role-based Access Control** (user vs admin)
- **Error Handling** with user-friendly messages
- **Loading States** for better UX

## 🏗️ Project Structure

```
Fitness-Class-Scheduler/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ClassCard.jsx
│   │   │   └── ClassCard.css
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Classes.jsx
│   │   │   ├── Bookings.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CreateClass.jsx
│   │   │   └── [corresponding CSS files]
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
└── backend/
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── authController.js
    │   ├── classController.js
    │   └── bookingController.js
    ├── middleware/
    │   ├── auth.js
    │   └── errorHandler.js
    ├── models/
    │   ├── User.js
    │   ├── FitnessClass.js
    │   └── Booking.js
    ├── routes/
    │   ├── auth.js
    │   ├── classes.js
    │   └── bookings.js
    ├── server.js
    ├── package.json
    └── .env
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (URI provided)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Fitness-Class-Scheduler
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration (MongoDB URI already provided)
npm run dev
```

3. **Setup Frontend** (in a new terminal)
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed (default: http://localhost:5000/api)
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://fitnessadmin:fitness@cluster0.ypmrhth.mongodb.net/
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📚 API Documentation

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Class Routes
- `GET /api/classes` - Get all classes (query: ?filter=upcoming|past)
- `GET /api/classes/:id` - Get single class
- `POST /api/classes` - Create class (Admin only)
- `PUT /api/classes/:id` - Update class (Admin only)
- `DELETE /api/classes/:id` - Cancel class (Admin only)

### Booking Routes
- `POST /api/bookings` - Book a class
- `PATCH /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/me` - Get user's bookings

### Request/Response Examples

**Register User:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Create Class (Admin):**
```json
POST /api/classes
Authorization: Bearer <jwt_token>
{
  "title": "HIIT Bootcamp",
  "trainer": "Sarah Johnson",
  "description": "High-intensity interval training...",
  "date": "2024-01-15",
  "time": "18:00",
  "duration": 60,
  "capacity": 20
}
```

**Book Class:**
```json
POST /api/bookings
Authorization: Bearer <jwt_token>
{
  "classId": "class_id_here"
}
```

## 👥 Test Users

### Admin User
- **Email:** admin@fitclass.com
- **Password:** admin123
- **Role:** admin

### Regular User
- **Email:** user@fitclass.com
- **Password:** user123
- **Role:** user

*Note: Create these users through the registration form or seed them manually in the database.*

## 🎨 UI Design Features

### Bold Motivational Theme
- **Dark Background** (#0a0a0a) with neon accent colors
- **Gradient Text** for headings and CTAs
- **Hover Effects** with transforms and shadows
- **High Contrast** typography for readability
- **Motivational Copy** throughout the interface

### Color Palette
- Primary Background: `#0a0a0a`
- Secondary Background: `#1a1a1a`
- Accent Green: `#00ff88`
- Accent Orange: `#ff6b35`
- Accent Blue: `#00d4ff`
- Text Primary: `#ffffff`
- Text Secondary: `#b0b0b0`

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly buttons
- Optimized for all screen sizes

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable: `VITE_API_BASE_URL`

### Backend (Heroku/Railway)
1. Set environment variables in hosting platform
2. Ensure MongoDB URI is accessible
3. Set `NODE_ENV=production`

### Environment Setup for Production
- Update CORS origins in `server.js`
- Use production MongoDB database
- Set secure JWT secret
- Enable HTTPS

## 🔧 Development Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify MongoDB URI in `.env`
   - Check network connectivity
   - Ensure IP is whitelisted in MongoDB Atlas

2. **CORS Errors**
   - Verify frontend URL in backend CORS configuration
   - Check API base URL in frontend `.env`

3. **JWT Token Issues**
   - Clear localStorage and login again
   - Verify JWT secret matches between requests

4. **Build Errors**
   - Delete `node_modules` and reinstall
   - Check Node.js version compatibility

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Ready to transform your fitness journey? Start booking classes today! 💪**
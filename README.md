🏋️‍♂️ Fitness Class Scheduler

A full-stack fitness class booking and management platform built using React.js, Node.js, Express.js, and MongoDB, styled with pure CSS.
The system enables users to browse classes, make bookings, manage schedules, and track basic progress through a clean and responsive interface.

🧭 Table of Contents

Introduction

Goals

Features

Technology Stack

Database Schema

Project Timeline

Future Enhancements

Conclusion

🧾 Introduction

The Fitness Class Scheduler simplifies the way users plan and manage their fitness routines.
With real-time class booking, trainer dashboards, and flexible scheduling options, this platform acts as a modern digital solution for:

✔ Gyms
✔ Yoga centers
✔ Fitness studios
✔ Online class instructors

Whether a user wants to join an offline gym session or an online yoga class, the entire experience is handled seamlessly.

🎯 Goals

Make class scheduling simple and intuitive.

Allow trainers to manage their sessions easily.

Support online (Zoom/Meet) and offline classes.

Ensure secure login and access control.

Build a scalable, clean MERN application.

⚙️ Features
#	Feature	Description	Why It's Important
1	Authentication + Roles	Secure login/signup with JWT & bcrypt for Users, Trainers, Admins	Prevents unauthorized access
2	Class Booking System	Users browse, filter, book, and cancel classes	Core of the platform
3	Online & Offline Classes	Join via Zoom/Meet link or attend physically	Flexible scheduling
4	Trainer Dashboard	Trainers can create, edit, delete sessions	Simplifies class management
5	Basic Recommendations	Suggests classes based on user preferences	Adds personalization
6	Progress Tracking	Shows completed sessions or simple stats	Improves engagement
7	Admin Panel	Manage users, trainers, classes, bookings	Ensures control and scalability
8	Email Notifications (Optional)	Session reminders and updates	Better user retention
9	Responsive UI	Clean UI made using pure CSS	Works across devices
🧩 Technology Stack
Frontend

React.js

React Router DOM

Axios (API calls)

Pure CSS

Backend

Node.js

Express.js

JWT Authentication

Bcrypt

Database

MongoDB

Mongoose ODM

Additional Tools

Chart.js (for progress graphs)

Nodemailer (optional notifications)

Git + GitHub (version control)

Deployment

Frontend → Vercel / Netlify

Backend → Render / Railway

Database → MongoDB Atlas

🧱 Database Schema (MongoDB)
User
{
  name: String,
  email: String,
  password: String,
  role: "USER" | "TRAINER" | "ADMIN",
  createdAt: Date
}

Class
{
  title: String,
  description: String,
  trainer: String,
  date: String,
  time: String,
  maxCapacity: Number,
  type: "ONLINE" | "OFFLINE",
  meetLink: String,
  createdAt: Date
}

Booking
{
  userId: ObjectId,
  classId: ObjectId,
  createdAt: Date
}

Progress (Optional)
{
  userId: ObjectId,
  completedSessions: Number,
  updatedAt: Date
}

🕒 Project Timeline (Simplified)
Phase	Work	Duration
Phase 1	Setup of React, Express, MongoDB, authentication	Week 1
Phase 2	Class CRUD + Booking System + Trainer Dashboard	Week 2
Phase 3	Online/Offline logic + User Dashboard	Week 3
Phase 4	Admin Panel + Analytics	Week 4
Phase 5	Email notifications + UI improvements	Week 5
Phase 6	Full deployment + testing	Week 6
🚀 Future Enhancements
Enhancement	Description
🤖 AI Workout Coach	Personalized suggestions using AI
📱 PWA Support	Installable mobile version
💳 Payment Gateway	Paid classes via Stripe/Razorpay
📊 Advanced Insights	Trend analysis using progress data
🌙 Dark Mode	CSS-based theme switcher
🧍 Waitlist System	Join when class is full
🏁 Conclusion

The Fitness Class Scheduler is a powerful and flexible MERN-based project that demonstrates real-world full-stack development skills.
With clean UI, secure authentication, scheduling features, and trainer/admin dashboards, it is perfect for:

✔ Academic submission
✔ Resume/portfolio
✔ Real deployments for fitness centers


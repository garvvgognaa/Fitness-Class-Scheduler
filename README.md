# 🏋️‍♂️ AI Fitness & Class Scheduler

A **full-stack AI-powered fitness and class management platform** built using **React.js, Express.js, MySQL, and Prisma ORM**.  
This system enables users to **book fitness classes (online & offline)**, **scan their body for AI-generated workout recommendations**, and **track their progress** — all in one sleek, responsive web app.

---

## 🧭 Table of Contents
- [Introduction](#-introduction)
- [Goals](#-goals)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Database Schema](#-database-schema)
- [Project Timeline](#-project-timeline)
- [Future Enhancements](#-future-enhancements)
- [Conclusion](#-conclusion)

---

## 🧾 Introduction
**AI Fitness & Class Scheduler** revolutionizes how users plan, attend, and manage their fitness routines.  
The application combines **AI-based body analysis**, **real-time class booking**, and **personalized workout suggestions**, making fitness management efficient, data-driven, and tailored to individual needs.

Whether it’s booking an offline gym session or joining an online yoga class, users can manage everything seamlessly through this platform.

---

## 🎯 Goals
- Simplify **fitness class scheduling** for users and trainers.  
- Provide **AI-driven workout recommendations** based on body scans.  
- Support **both online and offline** fitness sessions.  
- Maintain a **secure, scalable, and user-friendly** experience.  

---

## ⚙️ Features

| # | Feature | Description | Rationale | Implementation |
|---|----------|--------------|------------|----------------|
| 1 | **User Authentication & Roles** | Secure login/signup with bcrypt & JWT. Roles: User, Trainer, Admin. | Ensures privacy and access control. | Frontend: React Context API. Backend: Express Auth Routes. DB: Prisma User model. |
| 2 | **Class Booking System** | Users can browse, filter, and book fitness classes. | Core scheduling functionality. | Frontend: React forms & cards. Backend: Class CRUD routes. DB: Class + Booking models. |
| 3 | **Online & Offline Classes** | Supports in-person and live virtual sessions via Zoom/Meet links. | Expands flexibility and reach. | DB field: `type (ONLINE/OFFLINE)` and `meetLink`. |
| 4 | **Trainer Dashboard** | Trainers can create, edit, and cancel classes. | Simplifies class management. | React dashboard UI + Express routes. |
| 5 | **AI Body Scan & Recommendations** | Analyze user body image and provide exercise suggestions. | Introduces personalization via AI. | AI Vision API (e.g., MediaPipe, DeepAI) + custom logic. |
| 6 | **Personalized Exercise Plans** | AI suggests classes/exercises (e.g., weight loss, yoga). | Delivers value through data-driven insights. | Express middleware for recommendations. |
| 7 | **Progress Tracking & Analytics** | Users can track weight, BMI, and booked sessions. | Improves user engagement. | Frontend: Recharts / Chart.js. Backend: Prisma aggregates. |
| 8 | **Trainer & Admin Panels** | Manage users, bookings, and classes. | Ensures control and scalability. | Role-based routes + admin UI. |
| 9 | **Email Reminders / Notifications** | Notify users of upcoming sessions or cancellations. | Boosts user retention. | Nodemailer (backend) + Toast alerts (frontend). |
| 10 | **Responsive & Modern UI** | Fully responsive with animations and dark mode. | Enhances UX and accessibility. | TailwindCSS + Framer Motion. |

---

## 🧩 Technology Stack

| Layer | Technology | Purpose / Reasoning |
|--------|-------------|---------------------|
| **Frontend** | React.js (Vite) | Component-based SPA, smooth performance. |
| **Routing** | React Router v6 | Seamless navigation between pages. |
| **State Management** | Context API / Redux Toolkit | Manage auth, bookings, and class data. |
| **UI Design** | TailwindCSS + Framer Motion | Responsive design + animations. |
| **Backend** | Node.js + Express.js | RESTful API server for scalability. |
| **Database ORM** | Prisma ORM | Schema definition, migrations, and type safety. |
| **Database** | MySQL | Relational structure for classes, users, bookings. |
| **Authentication** | JWT + bcrypt + Google OAuth | Secure and flexible user sessions. |
| **AI Integration** | MediaPipe / DeepAI / RapidAPI | Body scan and posture analysis. |
| **Email Notifications** | Nodemailer | Send class reminders and updates. |
| **Charts & Analytics** | Chart.js / Recharts | Visual representation of progress. |
| **Deployment** | Frontend: Vercel / Netlify<br>Backend: Render / Railway<br>DB: PlanetScale | Cloud-based CI/CD and scalability. |
| **Version Control** | Git + GitHub | Collaboration and version management. |

---

## 🧱 Database Schema

### **User**
```
id (PK)
name
email
password
role (USER/TRAINER/ADMIN)
bodyMetrics (JSON)
recommendations (String)
createdAt
```

### **Class**
```
id (PK)
title
description
trainer
date
duration
maxCapacity
type (ONLINE/OFFLINE)
meetLink
createdAt
```

### **Booking**
```
id (PK)
userId (FK -> User)
classId (FK -> Class)
createdAt
```

### **Progress**
```
id (PK)
userId (FK -> User)
bmi
weight
updatedAt
```

---

## 🕒 Project Timeline

| Phase | Tasks | Duration |
|--------|-------|-----------|
| **Phase 1: Setup & Auth** | Initialize project, Prisma schema, JWT auth | Week 1 |
| **Phase 2: Class Booking System** | Class CRUD, trainer dashboard | Week 2 |
| **Phase 3: Online Class Integration** | Add online/offline logic + meeting links | Week 3 |
| **Phase 4: AI Body Scan Module** | Integrate AI API + recommendation system | Week 4 |
| **Phase 5: Analytics & Notifications** | Add progress tracking, charts, email reminders | Week 5 |
| **Phase 6: UI/UX Polish & Deployment** | Tailwind, animations, deploy full stack | Week 6 |

---

## 🚀 Future Enhancements

| Feature | Description |
|----------|--------------|
| 🧠 **AI Chat Coach** | Personalized AI chatbot for exercise tips & routines. |
| 📱 **PWA Version** | Offline-accessible mobile-friendly version. |
| 📊 **Advanced Health Insights** | Predict trends using stored health data. |
| 🩺 **Smart Device Integration** | Connect wearables or Google Fit for live data. |
| 💳 **Payment Gateway** | Add Stripe/Razorpay for paid classes. |
| 🧍 **Waitlist System** | Join waitlists when classes are full. |
| 🌗 **Dark/Light Mode Toggle** | Improved UI accessibility. |

---

## 🏁 Conclusion
The **AI Fitness & Class Scheduler** merges fitness, technology, and artificial intelligence to create a **modern, user-centric experience**.  
With its seamless scheduling, online sessions, and AI-driven body analysis, it stands out as a next-generation fitness management solution — scalable, secure, and intelligent.  

This project demonstrates **end-to-end full-stack development**, **AI integration**, and **real-world application design** — perfect for both academic portfolios and professional showcases.

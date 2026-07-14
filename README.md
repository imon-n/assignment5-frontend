# 📚 Tutor Management System

A modern full-stack Tutor Management System that connects students with tutors through an intuitive platform. Students can browse tutors, book sessions, make secure payments, while tutors can manage their profiles, availability, and teaching sessions. Administrators oversee users, tutors, bookings, and platform activities through a dedicated dashboard.

---



## 🚀 Live Demo

### Frontend
https://assignment5-frontend-seven.vercel.app

### Backend API
https://assignment5-backend-f7q4.onrender.com

---

## 🛠️ Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- Sonner
- Lucide React
- Axios

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt

### Deployment

- Vercel
- Render
- PostgreSQL Database

---

# ✨ Features

## 👨‍🎓 Student

- User Authentication
- Browse Tutors
- Search & Filter Tutors
- Book Tutor Sessions
- Payment Integration
- Booking History
- Student Dashboard
- Profile Management

## 👨‍🏫 Tutor

- Tutor Profile
- Manage Availability
- Session Management
- Booking Requests
- Earnings Overview
- Tutor Dashboard

## 👨‍💼 Admin

- Dashboard Overview
- Manage Users
- Manage Tutors
- Approve Tutors
- Manage Categories
- Monitor Bookings
- Payment Monitoring

---

# 📦 Dependencies

## Frontend

```json
next
react
typescript
tailwindcss
framer-motion
lucide-react
axios
react-hook-form
sonner
```

## Backend

```json
express
typescript
prisma
@prisma/client
jsonwebtoken
bcrypt
cors
dotenv
cookie-parser
zod
nodemon
ts-node
```

---

# 🚀 Run Locally

## 1️⃣ Clone the repository

```bash
git clone https://github.com/imon-n/assignment5-frontend.git
```

## 2️⃣ Navigate to the project

```bash
cd assignment5-frontend
```

## 3️⃣ Install dependencies

```bash
npm install
```

## 4️⃣ Create a `.env.local` file

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

AUTH_URL=http://localhost:5000/api/auth

NEXT_PUBLIC_STRIPE_PK=your_stripe_publishable_key
```

> If you're using the deployed backend, replace `http://localhost:5000` with:

```env
NEXT_PUBLIC_API_URL=https://assignment5-backend-f7q4.onrender.com

AUTH_URL=https://assignment5-backend-f7q4.onrender.com/api/auth
```

## 5️⃣ Start the development server

```bash
npm run dev
```

## 6️⃣ Open your browser

Visit:

```text
http://localhost:3000
```

The application should now be running locally.
# 📂 Project Structure

```
Frontend
│
├── src
│   ├── app
│   ├── components
│   ├── hooks
│   ├── lib
│   ├── services
│   ├── types
│   └── utils
│
└── public

Backend
│
├── prisma
├── src
│   ├── app
│   ├── middlewares
│   ├── modules
│   ├── routes
│   ├── lib
│   └── server.ts
```

---

# 🔐 Authentication

- JWT Authentication
- Role-based Authorization
- HTTP-only Cookies
- Protected Routes

---

# 🎯 User Roles

- 👨‍🎓 Student
- 👨‍🏫 Tutor
- 👨‍💼 Admin

---

# 📈 Future Improvements

- Live Chat
- Video Calling
- Email Notifications
- Certificate Generation
- Tutor Ratings & Reviews
- Analytics Dashboard
- Mobile Responsive Improvements

---

# 👨‍💻 Author

**Nur Mohammad Imon**

Electrical & Electronic Engineering Student

University of Chittagong

GitHub:
https://github.com/imon-n

LinkedIn:
https://linkedin.com/in/nur-mohammad-imon-29a2b4255

Email:
imon.eeecu@gmail.com

---

# 📄 License

This project is developed for educational purposes.

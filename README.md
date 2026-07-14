# 🎓 Tutor Management System

A modern full-stack Tutor Management System where students can find tutors, book sessions, make payments, and manage learning while tutors can create profiles, manage availability, and conduct sessions. Administrators oversee users, tutors, bookings, and the overall platform.

---

## 🚀 Live Demo

### Frontend
https://your-frontend-url.vercel.app

### Backend API
https://your-backend-url.onrender.com

---

# ✨ Features

## 👨‍🎓 Student

- Register & Login
- JWT Authentication
- Browse Tutors
- Search & Filter Tutors
- View Tutor Details
- Book Tutor Sessions
- Make Payments
- View Booking History
- Manage Profile
- Student Dashboard

---

## 👨‍🏫 Tutor

- Create Tutor Profile
- Update Profile
- Upload Profile Image
- Set Hourly Rate
- Add Biography
- Manage Weekly Availability
- View Session History
- Tutor Dashboard

---

## 👨‍💼 Admin

- Secure Admin Dashboard
- Manage Users
- Manage Tutors
- Approve Tutors
- Ban / Unban Users
- View Bookings
- Platform Statistics

---

## 🔐 Authentication

- JWT Authentication
- Role-based Authorization
- HTTP Only Cookies
- Protected Routes

Roles:

- ADMIN
- TUTOR
- STUDENT

---

# 📊 Dashboard

### Student Dashboard

- Profile
- Booking Statistics
- Recent Bookings
- Recent Payments

### Tutor Dashboard

- Tutor Overview
- Profile Information
- Session List
- Availability
- Statistics

### Admin Dashboard

- Total Users
- Total Tutors
- Total Students
- Total Bookings
- Total Revenue

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Sonner Toast

---

## Backend

- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

---

## Database

- PostgreSQL

---

## Cloud

- Render (Backend)
- Vercel (Frontend)

---

# 📁 Folder Structure

```
Frontend
│
├── app
├── components
├── hooks
├── lib
├── services
├── types
└── public


Backend
│
├── prisma
├── src
│   ├── modules
│   ├── middleware
│   ├── routes
│   ├── config
│   └── utils
└── server.ts
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/tutor-management-system.git
```

---

## Frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run

```bash
npm run dev
```

---

## Backend

```bash
cd backend
```

Install packages

```bash
npm install
```

Create `.env`

```env
DATABASE_URL=

JWT_SECRET=

PORT=5000
```

Generate Prisma

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Start Server

```bash
npm run dev
```

---

# 🔑 Environment Variables

## Backend

```env
DATABASE_URL=

JWT_SECRET=

PORT=

NODE_ENV=
```

---

## Frontend

```env
NEXT_PUBLIC_API_URL=
```

---

# 📚 Main Modules

- Authentication
- Users
- Tutors
- Students
- Availability
- Bookings
- Payments
- Dashboard
- Categories

---

# 🔒 Security

- Password Hashing (bcrypt)
- JWT Authentication
- HTTP Only Cookies
- Role Based Access
- Protected API Routes

---

# 🎨 UI Features

- Fully Responsive
- Modern Dashboard
- Dark Mode
- Smooth Animations
- Mobile Friendly
- Beautiful Cards
- Sticky Sidebar
- Clean Layout

---

# 📈 Future Improvements

- Video Calling
- Live Chat
- Email Notifications
- Review & Rating System
- Stripe Payment
- Zoom Integration
- Calendar Integration
- Tutor Verification

---

# 👨‍💻 Author

**Nur Mohammad Imon**

- University of Chittagong
- Department of Electrical and Electronic Engineering (EEE)

Email:
```
imon.eeecu@gmail.com
```

GitHub:
```
https://github.com/yourusername
```

LinkedIn:
```
https://linkedin.com/in/yourprofile
```

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

Happy Coding! 🚀

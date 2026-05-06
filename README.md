# MERN Authentication App

A full-stack MERN application with authentication, featuring a React frontend and Node.js/Express backend with MongoDB.

## 🚀 Deployment Guide

### Prerequisites

- MongoDB Atlas account
- GitHub account
- Render account (for backend)
- Vercel/Netlify account (for frontend)

### 1. Set up MongoDB Atlas

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database
3. Get your connection string

### 2. Deploy Backend to Render

1. Push code to GitHub
2. Go to [Render](https://render.com) and create account
3. Create new Web Service
4. Connect your GitHub repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Set environment variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_atlas_uri`
   - `JWT_SECRET=your_strong_secret_key`
   - `JWT_EXPIRE=7d`
8. Deploy

### 3. Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com) and create account
2. Import your GitHub repository
3. Set build command: `npm run build`
4. Set environment variables:
   - `VITE_API_URL=https://your-render-backend-url.onrender.com`
5. Deploy

### 4. Update CORS (Optional)

For security, update the backend CORS to only allow your frontend domain:

```javascript
// In server.js
app.use(
  cors({
    origin: "https://your-frontend-domain.vercel.app",
    credentials: true,
  }),
);
```

## Local Development

### Backend

```bash
cd mern-auth-backend
npm install
npm run dev
```

### Frontend

```bash
cd mern-auth-frontend
npm install
npm run dev
```

## Features

- User registration and login
- JWT authentication
- Protected routes
- Code execution (placeholder)
- Responsive UI with Tailwind CSS

# 🎬 Watchlist App

A full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to create a personalized watchlist of movies and TV series. Content is dynamically fetched from the [TMDB API](https://www.themoviedb.org/documentation/api), and users can browse trending titles, search for movies/series, and track what they've watched.

---

## 🚀 Features

- 🔐 Secure user authentication via [Clerk](https://clerk.dev)
- 🧾 Fully functional watchlist (add, view, delete)
- ✅ Mark movies or shows as watched
- ⭐ Add personal ratings
- 📥 Real-time movie & TV series search powered by TMDB API
- 🔍 Suggested trending content on homepage
- 📱 Responsive UI with accessibility support (keyboard navigation, screen reader-friendly)
- 🔔 Toast notifications for feedback and actions

---

## 🛠️ Tech Stack

**Frontend:**

- React (with Vite)
- Clerk for authentication
- Axios for API calls
- React Router for navigation
- React Toastify for notifications
- Lucide for icons

**Backend:**

- Node.js + Express.js
- MongoDB + Mongoose
- TMDB API for movie data
- dotenv, sanitize-html, express-validator

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/eeturonkko/watchlist-app.git
cd watchlist-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Backend environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

```bash
MONGO_CONN_URI=your_mongodb_connection_uri
```

### 4. Frontend Setup

```bash
cd frontend
npm install
```

### 5. Frontend environment Variables

Create a `.env` file in the `frontend` directory and add the following variables:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 6. Start the application

```bash
cd backend
nodemon index.js
```

```bash
cd frontend
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to view the application.

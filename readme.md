# 🎬 Watchlist App

A full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to build their own personalized watchlist of movies and TV series using data fetched from the [TMDB API](https://www.themoviedb.org/documentation/api).

Users can sign up, browse suggestions, search for content, and add or remove items from their watchlist.

---

## 🚀 Features

- 🔐 User authentication using [Clerk](https://clerk.dev)
- 🧾 Personalized watchlist (create, read, delete items)
- 📥 Fetch movie & series data from TMDB API
- 🔍 Search functionality with real-time results
- 🧠 Suggested trending content on the homepage
- 🗑 Remove items from watchlist
- ✅ Mark items as watched
- ⭐ Add personal rating to watched items
- 📱 Responsive and accessible UI with toast notifications
- ♿ Keyboard & screen reader accessibility

---

## 🛠️ Tech Stack

**Frontend:**

- React (with Vite)
- Clerk for auth
- Axios / Fetch API
- React Router
- Toast library

**Backend:**

- Node.js
- Express.js
- MongoDB + Mongoose
- TMDB API integration

---

## 📦 Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/YOUR-USERNAME/watchlist-app.git
cd watchlist-app
```

2. Backend Setup:

   - Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

   - Install dependencies:

   ```bash
   npm install
   ```

   - Create a `.env` file in the `backend` directory and add your TMDB API key:

   ```plaintext
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

3. Frontend Setup:


    - Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

    - Install dependencies:
    ```bash
    npm install
    ```

    - Create a `.env` file in the `frontend` directory and add your Clerk API keys:
    ```plaintext
    VITE_CLERK_API_KEY=your_clerk_api_key_here
    ```

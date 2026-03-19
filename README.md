🚀 PopX Authentication App (Full Stack)

A full-stack authentication web application built using React, Node.js, Express, MongoDB, and JWT, featuring user signup, login, protected routes, and deployment on Vercel (frontend) and Render (backend).

📌 Features

✅ User Signup with validation

✅ Secure Login using JWT authentication

✅ Password hashing using bcrypt

✅ Protected Profile page

✅ Logout functionality

✅ Backend API with MongoDB

✅ Responsive UI (mobile-friendly)

✅ Deployed frontend & backend

✅ Handles Render free-tier cold start gracefully

🛠️ Tech Stack
Frontend

React (Vite)

React Router DOM

HTML, CSS (custom UI)

Fetch API

Backend

Node.js

Express.js

MongoDB (Mongoose)

JSON Web Token (JWT)

bcryptjs

dotenv

cors

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

📂 Project Structure
EDUCASE/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── .gitignore

🔐 Authentication Flow

User signs up → data stored securely in MongoDB

User logs in → backend returns JWT token

Token stored in browser localStorage

Protected routes check token

Logout clears token and user data

🌍 Live Deployment

Frontend (Vercel):
👉 https://educase-rosy.vercel.app/

Backend (Render):
👉 https://educase-nqc5.onrender.com

⚙️ Environment Variables (Backend)

Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


⚠️ .env is ignored via .gitignore for security.

▶️ Run Locally
1️⃣ Clone Repository
git clone https://github.com/your-username/educase.git
cd educase

2️⃣ Run Backend
cd backend
npm install
npm run dev


Backend runs at:

http://localhost:5000

3️⃣ Run Frontend
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🔗 API Endpoints
Signup
POST /api/auth/signup

Login
POST /api/auth/login

🧪 Testing

API tested using Postman / Thunder Client

Frontend tested manually for:

Invalid credentials

Duplicate signup

Route protection

Token persistence

Logout behavior

⚠️ Render Free Tier Note

Render free-tier services go to sleep after inactivity.

✔ First request may take a few seconds
✔ App handles this gracefully with timeout and user feedback

This behavior is expected and handled intentionally.

📸 Screens / UI

Welcome Page

Signup Page

Login Page

Profile Page

(UI closely follows provided design mockups)

🎯 Key Learnings

Full-stack authentication implementation

JWT-based security

Protected routes in React

Handling cold starts in production

Clean project structure

Deployment with environment variables

🏆 Interview Explanation (One Line)

“I built and deployed a full-stack authentication system using React, Node.js, MongoDB, and JWT with protected routes and production deployment.”

📌 Future Improvements

🔄 Refresh token support

📧 Email verification

🔐 Forgot password

👤 Profile edit

🛡️ Role-based access control

👤 Author

Your Name
📧 Email: your-email@example.com

🔗 GitHub: https://github.com/your-username

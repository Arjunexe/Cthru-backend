# Cthru – Social Media Backend (MERN Stack)

A backend for a social media platform similar to Instagram, built using the **MERN Stack** with authentication, Cloudinary image uploads, MongoDB database, and real‑time features via Socket.io.

---

## 🚀 Live Demo

Frontend Live URL: **https://cthru-frontend.vercel.app/**

## 📦 GitHub Repository

Backend Repo: **https://github.com/Arjunexe/Cthru-backend.git**

---

## 🛠️ Tech Stack

- **MongoDB** – Database
- **Express.js** – Backend framework
- **React.js** – Frontend
- **Node.js** – Server
- **Tailwind CSS** – Styling (frontend)
- **Cloudinary** – Image storage
- **JWT** – Authentication
- **Socket.io** – Real‑time notification

---

## ▶️ Run the Backend Locally

```bash
npm install
npm start
```

This uses **nodemon** under the hood for auto‑restarts.

---

## 📁 Environment Variables

Create a `.env` file in the project root:

```
PORT = 5000
MONGO_DB = your_mongodb_connection_string
SECRETKEY = your_secret_key

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

# OTP / Email
EMAIL_USER="Cthru <no-reply@yourdomain.com>"
RESEND_API=your_resend_api_key
```

---

## 📜 Scripts (from package.json)

```json
"scripts": {
  "start": "nodemon index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

---

## ✨ Features

- User authentication (JWT)
- Secure password hashing (bcrypt)
- Cloudinary image upload
- Real‑time chat using Socket.io
- Modular controllers and routes
- MongoDB models with Mongoose
- Email OTP support
- CORS configured Express server

---

## 👨‍💻 Author

**Arjun vm**

---

## 📄 License

ISC License

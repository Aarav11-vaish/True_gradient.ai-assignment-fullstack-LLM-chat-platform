# 🤖 ChatBot – LLM-Based Chat Application

A full-stack real-time chat application built using **React**, **Node.js**, **Express**, **MongoDB**, and **Google Gemini AI**.  
Supports **Google OAuth**, multiple chat sessions, persistent history, and a clean, responsive UI.

---

## 🚀 Features

- 🤖 **AI-Powered Conversations** (Google Gemini 2.5 Flash)
- 🔐 **Google Authentication** (Firebase OAuth)
- 💬 **Multiple Chat Sessions**
- 💾 **Persistent Chat History** (MongoDB)
- 🎨 **Modern UI** (Tailwind CSS & DaisyUI)
- 📱 **Fully Responsive**
- ⚡ **Fast & Lightweight** (React 19 + Vite + Zustand)

---

## 🛠 Tech Stack

### **Frontend**
- React 19
- Vite
- Tailwind CSS + DaisyUI
- Zustand (State Management)
- React Router
- Firebase Auth
- Axios

### **Backend**
- Node.js
- Express
- MongoDB + Mongoose
- Google Gemini AI SDK
- JWT Authentication
- Cookie Parser

---

## 📦 Prerequisites

Ensure you have installed:

- **Node.js** (v18+)
- **MongoDB** (local or Atlas)
- A **Firebase project** with Google Auth enabled
- A **Google Gemini API key**

---

## 📥 Installation

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_jwt_secret_key
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```

Update `src/configfirebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id"
};
```

Update axios base URL if backend runs on another port:
```javascript
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});
```

---

## ▶️ Running the Application

### Start Backend
```bash
cd backend
node index.js
```

**Backend:** http://localhost:3000

### Start Frontend
```bash
cd frontend
npm run dev
```

**Frontend:** http://localhost:5173

---

## 📁 Project Structure
```
├── backend/
│   ├── models/
│   │   ├── userSchema.js
│   │   └── chatstoreschema.js
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx
│   │   │   ├── Home_page.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Input_button.jsx
│   │   ├── state_management/
│   │   │   ├── authStore.js
│   │   │   └── chatstore.js
│   │   ├── configfirebase.js
│   │   ├── login.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── axios.js
│   ├── index.html
│   └── package.json
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/google-signin` | Google OAuth login |
| GET | `/checkAuth` | Verify login |
| POST | `/logout` | Clear session |

### Chat Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/new-chat` | Create new chat session |
| GET | `/all-chats` | Get all user chats |
| GET | `/chat/:id` | Fetch messages of a chat |
| POST | `/chat/:id/messages` | Send user message |

---

## 🔍 Key Features Explained

### 🔐 Authentication Flow

1. User signs in with Google
2. Firebase handles OAuth
3. Frontend sends user token to backend
4. Backend verifies & returns JWT
5. JWT stored in HttpOnly cookie
6. User stays logged in securely

### 💬 Chat Workflow

1. User creates new chat
2. User message sent to backend
3. Backend forwards message to Gemini
4. Gemini generates reply
5. Both stored in MongoDB
6. Updated messages returned to frontend

---

## ⚙️ Environment Variables

### Backend `.env`
```env
MONGO_URI=mongodb://localhost:27017/chatbot
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_secret_key
```

### Frontend Firebase Config

Edit `src/configfirebase.js` with your Firebase credentials.

---

## 🔐 Security Features

- ✅ JWT Authentication
- ✅ HttpOnly Cookies (prevents XSS)
- ✅ CORS with strict origin
- ✅ Protected backend routes
- ✅ Google OAuth (no passwords)

---

## ❗ Common Issues & Solutions

### ❌ CORS Error

**Fix:** Add correct origin in backend.
```javascript
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
```

### ❌ Auth Not Persisting

**Ensure:**
```javascript
withCredentials: true
```

is set in axios config.

### ❌ MongoDB Not Connecting

**Check:** If MongoDB service is running.

### ❌ Gemini API Fails

**Ensure:** Model name is correct: `gemini-2.5-flash`

---

## 🌟 Future Enhancements

- [ ] Auto-generated Chat Titles
- [ ] Message Editing / Deletion
- [ ] Chat Export (PDF/TXT)
- [ ] Dark Mode
- [ ] File Upload Support
- [ ] Typing Indicators
- [ ] Timestamps
- [ ] Chat Search

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push and open a PR

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- Google Gemini AI
- Firebase Authentication
- MongoDB
- Tailwind CSS & DaisyUI

---

**⚠️ Security Note:** Never commit `.env` files or expose API keys in your code!

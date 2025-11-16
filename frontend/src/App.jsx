import './App.css'
import Login from './login.jsx'
import Home from './components/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import userAuthstore from '../state_management/authStore.js'
import Home_page from './components/Home_page.jsx';
function App() {
  const { isloggedin, checkAuth, loading } = userAuthstore();

  useEffect(() => {
    checkAuth(); // 👈 check login on every refresh
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Checking session...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isloggedin ? <Home /> : <Home_page/>}
        />
        <Route
          path="/login"
          element={isloggedin ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
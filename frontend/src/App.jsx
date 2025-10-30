import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login.jsx'
import Home from './components/Home.jsx'
import Input_button from './components/Input_button.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>


        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <>
            <Home />
          </>
        } />



      </Routes>
    </Router>
  )
}

export default App

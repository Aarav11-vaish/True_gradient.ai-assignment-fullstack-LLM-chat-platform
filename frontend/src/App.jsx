import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login.jsx'
import Home from './components/Home.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='bg-slate-600 text-xs'>hwllo</h1>
        <Home/>
        <Login/>
      </div>
    </>
  )
}

export default App

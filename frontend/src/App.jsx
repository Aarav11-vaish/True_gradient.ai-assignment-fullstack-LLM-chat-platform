import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login.jsx'
import Home from './components/Home.jsx'
import Input_button from './components/Input_button.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Home/>
<Input_button/>
        {/* <Login/> */}
      </div>
    </>
  )
}

export default App

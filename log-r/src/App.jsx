import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './components/external/home/home'
import Login from './components/external/login/login'
import Signup from './components/external/signup/signup'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="font-nunito">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </div>
  )
}

export default App

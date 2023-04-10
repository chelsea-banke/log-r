import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './components/external/home/home'
import Login from './components/external/login/login'
import Signup from './components/external/signup/signup'
import Dashboard from './components/internal/dashboard/dashboard'
import CreateNewLogbook from './components/internal/create-new-logbook/create-new-logbook' 
import Guide from './components/internal/guide/guide'
import Logbooks from './components/internal/logbooks/logbooks'
import Book from './components/internal/book/book'
import CreateNewLog from './components/internal/create-new-log/create-new-log'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="font-nunito">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/logbooks' element={<Logbooks/>} />
        <Route path='/create-new-logbook' element={<CreateNewLogbook/>} />
        <Route path='/guide' element={<Guide/>} />
        <Route path='/book' element={<Book/>} />
        <Route path='/create-new-log' element={<CreateNewLog/>} />
      </Routes>
    </div>
  )
}

export default App

import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/userContext'
import { LogbookProvider } from './context/logbookContext'
import { RoleProvider } from './context/roleContext'
import { UsersProvider } from './context/usersContext'

import Home from './components/external/home/home'
import Login from './components/external/login/login'
import Signup from './components/external/signup/signup'
import Dashboard from './components/internal/dashboard/dashboard'
import CreateNewLogbook from './components/internal/create-new-logbook/create-new-logbook' 
import Guide from './components/internal/guide/guide'
import Logbooks from './components/internal/logbooks/logbooks'
import Book from './components/internal/book/book'
import CreateNewLog from './components/internal/create-new-log/create-new-log'
import Settings from './components/internal/settings/settings'
import Contact from './components/internal/contact/contact'
import Redirect from './components/shared/redirect'

import './App.css'

function App() {

  return (
    <div className="font-nunito">
      <UserProvider value={undefined}>
        <LogbookProvider value={undefined}>
          <RoleProvider value={undefined}>
            <UsersProvider value={undefined}>
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/logbooks' element={<Logbooks/>} />
                <Route path='/create-new-logbook' element={<CreateNewLogbook/>} />
                <Route path='/guide' element={<Guide/>} />
                <Route path='/logbook' element={<Book/>} />
                <Route path='/create-new-log' element={<CreateNewLog/>} />
                <Route path='/settings' element={<Settings/>} />
                <Route path='/contact' element={<Contact/>} />
              </Routes>
            </UsersProvider>
          </RoleProvider>
        </LogbookProvider>
      </UserProvider>
    </div>
  )
}

export default App

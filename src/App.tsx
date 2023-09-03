import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './views/Auth/LoginForm'
import Home from './views/Home'
import RegisterForm from './views/Auth/RegisterForm'

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<LoginForm />}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/containers' element={<Home/>}/>
        </Routes>
    </Router>
  )
}

export default App

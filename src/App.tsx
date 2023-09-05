import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './views/Auth/LoginForm'
import RegisterForm from './views/Auth/RegisterForm'
import AllContainers from './views/AppComponents/Containers'
import RepairList from './views/AppComponents/RepairList'

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<LoginForm />}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/containers' element={<AllContainers/>}/>
          <Route path='/repair-list' element={<RepairList/>}/>
        </Routes>
    </Router>
  )
}

export default App

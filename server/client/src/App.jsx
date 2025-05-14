import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import MedicalDashboard from './components/MedicalDashboard'
import AddMedicine from './pages/AddMedicine'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {

  return (
    <>  
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/medicaldashboard" element={<MedicalDashboard/>} />
        <Route path="/addmedicine" element={<AddMedicine/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

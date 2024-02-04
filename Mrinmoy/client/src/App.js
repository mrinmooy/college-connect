import React from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar.js'
import Home from './components/Home.js'
import About from './components/About.js'
import Contact from './components/Contact.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'

function App() {
  return (
    <>
      <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      
     
      <Route path='/about' element={<About/>}/>
      

      <Route path='contact' element={<Contact/>}/>
      

      <Route path='login' element={<Login/>}/> 
     

      <Route path='signup' element={<Signup/>}/>
      
    </Routes>

    </>
  )
}

export default App
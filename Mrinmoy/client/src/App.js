import React, { createContext, useReducer } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar.js'
import Home from './components/Home.js'
import About from './components/About.js'
import Contact from './components/Contact.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import Logout from './components/Logout.js'
import { initialState, reducer } from './reducer/UseReducer.js';

export const UserContext = createContext();

const Routing = () =>{
  return(
    <Routes>
    <Route path='/' element={<Home/>}/>
    
   
    <Route path='/about' element={<About/>}/>
    

    {/* <Route path='contact' element={<Contact/>}/> */}
    

    <Route path='/login' element={<Login/>}/> 
   

    <Route path='/signup' element={<Signup/>}/>

    <Route path='/logout' element={<Logout/>}/>
    
  </Routes>
  )
}
function App() {




const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    
     <Navbar/>
    <Routing/>
   

        </UserContext.Provider>
    </>
  )
}

export default App
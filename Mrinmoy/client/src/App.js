import React, { createContext, useEffect, useReducer, useState } from 'react'
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
import ChatPage from './pages/ChatPage.js';
import Cookies from 'js-cookie';

export const UserContext = createContext();

const Routing = () =>{
  return(
    <Routes>
    <Route path='/' element={<Home/>}/>
    
   
    <Route path='/about' element={<About/>}/>
    

    {/* <Route path='contact' element={<Contact/>}/> */}

    <Route path='/chats' element={<ChatPage/>}/>
    

    <Route path='/login' element={<Login/>}/> 
   

    <Route path='/signup' element={<Signup/>}/>

    <Route path='/logout' element={<Logout/>}/>
    
  </Routes>
  )
}
function App() {




const [state, dispatch] = useReducer(reducer, initialState)
// const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const userToken = Cookies.get('jwtoken'); // Assuming 'userToken' is your cookie name
//   if (userToken) {
//     console.log('found');
//     dispatch({ type: 'User_Logged_In', payload: true }); // Update your action and payload accordingly
//   } else {
//     dispatch({ type: 'User_Logged_Out', payload: false }); // Update your action accordingly
//   }
//   setLoading(false);
// }, []);

//   if(loading){
//     return(
//       <>
//         <div>
//           Loading...
//         </div>
//       </>
//     )
//   }

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
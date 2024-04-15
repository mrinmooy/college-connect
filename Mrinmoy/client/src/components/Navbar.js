import {React, useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import'./Navbar.css'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';
import Cookies from 'js-cookie';

function Navbar() {
  // Define a custom active class style
  // You can define this in your CSS file and adjust the styling as needed.
  // Here's an example:
  const activeStyle = {
    fontWeight: "bold",
    color: "white",
    textDecoration: "underline",
  };

const {state, dispatch}  =  useContext(UserContext);
const [loading, setLoading] = useState(false);


  const RenderMenu = () => {

    if(localStorage.getItem("userInfo")){

      return(
        <>
          <li className="nav-item">
            {/* Use activeClassName to specify a class that gets added when the link is active */}
            {/* Or use the `style` prop with a function that returns the activeStyle if isActive is true */}
            <NavLink className="nav-link" exact="true" to="/" style={({ isActive }) => isActive ? activeStyle : null}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/About" style={({ isActive }) => isActive ? activeStyle : null}>My Profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Chats" style={({ isActive }) => isActive ? activeStyle : null}>Chats</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink className="nav-link" to="/Contact" style={({ isActive }) => isActive ? activeStyle : null}>Contact</NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/Logout" style={({ isActive }) => isActive ? activeStyle : null}>Logout</NavLink>
          </li>

        </>
      )

    }else{
      return(
        <>
          <li className="nav-item">
            {/* Use activeClassName to specify a class that gets added when the link is active */}
            {/* Or use the `style` prop with a function that returns the activeStyle if isActive is true */}
            <NavLink className="nav-link" exact="true" to="/" style={({ isActive }) => isActive ? activeStyle : null}>Home</NavLink>
          </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/Chats" style={({ isActive }) => isActive ? activeStyle : null}>Chats</NavLink>
            </li>
          {/* <li className="nav-item">
            <NavLink className="nav-link" to="/Contact" style={({ isActive }) => isActive ? activeStyle : null}>Contact</NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/Login" style={({ isActive }) => isActive ? activeStyle : null}>Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Signup" style={({ isActive }) => isActive ? activeStyle : null}>Registration</NavLink>
          </li>

        
        </>
      )

    }

  }

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

  // if(loading){
  //   return(
  //     <>
  //       <div>
  //         Loading...
  //       </div>
  //     </>
  //   )
  // }
  // else{
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="#"> </NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">
          <RenderMenu/>
        </ul>
      </div>
    </nav>
  );
}
// }

export default Navbar;

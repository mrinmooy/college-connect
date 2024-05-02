import React,{useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';


const Logout = () => {

    const {state, dispatch}  =  useContext(UserContext);

    var navigate = useNavigate();

    const logUserOut = async()=>{
        try {
          const res = await fetch('https://college-connect-backend-dmpz.onrender.com/logout',{
            method: "GET",
            headers:{
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            credentials: "include"
          });
          dispatch({type:'USER', payload: false})
          localStorage.removeItem("userInfo");
          navigate('/login')
         
          if(res.status !==200){
            const error = new Error(res.error);
            throw error;
          }
        } catch (error) {
          console.log(error);
        }
    }
  


useEffect(()=>{
    logUserOut();
    },[])
  return (
    <>
        <h1>Logout Page</h1>
    </>
  )
}

export default Logout
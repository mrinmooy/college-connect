import React, {useContext, useState} from 'react'
// import './Login.css'
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Login() {

  const {state, dispatch}  =  useContext(UserContext);

  var navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const loginUser = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/signin', {
      credentials: 'include',
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await res.json();

    if(res.status===400 || !data){
      window.alert("Invalid Credentials")
    }else{
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({type:"USER", payload: true});
      window.alert("Login Successful")
      navigate('/')
    }

  }




  return (
    <div className="login-container">
    
    <section className="sign-in">
      <div className="container mt-5">
        <div className="signin-content">


          <div className="signin-form">
            <h4 className="form-title"> Sign In</h4>
            <form method="POST" className="register-form" id="register-form">


              <div className="form-group">
                <label htmlFor="email">
                   Email:
                </label>
                
                <input type="email" name="email" id="email" autoComplete="off" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder=" Your Email"/>
              </div>

              <div className="form-group">
                <label htmlFor="PASSWORD">
                   Password:
                </label>
                <input type="password" name="password" id="password" autoComplete="off" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder=" Your Password"/>
              </div>

              <div className="form-group form-button">
                <input type="submit" name="signin" id="signin" className="form-submit" 
                onClick={loginUser}
                value="Log In"/>
              </div>


            </form>

          </div>



        </div>
      </div>
    </section>
    </div>
  )
}

export default Login
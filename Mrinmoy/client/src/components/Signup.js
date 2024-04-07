// SignupPage.js
import React, {useState} from 'react';
//import {useHistory} from 'react-router-dom';

import './Signup.css'; // Import your CSS file

const Signup = () => {

  //const history = useHistory();

  const [user,setUser] = useState({
    name:"", email:"", phone:"", work:"", password:"", cpassword:"",
  });


  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value});
  }


  const PostData = async (e) => {

    e.preventDefault()

    const {name, email, phone, work, password, cpassword} = user;

    const res = await fetch('http://localhost:5000/register', {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    })

    const data = res.json();

    if(data.status === 422 || !data){
      window.alert("Invalid Resgistration");
      console.log("Invalid Resgistration");
    }else{
      window.alert("Resgistration Successful");
      console.log("Resgistration Successful");
      //history.push("/login");
    }


  }


  return (
    // <div className="signup-container">
    //   <div className="signup-box">
    //     <h2>Sign Up</h2>
    //     <Signupform />
    //   </div>
    // </div>

    <div className="signup-container">
    
    <section className="sign-up">
      <div className="container mt-5">
        <div className="signup-content">


          <div className="signup-form">
            <h4 className="form-title"> Sign Up</h4>
            <form method="POST" className="register-form" id="register-form">

              <div className="form-group">
                <label htmlFor="name">
                   Name:
                </label>
                
                <input type="text" name="name" id="name" autoComplete="off" 
                value={user.name}
                onChange={handleInputs}
                placeholder=" Your Name"/>
              </div>

              <div className="form-group">
                <label htmlFor="email">
                   Email:
                </label>
                
                <input type="email" name="email" id="email" autoComplete="off" 
                value={user.email}
                onChange={handleInputs}
                placeholder=" Your Email"/>
              </div>


              <div className="form-group">
                <label htmlFor="phone">
                   Phone:
                </label>
                
                <input type="number" name="phone" id="phone" autoComplete="off" 
                value={user.phone}
                onChange={handleInputs}
                placeholder=" Your Phone No."/>
              </div>

              <div className="form-group">
                <label htmlFor="name">
                   Work:
                </label>
                
                <input type="text" name="work" id="work" autoComplete="off" 
                value={user.work}
                onChange={handleInputs}
                placeholder=" Your Profession"/>
              </div>

              <div className="form-group">
                <label htmlFor="cpasswprd">
                   Password:
                </label>
                <input type="password" name="password" id="password" autoComplete="off" 
                value={user.password}
                onChange={handleInputs}
                placeholder=" Your Password"/>
              </div>

              <div className="form-group">
                <label htmlFor="cpassword">
                   Password:
                </label>
                <input type="password" name="cpassword" id="cpassword" autoComplete="off" 
                value={user.cpassword}
                onChange={handleInputs}
                placeholder=" Confirm Passowrd"/>
              </div>

              <div className="form-group form-button">
                <input type="submit" name="signup" id="signup" className="form-submit" 
                value="register" onClick={PostData}
                />
              </div>


            </form>

          </div>



        </div>
      </div>
    </section>
    </div>
  );
};

export default Signup;

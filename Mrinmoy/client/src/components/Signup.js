// SignupPage.js
import React from 'react';
import Signupform from './Signupform'; // Import the form component
import './Signup.css'; // Import your CSS file

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <Signupform />
      </div>
    </div>
  );
};

export default Signup;

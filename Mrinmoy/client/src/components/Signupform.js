import React from 'react';

const SignupForm = () => {
  return (
    <form>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <br />
      <label>
        Phone no.:
        <input type="tel" name="phone" /> {/* Changed type to "tel" and name to "phone" */}
      </label>
      <br />
      <label>
        Work:
        <input type="text" name="work" /> {/* Changed name to "work" */}
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" /> {/* Changed type to "password" */}
      </label>
      <br />
      <label>
        Confirm Password:
        <input type="password" name="confirmPassword" /> {/* Changed type to "password" and name to "confirmPassword" */}
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;

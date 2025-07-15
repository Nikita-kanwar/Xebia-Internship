import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [LoggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setLoggedIn(true);
      console.log(email);
      console.log(password);
      
      
    }
  };

  return (
    <div className="loginForm">
      {LoggedIn ? (
        <h2>Welcome, {email} You are now loggedIn</h2>
      ) : (
        <form id="Input-Form" onSubmit={handleSubmit}>
          
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
            />
        

          
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
            />
          


          <button type="submit" className="submitBtn">
            LogIn
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;


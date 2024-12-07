import React, { useState } from 'react';
import './LoginRegisterPage.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="login-container">
      <div className={`form-container ${isSignUp ? 'sign-up-mode' : ''}`}>
        <div className="form-box">
          <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <form>
            {isSignUp && (
              <div className="input-group">
                <input type="text" required />
                <label>Full Name</label>
              </div>
            )}
            <div className="input-group">
              <input type="email" required />
              <label>Email</label>
            </div>
            <div className="input-group">
              <input type="password" required />
              <label>Password</label>
            </div>
            {isSignUp && (
              <div className="input-group">
                <input type="password" required />
                <label>Confirm Password</label>
              </div>
            )}
            <button type="submit" className="submit-btn">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            <p className="toggle-text">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <span onClick={toggleForm}>
                {isSignUp ? ' Sign In' : ' Sign Up'}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

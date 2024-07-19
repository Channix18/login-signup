import React, { useState } from 'react';
import './LoginSignup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const Dashboard = ({ user, logout }) => {
  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard, {user.name}!</h2>
      <div className="profile">
        <img src={user_icon} alt="User" />
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
      <div className="sections">
        <div className="section">
          <h3>Posts</h3>
          <p>Your recent posts go here...</p>
        </div>
        <div className="section">
          <h3>Friends</h3>
          <p>Your friends list...</p>
        </div>
        <div className="section">
          <h3>Notifications</h3>
          <p>Recent notifications...</p>
        </div>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailDomainPattern = /\.(com|com\.ph)$/;

    if (action === "Sign Up") {
      if (!formData.name) {
        errors.name = "Name is required";
      }
      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!emailPattern.test(formData.email)) {
        errors.email = "Email address is invalid";
      } else if (!emailDomainPattern.test(formData.email)) {
        errors.email = "Email must end with .com or .com.ph";
      }
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      } else if (!/[A-Z]/.test(formData.password)) {
        errors.password = "Password must contain at least one capital letter";
      } else if (!/\d/.test(formData.password)) {
        errors.password = "Password must contain at least one number";
      } else if (!/[@$!%*?&]/.test(formData.password)) {
        errors.password = "Password must contain at least one special character (@$!%*?&)";
      }
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    } else if (action === "Login") {
      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!emailPattern.test(formData.email)) {
        errors.email = "Email address is invalid";
      } else if (!emailDomainPattern.test(formData.email)) {
        errors.email = "Email must end with .com or .com.ph";
      }
      if (!formData.password) {
        errors.password = "Password is required";
      }
    }
    return errors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (action === "Sign Up") {
        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        };
        setUsers([...users, newUser]);
        alert('Sign Up Successful!');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setErrors({});
        setAction("Login");
      } else if (action === "Login") {
        const user = users.find(user => user.email === formData.email && user.password === formData.password);
        if (user) {
          alert('Login Successful!');
          setLoginAttempts(0);
          setIsLoggedIn(true);
          setCurrentUser(user);
        } else {
          setLoginAttempts(prev => prev + 1);
          setErrors({ login: "Invalid email or password" });
        }
      }
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAction("Login");
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setLoginAttempts(0);
    setCurrentUser(null);
  };

  return (
    <div className='container'>
      {isLoggedIn ? (
        <Dashboard user={currentUser} logout={logout} />
      ) : (
        <>
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            {action === "Login" ? null : (
              <div className="input">
                <img src={user_icon} alt="" />
                <input name='name' value={formData.name} onChange={handleChange} placeholder='Name' type="text" />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
            )}
            <div className="input">
              <img src={email_icon} alt="" />
              <input name='email' value={formData.email} onChange={handleChange} placeholder='Email' type="email" />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input name='password' value={formData.password} onChange={handleChange} placeholder='Password' type="password" />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>
            {action === "Sign Up" && (
              <div className="input">
                <img src={password_icon} alt="" />
                <input name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm Password' type="password" />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
              </div>
            )}
          </div>
          {action === "Login" && (
            <div className="forgot-password">
              {loginAttempts >= 2 ? <span>Forgot Password? Click Here!</span> : 'Forgot Password?'}
            </div>
          )}
          <div className="submit-container">
            {action === "Sign Up" ? (
              <div className="submit" onClick={handleSubmit}>Sign Up</div>
            ) : (
              <div className="submit gray" onClick={() => { setAction("Sign Up"); setLoginAttempts(0); }}>Sign Up</div>
            )}
            {action === "Login" ? (
              <div className="submit" onClick={handleSubmit}>Login</div>
            ) : (
              <div className="submit gray" onClick={() => setAction("Login")}>Login</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LoginSignup;

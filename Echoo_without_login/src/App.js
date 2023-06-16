import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [loginDisplay, setLoginDisplay] = useState(false);
  const [csrftoken, setCsrfToken] = useState('');

  const loginToggle = () => {
    setLoginDisplay(!loginDisplay);
  };

  useEffect(() => {
    const loginDiv = document.getElementById('login-form');
    if (loginDisplay) {
      loginDiv.style.display = 'block';
    } else {
      loginDiv.style.display = 'none';
    }
  }, [loginDisplay]);


  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/get_react_csrftoken');
        const data = await response.json();
        setCsrfToken(data.csrfToken);
        window.cht_csrf_token = data.csrfToken;
      } catch (error) {
        console.log('Error:', error);
        const writeErr = document.getElementById('write_error');
        writeErr.innerText = error;
      }
    };

    fetchCsrfToken();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.elements.username.value;
    const password = form.elements.password.value;

    // Make the API request to your Django backend
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Invalid credentials') {
          // Handle invalid credentials
          console.log('Invalid credentials');
          const writeErr = document.getElementById('write_error');
          writeErr.innerText = 'Invalid credentials';
        } else {
          // Handle successful login
          console.log('Login successful');
          window.location.reload();
        }
      })
      .catch((error) => {
        // Handle error
        console.log('Error:', error);
        const writeErr = document.getElementById('write_error');
        writeErr.innerText = error;
      });
  };



  return (
    <div className="App">
      <div id="Navbar">
        <div id="header">
          <div id="main_header">
            ECHOO
            <svg
              preserveAspectRatio="xMidYMid meet"
              data-bbox="5.137 5.637 188.725 188.725"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="5.137 5.637 188.725 188.725"
              role="presentation"
              aria-hidden="true"
            >
              <g>
                <path
                  className="st0"
                  d="M149.8,80l37.8-37.8c8.3-8.3,8.3-21.9,0-30.3s-21.9-8.3-30.3,0l-37.8,37.8c-8.3,8.3-8.3,21.9,0,30.3
		S141.4,88.3,149.8,80z"
                ></path>
                <path
                  className="st0"
                  d="M49.2,120l-37.8,37.8c-8.3,8.3-8.3,21.9,0,30.3s21.9,8.3,30.3,0l37.8-37.8c8.3-8.3,8.3-21.9,0-30.3
		S57.6,111.7,49.2,120z"
                ></path>
                <path
                  className="st0"
                  d="M149.8,120c-8.3-8.3-21.9-8.3-30.3,0s-8.3,21.9,0,30.3l37.8,37.8c8.3,8.3,21.9,8.3,30.3,0s8.3-21.9,0-30.3
		L149.8,120z"
                ></path>
                <path
                  className="st0"
                  d="M41.7,12c-8.3-8.3-21.9-8.3-30.3,0s-8.3,21.9,0,30.3L49.2,80c8.3,8.3,21.9,8.3,30.3,0s8.3-21.9,0-30.3L41.7,12
		z"
                ></path>
              </g>
            </svg>
          </div>
          <div id="logout" onClick={loginToggle}>
            Login
          </div>
        </div>
      </div>
      <div>
        <div className="login-form" id="login-form">
          <div id='cross'>
            <div id='write_error'></div>
            <div onClick={loginToggle}>X</div>
          </div>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="home-container">
        <h1>Welcome to Echoo</h1>
        <p>Start chatting with friends in real-time!</p>
        <button className="start-button">Get Started</button>
      </div>
    </div>
  );
}

export default App;

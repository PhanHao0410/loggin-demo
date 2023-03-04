import logo from './logo.svg';
import React, { useState } from 'react';
import './App.scss';

function App() {
  const [hide, setHide] = useState(true);
  return (
    <div className="App">
      <div className="loggin">
        <div className="form-singIn">
          <p>Sign In</p>
          <input type="email" placeholder="Enter your email" /><br />
          <div className="passwordInput">
            <input type={hide ? "password" : "texr"} placeholder="Enter your password" />
            <span onClick={() => setHide(!hide)}><i class={hide ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i></span>
          </div>

          <button>SIGN IN</button><br />
          <a>Forgot Password?</a>
        </div>
      </div>
      <div className="loggin-right"></div>
    </div>
  );
}

export default App;

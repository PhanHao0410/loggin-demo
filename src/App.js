import logo from './logo.svg';
import React, { useState } from 'react';
import './App.scss';

function App() {
  const [hide, setHide] = useState(true);
  function getValue(id) {
    return document.getElementById(id).value.trim();
  }
  function validate() {
    let email = getValue("email");
    let checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!checkEmail.test(email)) {
      alert(`Email: ${email} không hợp lệ`);
      return false;
    }
    let password = getValue("password");
    let hashUpperFirst = password.match(/[A-Z]/);
    let hashLower = password.match(/[a-z]/g);
    let hashNumber = password.match(/[0-9]/g);
    if (!password || !hashUpperFirst || !hashLower || !hashNumber || password.length < 8) {
      alert(`Password: ${password} không hợp lệ`);
      return false;
    } else { }
    alert(`Email: ${email} - Password: ${password} nhập đúng`);
    return true;

  }
  return (
    <div className="App">
      <div className="loggin">
        <div className="form-singIn">
          <p>Sign In</p>
          <input type="email" placeholder="Enter your email" id="email" /><br />
          <div className="passwordInput">
            <input type={hide ? "password" : "texr"} placeholder="Enter your password" id="password" />
            <span onClick={() => setHide(!hide)}><i class={hide ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i></span>
          </div>

          <button onClick={() => validate()}>SIGN IN</button><br />
          <a>Forgot Password?</a>
        </div>
      </div>
      <div className="loggin-right"></div>
    </div>
  );
}

export default App;

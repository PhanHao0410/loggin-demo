import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import './App.scss';
import Loggin from './asesst/view/loggin/Loggin';
import ForgetPassword from './asesst/view/loggin/forgetPassword';
import CreatNewPassword from './asesst/view/loggin/CreatNewPassword';
// import {
//   BrowserRouter,
//   Switch,
//   Route,
//   Routes
// } from "react-router-dom";
function App() {
  return (
    // <BrowserRouter>
    <div className="App">
      <header>
        <Loggin />
      </header>
      {/* <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        /> */}
    </div>
    // </BrowserRouter>
  );
}

export default App;

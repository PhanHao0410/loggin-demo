import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import './App.scss';
import Login from './views/auths/login';
import ForgetPassword from './views/auths/forget-password';
import CreatNewPassword from './views/auths/creat-password';
import TestSignIn from './views/todo/testSignIn';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';





function App() {
  return (
    <div>
      <header>
        <Router>
          <Switch>
            <Route exact path={["/login", "/"]} component={Login} />
            <Route path="/forget-password" component={ForgetPassword} />
            <Route path="/create-password" component={CreatNewPassword} />
            <Route path="/test-signin-success" component={TestSignIn} />
          </Switch>
        </Router>
      </header>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>


  )
}

export default App;

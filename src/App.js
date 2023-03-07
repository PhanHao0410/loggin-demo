import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import './App.scss';
import Login from './views/auths/login';
import ForgetPassword from './views/login/forgetPassword';
import CreatNewPassword from './views/login/CreatNewPassword';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';





function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/login", "/"]} component={Login} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/create-password" component={CreatNewPassword} />
      </Switch>
    </Router>

  )
}

export default App;

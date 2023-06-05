import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import './App.scss';
import Login from './views/auths/login';
import ForgetPassword from './views/auths/forget-password';
import CreatNewPassword from './views/auths/creat-password';
import Menu from './views/interface/menu/index';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { PATHS } from './constants';





function App() {
  return (
    <div>
      <header>
        <Router>
          <Switch>
            <Route exact path={PATHS.LOGIN} component={Login} />
            <Route path={PATHS.FORGETPASSWORD} component={ForgetPassword} />
            <Route path={PATHS.CREATNEWPASSWORD} component={CreatNewPassword} />
            <Route path={PATHS.HOME} component={Menu} />
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

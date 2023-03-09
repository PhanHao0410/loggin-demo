import React, { useState } from 'react';
import "./style.scss";
import { Link, Router } from 'react-router-dom';

function ForgetPassword() {
    const [errorEmail, setErrorEmail] = useState(null);
    function handleChangeEmail(event) {
        let email = event.target.value.trim();
        let checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailIsValid = checkEmail.test(email);
        if (email === "") {
            setErrorEmail("Please input the email.");
            return false;
        };
        if (!emailIsValid) {
            setErrorEmail("The email is invalid.");
            return false
        };
        setErrorEmail(null);
        return true;
    }
    return (
        <div className="Loggin">
            <div className="loggin-forgot">
                <div className="form-singIn">
                    <p>Forgot Password</p>
                    <input className={errorEmail ? "inputError" : ""} onChange={handleChangeEmail} type="email" placeholder="Enter your email" id="email" /><br />
                    {errorEmail && <div style={{ color: "red" }} className="showErrorEmail">{errorEmail}</div>}
                    <Link to="/create-password"><button onClick="handleChangeEmail();handleChangePasssword()" >SEND INSTRUCTION</button><br /></Link>
                    <div className="title-bottom-forget">Do not forget to check your SPAM box.</div>
                </div>
            </div>
            <div className="loggin-right"></div>
        </div>
    )
}
export default (ForgetPassword);
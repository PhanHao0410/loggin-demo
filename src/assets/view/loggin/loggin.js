import React, { useState } from 'react';
import "./loggin.scss";

function Loggin() {
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [hide, setHide] = useState(true);

    function handleChangeEmail(event) {
        let email = event.target.value.trim();
        let checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailIsValid = checkEmail.test(email);
        if (email === "") {
            setErrorEmail("Please input the email.");
            // toast.error('please input email');
            return false;

        };
        if (!emailIsValid) {
            setErrorEmail("The email is invalid.");
            return false
        };
        setErrorEmail(null);
        return true;
    }
    function handleChangePasssword(event) {
        let password = event.target.value.trim();
        console.log("password: ", password);
        let hashUpperFirst = password.match(/[A-Z]/);
        let hashLower = password.match(/[a-z]/g);
        let hashNumber = password.match(/[0-9]/g);
        if (password === "") {
            setErrorPassword("Please input the password.");
            return false;
        };
        if (!hashUpperFirst || !hashLower || !hashNumber || password.length < 8) {
            setErrorPassword("Password must be at least 8 characters, first character upperlower and number");
            return false;
        };
        setErrorPassword(null);
        return true;
    }

    return (
        <div className="Loggin">
            <div className="loggin-container">
                <div className="form-singIn">
                    <p>Sign In</p>
                    <input className={errorEmail ? "inputError" : ""} onChange={handleChangeEmail} type="email" placeholder="Enter your email" id="email" /><br />
                    {errorEmail && <div style={{ color: "red" }} className="showErrorEmail">{errorEmail}</div>}
                    <div className="passwordInput">
                        <input type={hide ? "password" : "text"} onChange={handleChangePasssword} className={errorPassword && "inputError"} placeholder="Enter your password" id="password" />
                        <span onClick={() => setHide(!hide)}><i className={hide ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i></span>
                    </div>
                    {errorPassword && <div className="showErrorPassword" style={{ color: "red" }}>{errorPassword}</div>}

                    <button >SIGN IN</button><br />
                    <div className="forgetPasswordLoggin" >
                        {/* <NavLink className="forgetPasswordLoggin" to="/fogot-password" activeClassName="active" exact={true}>Forgot Password?</NavLink> */}
                    </div>
                </div>
            </div>
            <div className="loggin-right"></div>
        </div>
    )
}
export default (Loggin);

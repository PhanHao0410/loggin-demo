import React, { useEffect, useState } from 'react';
import "./style.scss";
import { toast } from 'react-toastify';
import { Link, Router, useHistory } from 'react-router-dom';
import { ACCESS_TOKEN, PATHS } from "../../../constants";
function Loggin() {
    const [email, setEmail] = useState(null);
    const [password, setPasswod] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [hide, setHide] = useState(true);
    const history = useHistory()
    function handleChangeEmail(event) {
        let getEmail = event.target.value.trim();
        let checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailIsValid = checkEmail.test(getEmail);
        if (getEmail === "") {
            setErrorEmail("Please input the email.");
            setEmail(null);
            return false;

        };
        if (!emailIsValid) {
            setErrorEmail("The email is invalid.");
            setEmail(null);
            return false
        }
        setErrorEmail(null);
        setEmail(getEmail);
        return true;

    }
    function handleChangePasssword(event) {
        let getPassword = event.target.value.trim();
        let hashUpperFirst = getPassword.match(/[A-Z]/);
        let hashLower = getPassword.match(/[a-z]/g);
        let hashNumber = getPassword.match(/[0-9]/g);
        if (getPassword === "") {
            setErrorPassword("Please input the password.");
            setPasswod(null);
            return false;
        };
        if (!hashUpperFirst || !hashLower || !hashNumber || getPassword.length < 8) {
            setErrorPassword("Password must be at least 8 characters, first character upperlower and number");
            setPasswod(null);
            return false;
        };
        setErrorPassword(null);
        setPasswod(getPassword);
        return true;
    }
    function checkSignIn() {
        let dataSignIn = {
            email: email,
            last_location: "1.54.210.69",
            password: password
        }
        fetch('https://rms-dev.aps.nexus-dev.com/api/v1/auth/signin', {
            method: "POST",
            body: JSON.stringify(dataSignIn),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then((response) => {
                console.log("Login response:", response);
                if (response.status === "error") {
                    toast.error(response.message);
                } else {
                    toast.success("Successfully Sign In!")
                    localStorage.setItem('DATASIGNIN', JSON.stringify(response));
                    localStorage.setItem(ACCESS_TOKEN, response.token);
                    console.log('check localhost: ', localStorage)
                    // history.push(PATHS.HOME);
                }
            })
            .catch((err) => {
                console.log("check err: ", err)
            })
    }

    // useEffect(() => {
    //     const token = localStorage.getItem(ACCESS_TOKEN)
    //     if (token) {
    //         history.push(PATHS.HOME);
    //     }
    // }, [])


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

                    {/* <Link className="linkForgot" onClick={() => checkSignIn()} to={signIn ? "/test-signin-success" : "/"}><button id="btn-signIn">SIGN IN</button><br /></Link> */}
                    <Link className="linkForgot" onClick={() => checkSignIn()}><button id="btn-signIn">SIGN IN</button><br /></Link>

                    <Link to={PATHS.FORGETPASSWORD}>
                        <div className="forgetPasswordLoggin" >Forgot Password?</div>
                    </Link>
                </div>


            </div>
            <div className="loggin-right"></div>
        </div>
    )
}
export default (Loggin);

import React, { useState } from 'react';
import "./style.scss";
import { withRouter } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
function CreatNewPassword() {
    const [errorPassword, setErrorPassword] = useState(null);
    const [hide, setHide] = useState(true);

    /*function handleChangeEmail(event) {
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
    // function validateSignIn() {

    // }*/
    /*function handleChangeNewPasssword(event) {
        let password = event.target.value.trim();
        let hashUpperFirst = password.match(/[A-Z]/);
        let hashLower = password.match(/[a-z]/g);
        let hashNumber = password.match(/[0-9]/g);
        let hashSpecial = password.match(/[@,$,!,&]/g);
        if(password ===""){
            setErrorNewPassword("Please input the new password");
            return false;
        }
        if(!hashUpperFirst|| !hashLower || !hashNumber ||!hashSpecial){
            setErrorNewPassword("")
        }
    }
    function handleChangeConfirmPasssword(event) {

    }*/
    function getValue(id) {
        return document.getElementById(id).value.trim();
    }
    function validate() {
        // New Password
        let newPassword = getValue("newPassword");
        let hashUpperFirstNew = newPassword.match(/[A-Z]/);
        let hashLowerNew = newPassword.match(/[a-z]/g);
        let hashNumberNew = newPassword.match(/[0-9]/g);
        let hashSpecialNew = newPassword.match(/[@,$,!,&]/g);

        // Confirm Password
        let confirmPassword = getValue("confirmPassword");
        let hashUpperFirstConfirm = confirmPassword.match(/[A-Z]/);
        let hashLowerConfirm = confirmPassword.match(/[a-z]/g);
        let hashNumberConfirm = confirmPassword.match(/[0-9]/g);
        let hashSpecialConfirm = confirmPassword.match(/[@,$,!,&]/g);
        if (newPassword === "" || confirmPassword === "") {
            //alert("please input")

            return false;
        }
        if (newPassword.length < 8 || confirmPassword.length < 8 || !hashUpperFirstNew || !hashLowerNew || !hashNumberNew || !hashSpecialNew || !hashUpperFirstConfirm || !hashLowerConfirm || !hashNumberConfirm || !hashSpecialConfirm) {

            return false;
        }
        if (newPassword !== confirmPassword) {

            return false;
        }
        return true;
    }
    return (
        <div className="Create-password">
            <div className="create-password-container">
                <div className="form-create-password">
                    <p>Create New Password</p>
                    <div className="passwordInput">
                        <input type={hide ? "password" : "text"} className={errorPassword && "inputError"} placeholder="Enter new password" id="newPassword" />
                        <span onClick={() => setHide(!hide)}><i className={hide ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i></span>
                    </div>
                    <div className="passwordInput">
                        <input type={hide ? "password" : "text"} className={errorPassword && "inputError"} placeholder="Enter confirm password" id="confirmPassword" />
                        <span onClick={() => setHide(!hide)}><i className={hide ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i></span>
                    </div>
                    <div className="creat-passsword-note" >Password must have at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 special character (@,$,!,&).</div>

                    <button onClick={() => validate()} >CREAT PASSWORD</button><br />

                </div>
            </div>
            <div className="loggin-right"></div>
        </div>
    )
}
export default (CreatNewPassword);

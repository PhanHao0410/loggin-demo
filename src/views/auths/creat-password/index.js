import React, { useState } from 'react';
import "./style.scss";
function CreatNewPassword() {
    const [errorPassword, setErrorPassword] = useState(null);
    const [hide, setHide] = useState(true);

    function getValue(id) {
        return document.getElementById(id).value.trim();
    }
    function validate() {
        let newPassword = getValue("newPassword");
        let hashUpperFirstNew = newPassword.match(/[A-Z]/);
        let hashLowerNew = newPassword.match(/[a-z]/g);
        let hashNumberNew = newPassword.match(/[0-9]/g);
        let hashSpecialNew = newPassword.match(/[@,$,!,&]/g);

        let confirmPassword = getValue("confirmPassword");
        let hashUpperFirstConfirm = confirmPassword.match(/[A-Z]/);
        let hashLowerConfirm = confirmPassword.match(/[a-z]/g);
        let hashNumberConfirm = confirmPassword.match(/[0-9]/g);
        let hashSpecialConfirm = confirmPassword.match(/[@,$,!,&]/g);
        if (newPassword === "" || confirmPassword === "") {
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

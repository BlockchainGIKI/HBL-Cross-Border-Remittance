import React, { useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "../Custom-Button/Custom-button.component";

import './Sign-up.styles.css';

const SignUp = () => {

    const [Login, setLogin] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if(Password !== confirmPassword){
            alert("Password doesn't match");
            return;
        }
    }

    const handleSignUp = useCallback(() => {
        navigate('/home');
    }, []);

    return (
        <div className="signup-card">
            <h2>I do not have an account</h2>
            <form className="sign-up" onSubmit={ handleSubmit }>
                <div className="row">
                    <div className="col-25">
                        <label className="green">Create Log in ID</label>
                    </div>
                    <div className="col-75">
                        <input 
                            type = "text"
                            name = "Login"
                            value = {Login}
                            onChange = {(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="green">Password</label>
                    </div>
                    <div className="col-75">
                        <input 
                            type = "password"
                            name = "Password"
                            value = {Password}
                            onChange = {(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="green">Confirm Password</label>
                    </div>
                    <div className="col-75">
                        <input 
                            type = "password"
                            name = "confirmPassword"
                            value = {confirmPassword}
                            onChange = {(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <br></br>
                <CustomButton type="submit" handleClick = { handleSignUp }>Sign up</CustomButton>
            </form>
        </div>
    )
}

export default SignUp;

import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAccount } from "../../accountSlice";
import { setKey } from "../../keySlice";
import CustomButton from "../Custom-Button/Custom-button.component";
import './Log-in.styles.css';

const defaultFormField = {
    Id: "",
    Password: "",
};

const Login = () => {

    //const { ID, setID } = useState("");
    //const { Password, setPassword } = useState("");
    const dispatch = useDispatch();
    const [formField, setFormField] = useState(defaultFormField);
    const { Id, Password } = formField;
    const navigate = useNavigate();

    const goToSignUpHandler = useCallback(() => {
        navigate("/signup");
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormField({ ...formField, [name]: value });
        dispatch(setAccount(Id));
        dispatch(setKey(Password));
    };

    const handleSignIn = useCallback(() => {
        navigate('/home');
    }, []);

    return (
        <div className="login-card">
            <form className="log-in">
                <div className="row">
                    <div className="col-25">
                        <label>Enter Login ID</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            name="Id"
                            value={Id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Enter Password</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="password"
                            name="Password"
                            value={Password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div><br />
                <div className="Button-inline">
                    <CustomButton type="submit" handleClick={handleSignIn}> Sign in </CustomButton>
                    <CustomButton handleClick={goToSignUpHandler}> Sign up </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default Login;

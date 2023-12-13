import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Custom-Button/Custom-button.component";
import './Log-in.styles.css';
import { useDispatch } from "react-redux";
import { setAccount } from "../../accountSlice";

const defaultFormField = {
    Id: "",
    Password: "",
};

const Login = () => {

    //const { ID, setID } = useState("");
    //const { Password, setPassword } = useState("");
    // const { setUserId } = useContext(IdContext);
    const dispatch = useDispatch()
    const [formField, setFormField] = useState(defaultFormField);
    const { Id, Password } = formField;
    const navigate = useNavigate();

    const goToSignUpHandler = useCallback(() => {
        navigate("/signup");
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormField({ ...formField, [name]: value });
        console.log("handleSignin", Id)
    };

    useEffect(() => {
        console.log("Id changed:", Id);
    }, [Id]);

    const handleSignIn = useCallback(() => {
        // setUserId(Id)
        // const temp = useContext(IdContext);
        // console.log("Id in handleSignIn:", temp);
        dispatch(setAccount(Id));
        navigate(`/home`);
    }, [Id]);

    return (
        <div className="login-card">
            <form className="log-in">
                <div className="row">
                    <div className="col-25">
                        <label className="green">Enter Login ID</label>
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
                        <label className="green">Enter Password</label>
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

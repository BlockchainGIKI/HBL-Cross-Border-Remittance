import React, { useState } from 'react';
import { useWeb3 } from "../Web3Functions";
import CustomButton from '../Custom-Button/Custom-button.component';
import Card from '../Card/Card.component';
import { useDispatch } from "react-redux";
import { setChange } from "../../changeSlice";
import './SendToken.styles.css';

const defaultFormField = {
    branch: "",
    amount: ""
};

const SendToken = () => {
    const dispatch = useDispatch();
    const { SendStableCoins } = useWeb3();
    const [formField, setFormField] = useState(defaultFormField);
    const { branch, amount } = formField;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormField({ ...formField, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted:', { branch, amount });
        await SendStableCoins(branch, amount);
        dispatch(setChange(true));
        window.alert('Transferred Stablecoins');
    };

    return (
        <Card>
            <h2>Send StableCoins</h2>
            <form onSubmit={handleSubmit}>
                <label style={{ width: '150px' }}>
                    Branch Ethereum Address:
                    <input
                        type="text"
                        name="branch"
                        value={branch}
                        onChange={handleChange}
                        required
                        style={{ width: '300px' }}
                    />
                </label>
                <br /> <br />
                <label style={{ width: '150px' }}>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={handleChange}
                        required
                        style={{ width: '300px' }}
                    />
                </label>
                <br /> <br />
                <CustomButton>Send Stablecoins</CustomButton>
            </form>
        </Card>
    );
};

export default SendToken;

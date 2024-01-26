import React, { useState } from 'react';
import CustomButton from '../Custom-Button/Custom-button.component';
import Card from '../Card/Card.component';
import { useWeb3 } from "../Web3Functions";
import { useDispatch } from "react-redux";
import { setChange } from "../../changeSlice";

const RemoveUser = () => {
    const { RemoveCustomer } = useWeb3();
    const [accountNumber, setAccountNumber] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setAccountNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Account Number to Remove:', accountNumber);
        const status = await RemoveCustomer(accountNumber);
        if (status) {
            dispatch(setChange(true));
            window.alert('Removed user');
        }
    };

    return (
        <Card>
            <h2>Remove User</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Account Number:
                    <input
                        type="text"
                        name="accountNumber"
                        value={accountNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <CustomButton type="submit">Remove User</CustomButton>
            </form>
        </Card>
    );
};

export default RemoveUser;

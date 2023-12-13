import React, { useState } from 'react';
import { useWeb3 } from "../Web3Functions";
import CustomButton from '../Custom-Button/Custom-button.component';
import Card from '../Card/Card.component';
import { useDispatch } from "react-redux";
import { setChange } from "../../changeSlice";

import './CreateUser.styles.css';

const defaultFormField = {
    customerName: "",
    balance: "",
};

const CreateUser = () => {
    // const [customerName, setCustomerName] = useState('');
    // const [balance, setBalance] = useState('');
    const dispatch = useDispatch();
    const { CreateCustomer } = useWeb3();
    const [formField, setFormField] = useState(defaultFormField);
    const { customerName, balance } = formField;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormField({ ...formField, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted:', { customerName, balance });
        await CreateCustomer(customerName, balance);
        dispatch(setChange(true));
        window.alert('Created User');
    };

    return (
        <Card>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <label style={{ width: '150px' }}>
                    Customer Name:
                    <input
                        type="text"
                        name="customerName"
                        value={customerName}
                        onChange={handleChange}
                        required
                        style={{ width: '300px' }}
                    />
                </label>
                <br /> <br />
                <label style={{ width: '150px' }}>
                    Balance:
                    <input
                        type="number"
                        name="balance"
                        value={balance}
                        onChange={handleChange}
                        required
                        style={{ width: '300px' }}
                    />
                </label>
                <br /> <br />
                <CustomButton>Create User</CustomButton>
            </form>
        </Card>
    );
};

export default CreateUser;

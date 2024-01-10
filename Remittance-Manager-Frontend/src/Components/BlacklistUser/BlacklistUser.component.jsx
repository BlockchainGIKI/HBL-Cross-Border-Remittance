import React, { useState } from 'react';
import { useWeb3 } from "../Web3Functions";
import CustomButton from '../Custom-Button/Custom-button.component';
import Card from '../Card/Card.component';
// import { useDispatch } from "react-redux";
// import { setChange } from "../../changeSlice";
import './BlacklistUser.styles.css';
import { SHA3 } from "sha3";

const defaultFormField = {
    cnic: ""
};

const BlacklistUser = () => {
    // const dispatch = useDispatch();
    const { BlacklistCustomer } = useWeb3();
    const [formField, setFormField] = useState(defaultFormField);
    const { cnic } = formField;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormField({ ...formField, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hash = new SHA3(512);
        hash.update(cnic);
        const cnic_hash = hash.digest('hex');
        console.log('Submitted:', cnic_hash);
        await BlacklistCustomer('0x' + cnic_hash);
        // dispatch(setChange(true));
        window.alert('Blacklisted User');
    };

    return (
        <Card>
            <h2>Blacklist User</h2>
            <form onSubmit={handleSubmit}>
                <label style={{ width: '150px' }}>
                    CNIC:
                    <input
                        type="number"
                        name="cnic"
                        value={cnic}
                        onChange={handleChange}
                        required
                        style={{ width: '300px' }}
                    />
                </label>
                <br /> <br />
                <CustomButton>Blacklist User</CustomButton>
            </form>
        </Card>
    );
};

export default BlacklistUser;

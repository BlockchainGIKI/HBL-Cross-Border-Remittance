import React, { useEffect, useState } from 'react';
import './ManagerDetail.styles.css';
import { useWeb3 } from "../Web3Functions";
import { useSelector, useDispatch } from 'react-redux'
import { selectAccount } from '../../accountSlice';
import { selectKey } from "../../keySlice";
import { selectChange } from "../../changeSlice";
import { setChange } from "../../changeSlice";


const ManagerDetail = () => {
    const { GetManager, GetBalance } = useWeb3();
    const [address, setAddress] = useState(null);
    const [location, setLocation] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [name, setName] = useState(null);
    const [code, setCode] = useState(null);
    const [balance, setBalance] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const account = useSelector(selectAccount);
    const key = useSelector(selectKey);
    const change = useSelector(selectChange);
    const dispatch = useDispatch();


    useEffect(() => {
        async function fetchData() {
            // You can await here
            const manager = await GetManager();
            console.log(manager);
            setAddress(manager.account);
            setLocation(manager.location);
            setCustomers(String(manager.number_of_customers));
            setName(manager.name);
            setCode(String(manager.branch_code));
            let temp = await GetBalance();
            setBalance(String(temp));
            setIsDataFetched(true);
            console.log('Change: ', change);
            dispatch(setChange(false));
            // ...
        }
        fetchData();
        console.log('Account: ', account, key);
        console.log('Customers: ', customers);
    }, [isDataFetched, change]);

    return (
        <div className="manager-detail-card">
            <div className="main-heading">
                <h4>Manager Detail</h4>
            </div>
            <div className="sub-cards-container">
                <div className="sub-card">
                    <h5>Manager Name</h5>
                    <h6>{name}</h6>
                    <p className="green"></p>
                </div>
                <div className="sub-card">
                    <h5>Branch Code</h5>
                    <h6>{code}</h6>
                    <p className="green"></p>
                </div>
                <div className="sub-card">
                    <h5>Location</h5>
                    <h6>{location}</h6>
                    <p className="green"></p>
                </div>
                <div className="sub-card">
                    <h5>Number of Customers</h5>
                    {isDataFetched && (<h6>{customers}</h6>)}
                    <p className="green"></p>
                </div>
                <div className="sub-card">
                    <h5>Ethereum Address</h5>
                    <h6>{address}</h6>
                    <p className="green"></p>
                </div>
                <div className="sub-card">
                    <h5>Stablecoin Balance</h5>
                    <h6>{balance}</h6>
                    <p className="green"></p>
                </div>
            </div>
        </div>
    );
}

export default ManagerDetail;

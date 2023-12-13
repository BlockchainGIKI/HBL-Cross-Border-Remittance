import React, { useEffect, useState } from 'react';
import './ManagerDetail.styles.css';
import { useWeb3 } from "../Web3Functions";
import { useSelector } from 'react-redux'
import { selectAccount } from '../../accountSlice';
import { selectKey } from "../../keySlice";


const ManagerDetail = () => {
    const { GetManager } = useWeb3();
    const [address, setAddress] = useState(null);
    const [location, setLocation] = useState(null);
    const [customers, setCustomers] = useState(69);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const account = useSelector(selectAccount);
    const key = useSelector(selectKey);


    useEffect(() => {
        async function fetchData() {
            // You can await here
            const manager = await GetManager();
            console.log(manager);
            setAddress(manager.account);
            setLocation(manager.location);
            setCustomers(String(manager.number_of_customers));
            setIsDataFetched(true);
            // ...
        }
        fetchData();
        console.log('Account: ', account, key);
        console.log('Customers: ', customers);
    }, [isDataFetched]);

    return (
        <div className="manager-detail-card">
            <div className="main-heading">
                <h4>Manager Detail</h4>
            </div>
            <div className="sub-cards-container">
                <div className="sub-card">
                    <h5>Address</h5>
                    <h6>{address}</h6>
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
            </div>
        </div>
    );
}

export default ManagerDetail;

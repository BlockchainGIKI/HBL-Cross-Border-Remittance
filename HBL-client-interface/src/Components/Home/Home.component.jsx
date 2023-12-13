import React from "react";
import { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
    NavigationContainer,
    NavLinks,
    NavLink,
    LogoContainer,
} from "./Home.styles";
import DynamicTable from "../DynamicTable/DynamicTable.component";
import MultipleButtons from "../MultipleButtons/MultipleButtons.component";
// import { User } from "../../types"

import { useEffect, useState } from "react";
import { useWeb3 } from '../../hooks/useWeb3'


const Home = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const Id = params.get('Id');
    console.log("Home", Id)

    const { GetCustomer, GetRemitTransaction, GetReceiveTransaction, web3 } = useWeb3()
    const [cust, setCust] = useState(null);
    const [remit_tx, setRemitTx] = useState(null);
    const [receive_tx, setReceiveTx] = useState(null);
    const [price, setPrice] = useState(null);

    useEffect(() => {
        ; (async () => {
            // await SetAsAdmin()
            // await CreateCustomer("John Doe", 1000)
            // console.log("At Dynamic Table", Account)
            const customer = await GetCustomer(2);
            // const customer = null
            // const transaction = null
            // const transaction = await GetRemitTransaction(2);
            // const tx = await GetReceiveTransaction(2)
            // const _price = await web3.eth.getGasPrice()
            // console.log("Price", _price)
            // web3.eth.net.isListening()
            //     .then(() => console.log('is connected'))
            //     .catch(e => console.log('Wow. Something went wrong: ' + e));
            setCust(customer);
            // setRemitTx(transaction);
            // setReceiveTx(tx);
            // setPrice(_price)
        })()
    }, [])

    return (
        <div>
            <Fragment>
                <NavigationContainer>
                    <LogoContainer>
                        <h3>HBL Internet Banking</h3>
                    </LogoContainer>
                    <NavLinks>
                        <NavLink to="/">
                            SIGN OUT
                        </NavLink>
                    </NavLinks>
                </NavigationContainer>
                <DynamicTable tableValue="AccountDetailTable" forPrint="User detail" Account={Id}></DynamicTable>
                <MultipleButtons></MultipleButtons><br /> <br />
                <Outlet />
            </Fragment>
        </div>
    )
}

export default Home;

import React from "react";
import { useEffect, useState } from "react";
import TransactionHistory from "../TransactionHistory/TransactionHistoryData";
import { col, col_remit } from "../TransactionHistory/TransactionHistoryColumn";
import FavortiePeople from "../Favorite/FavoriteData";
import AccountDetailTable from "../AccountDetail/AccountDetailTable";
import { useWeb3 } from '../../hooks/useWeb3'
import { Table, Card } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { selectChange } from "../../changeSlice";
import { setChange } from "../../changeSlice";
import LoadingSpinner from "./Spinner";

import './DynamicTable.styles.css';

const DynamicTable = ({ tableValue, forPrint, Account }) => {
    // get table column
    const { GetCustomer, GetRemitTransaction, GetReceiveTransaction, web3 } = useWeb3();
    const account = useSelector((state) => state.account.value);
    const change = useSelector(selectChange);
    const dispatch = useDispatch();
    var column;
    var actualValue = {};
    var actual = {};
    var tableData = [];

    const [cust, setCust] = useState(null);
    const [remit_tx, setRemitTx] = useState(null);
    const [receive_tx, setReceiveTx] = useState(null);
    const [price, setPrice] = useState(null);

    useEffect(() => {
        ; (async () => {
            // await SetAsAdmin()
            // await CreateCustomer("John Doe", 1000)
            console.log("At Dynamic Table", account)
            const customer = await GetCustomer(account);
            // const customer = null
            // const transaction = null
            const transaction = await GetRemitTransaction(account);
            const tx = await GetReceiveTransaction(account);
            console.log('Receive: ', tx);
            const _price = await web3.eth.getGasPrice();
            console.log("Price", _price);
            // web3.eth.net.isListening()
            //     .then(() => console.log('is connected'))
            //     .catch(e => console.log('Wow. Something went wrong: ' + e));
            setCust(customer);
            setRemitTx(transaction);
            setReceiveTx(tx);
            setPrice(_price);
            dispatch(setChange(false));
        })()
    }, [change])


    if (tableValue === "TransactionHistory") {
        // Get table headers in array
        // column = Object.keys(TransactionHistory[0]);
        column = TransactionHistory;
        // Object.assign(actualValue, TransactionHistory);
        if (remit_tx) {
            actualValue = {}
            var dataSource = [];
            // console.log("Pop", Number(remit_tx[0].fee) * price)
            for (let i = 0; i < cust.number_of_rem_transactions; i++) {
                var temp = new Date(Number(remit_tx[i].datetime) * 1000)
                actualValue[i] = {
                    sr_no: i + 1,
                    remitter_name: remit_tx[i].remitter_name,
                    beneficiary_name: remit_tx[i].beneficiary_name,
                    remitter_account_number: remit_tx[i].remitter_account_number,
                    beneficiary_account_number: remit_tx[i].beneficiary_account_number,
                    amount: remit_tx[i].amount,
                    tx_hash: remit_tx[i].tx_hash,
                    datetime: temp.toLocaleString("en-PK"),
                    fee: ((Number(remit_tx[i].fee) * price) / 10e18),
                };
                dataSource[i] = {
                    key: i + 1,
                    no: i + 1,
                    name: remit_tx[i].beneficiary_name,
                    account: remit_tx[i].beneficiary_account_number,
                    amount: remit_tx[i].amount,
                    // fee: ((Number(remit_tx[i].fee) * price) / 10e18),
                    fee: remit_tx[i].fee / 1e9,
                    date: temp.toLocaleString("en-PK"),
                    hash: remit_tx[i].tx_hash
                }
            }
            console.log('at:', actualValue, "Here", cust.number_of_rem_transactions);
            return (
                <div className="card-background">
                    <Table dataSource={dataSource} columns={col} />
                </div>
            )
        }
        else {
            console.log("remit_tx is null")
        }
    }

    // else if (tableValue === "FavortiePeople") {
    //     column = Object.keys(FavortiePeople[0]);
    //     Object.assign(actualValue, FavortiePeople);
    // }

    else if (tableValue === "FavortiePeople") {
        column = FavortiePeople;
        if (receive_tx) {
            actualValue = {}
            var dataSource = [];
            // console.log("Pop", Number(remit_tx[0].fee) * price)
            for (let i = 0; i < cust.number_of_ben_transactions; i++) {
                var tempo = new Date(Number(receive_tx[i].datetime) * 1000)
                actualValue[i] = {
                    sr_no: i + 1,
                    remitter_name: receive_tx[i].remitter_name,
                    beneficiary_name: receive_tx[i].beneficiary_name,
                    remitter_account_number: receive_tx[i].remitter_account_number,
                    beneficiary_account_number: receive_tx[i].beneficiary_account_number,
                    amount: receive_tx[i].amount,
                    tx_hash: receive_tx[i].tx_hash,
                    datetime: tempo.toLocaleString("en-PK"),
                    fee: ((Number(receive_tx[i].fee) * price) / 1e9),
                };
                dataSource[i] = {
                    key: i + 1,
                    no: i + 1,
                    name: receive_tx[i].remitter_name,
                    account: receive_tx[i].remitter_account_number,
                    amount: receive_tx[i].amount,
                    // fee: ((Number(receive_tx[i].fee) * price) / 10e18),
                    fee: receive_tx[i].fee / 1e9,
                    date: tempo.toLocaleString("en-PK"),
                    hash: receive_tx[i].tx_hash
                }
            }
            console.log('at:', actualValue, "Here", cust.number_of_ben_transactions)
            return (
                <div className="card-background">
                    <Table dataSource={dataSource} columns={col_remit} />
                </div>
            )
        }
        else {
            console.log("receive_tx is null")
        }
    }

    else if (tableValue === "AccountDetailTable") {
        // column = Object.keys(AccountDetailTable);
        // column = AccountDetailTable.map((item) => item.key);
        column = AccountDetailTable;
        // console.log("Column", column)

        // Object.assign(actualValue, User);
        console.log('User', cust)
        if (cust) {
            actual = [{
                name: cust.name,
                account_number: cust.account_number,
                balance: cust.balance,
                number_of_rem_transactions: cust.number_of_rem_transactions,
                number_of_ben_transactions: cust.number_of_ben_transactions,
            }];
            var total_tx = Number(cust.number_of_ben_transactions) + Number(cust.number_of_rem_transactions)
            console.log("Actual", actual[0]);
            // console.log('actualValue:', actualValue)
            return (
                <div>
                    <Card title="User Details" className="card-background">
                        <Card.Grid><h4>Name: <span className="green">{actual[0].name}</span></h4></Card.Grid>
                        <Card.Grid ><h4>Balance: <span className="green">{actual[0].balance}</span></h4></Card.Grid>
                        <Card.Grid ><h4>Account Number: <span className="green">{actual[0].account_number}</span></h4></Card.Grid>
                        <Card.Grid ><h4>Sent Transactions: <span className="green">{actual[0].number_of_rem_transactions}</span></h4></Card.Grid>
                        <Card.Grid ><h4>Received Transactions: <span className="green">{actual[0].number_of_ben_transactions}</span></h4></Card.Grid>
                        <Card.Grid ><h4>Total Transactions: <span className="green">{total_tx}</span></h4></Card.Grid>
                    </Card>
                </div>
            )
        }
        else {
            console.log("Cust is null")
        }

    }
    tableData = Object.values(actualValue);
    // get table heading data
    // const ThData = () => {
    //     return column.map((data) => {
    //         return <th key={data.key}>{data}</th>
    //     })
    // }
    const ThData = () => {
        return column.map((item) => {
            return <th key={item.key}>{item.heading}</th>;
        });
    };

    // get table row data
    // const tdData = () => {
    //     return tableData.map((data) => {
    //         return (
    //             <tr>
    //                 {
    //                     AccountDetailTable.map((v) => {
    //                         return <td>{data[v]}</td>
    //                     })
    //                 }
    //             </tr>
    //         )
    //     })
    // }

    const tdData = () => {
        return tableData.map((data) => {
            return (
                <tr>
                    {column.map((v) => (
                        <td key={v.key}>{data[v.key]}</td>
                    ))}
                </tr>
            )
        })
    }

    return (
        <div>
            {<LoadingSpinner />}
        </div>
    )
}
export default DynamicTable;

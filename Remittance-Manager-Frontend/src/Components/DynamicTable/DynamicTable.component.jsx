import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import { useWeb3 } from "../Web3Functions";
import ActiveUsers from "../ActiveUsers/ActiveUsers";
import DeletedUsers from "../DeletedUsers/DeletedUsers";
import OneTrxHistory from '../OneTrxHistory/OneTrxHistory';
import { TrxHistory, RemitTrxHistory, ReceiveTrxHistory } from "../ViewTrxHistory/TrxHistory";
import LoadingSpinner from "./Spinner";

const DynamicTable = ({ tableValue, forPrint, transactionHistory, selectedOption, transaction }) => {
    // get table column
    const { ViewActiveCustomers, ViewRemitHistory, ViewReceiveHistory } = useWeb3();
    const [active, setActive] = useState(null);
    const [deleted, setDeleted] = useState(null);
    var column;
    var actualValue = {};
    var tableData = [];
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const customers = await ViewActiveCustomers();
            const activeCustomers = customers.filter((item) => item.status === true).map((item, index) => ({ ...item, no: index + 1 }));
            const activeString = activeCustomers.map((item) => ({
                ...item,
                account_number: String(item.account_number),
                balance: String(item.balance),
                blacklisted: item.blacklisted === true ? "Yes" : "No",
                number_of_rem_transactions: String(item.number_of_rem_transactions),
                number_of_ben_transactions: String(item.number_of_ben_transactions)
            }));
            const deletedCustomers = customers.filter((item) => item.status === false).map((item, index) => ({ ...item, no: index + 1 }));
            const deletedString = deletedCustomers.map((item) => ({
                ...item,
                account_number: String(item.account_number),
                balance: String(item.balance),
                blacklisted: item.blacklisted === true ? "Yes" : "No",
                number_of_rem_transactions: String(item.number_of_rem_transactions),
                number_of_ben_transactions: String(item.number_of_ben_transactions)
            }));
            setActive(activeString);
            setDeleted(deletedString);
            console.log('Active: ', activeString);
            console.log('Deleted: ', deletedCustomers);
            // ...
        }
        fetchData();
        // console.log('Account: ', account, key);
        // console.log('Customers: ', customers);
    }, []);


    if (tableValue === "ActiveUsers") {
        // Get table headers in array
        if (active) {
            column = ActiveUsers;
            console.log('Inside active');
            return (
                <div>
                    <Table dataSource={active} columns={column} />
                </div>
            )
        }
        else {
            console.log('Error fetching active customers');
            column = Object.keys(ActiveUsers[0]);
            Object.assign(actualValue, ActiveUsers);

        }
    }
    else if (tableValue === "DeletedUsers") {
        if (deleted) {
            column = ActiveUsers;
            console.log('Inside deleted');
            return (
                <div>
                    <Table dataSource={deleted} columns={column} />
                </div>
            )
        }
        else {
            console.log('Error fetching active customers');
            column = Object.keys(ActiveUsers[0]);
            Object.assign(actualValue, ActiveUsers);

        }
    }
    else if (tableValue === "OneTrxHistory") {
        if (transaction) {
            column = OneTrxHistory;
            console.log('Inside one transaction history');
            console.log('Transaction: ', transaction);
            return (
                <div>
                    <Table dataSource={transaction} columns={column} />
                </div>
            )
        }
        else {
            column = Object.keys(OneTrxHistory[0]);
            Object.assign(actualValue, OneTrxHistory);
        }

    }
    else if (tableValue === "TrxHistory") {
        if (transactionHistory) {
            console.log('Tx History: ', transactionHistory);
            return (
                <div>
                    <Table dataSource={transactionHistory} columns={selectedOption === 'Remittance' ? RemitTrxHistory : ReceiveTrxHistory} />
                </div>
            )
        }
        else {
            column = Object.keys(TrxHistory[0]);
            Object.assign(actualValue, TrxHistory);
        }
    }
    // tableData = Object.values(actualValue);
    // // console.log("Table data", tableData);
    // // get table heading data
    // const ThData = () => {
    //     return column.map((data) => {
    //         return <th key={data}>{data}</th>
    //     })
    // }

    // // get table row data
    // const tdData = () => {

    //     if (tableData.length === 0) {
    //         return (
    //             <tr>
    //                 <td colSpan={column.length}>No data available</td>
    //             </tr>
    //         );
    //     }

    //     return tableData.map((data, index) => {
    //         return (
    //             <tr key={index}>
    //                 {column.map((v) => {
    //                     return <td key={v}>{data[v]}</td>;
    //                 })}
    //             </tr>
    //         )
    //     })
    // }

    // return (
    //     <div>
    //         <h4> {forPrint} </h4>
    //         <table className="table">
    //             <thead>
    //                 <tr>{ThData()}</tr>
    //             </thead>
    //             <tbody>
    //                 {tdData()}
    //             </tbody>
    //         </table>
    //     </div>
    // )
    return (
        <div>
            {<LoadingSpinner />}
        </div>
    )

}

export default DynamicTable;

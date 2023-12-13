import React, { useState } from 'react';
import { useWeb3 } from "../Web3Functions";
import DynamicTable from '../DynamicTable/DynamicTable.component';
import CustomButton from '../Custom-Button/Custom-button.component';
import Card from '../Card/Card.component';

const ViewTransactionHistory = () => {
    const { ViewRemitHistory, ViewReceiveHistory } = useWeb3();
    const [showTable, setShowTable] = useState(false);
    const [accountNumber, setAccountNumber] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [transactionHistory, setTransactionHistory] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === 'accountNumber') {
            setAccountNumber(e.target.value);
        } else if (e.target.name === 'transactionType') {
            setSelectedOption(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowTable(true);
        console.log('Account Number:', accountNumber);
        console.log('Transaction Type:', selectedOption);
        let tx = [];
        if (selectedOption === 'Remittance') {
            tx = await ViewRemitHistory(accountNumber);
        }
        else if (selectedOption === 'Beneficiary') {
            tx = await ViewReceiveHistory(accountNumber);
        }
        const temp = tx.map((item, index) => ({
            ...item,
            no: index + 1,
            amount: String(item.amount),
            beneficiary_account_number: String(item.beneficiary_account_number),
            remitter_account_number: String(item.remitter_account_number),
            fee: String(Number(item.fee) / 1e9),
            datetime: (new Date(Number(item.datetime) * 1000)).toLocaleString("en-PK")
        }));
        // 
        setTransactionHistory(temp);
    };

    return (
        <Card>
            <h2>Transaction History</h2>
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
                <br /> <br />
                <label>
                    Transaction Type:
                    <select
                        name="transactionType"
                        value={selectedOption}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select...</option>
                        <option value="Remittance">Remittance</option>
                        <option value="Beneficiary">Beneficiary</option>
                    </select>
                </label>
                <br />
                <CustomButton>Submit</CustomButton>
            </form> <br /><br />
            {showTable && <DynamicTable tableValue="TrxHistory" forPrint="View Transaction" transactionHistory={transactionHistory} selectedOption={selectedOption}></DynamicTable>}
        </Card>
    );
};

export default ViewTransactionHistory;

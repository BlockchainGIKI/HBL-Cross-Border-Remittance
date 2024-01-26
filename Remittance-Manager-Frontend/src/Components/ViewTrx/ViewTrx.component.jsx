import React, { useState } from 'react';
import CustomButton from '../Custom-Button/Custom-button.component';
import DynamicTable from '../DynamicTable/DynamicTable.component';
import Card from '../Card/Card.component';
import { useWeb3 } from "../Web3Functions";

const ViewTrx = () => {
    const { ViewTransaction } = useWeb3();
    const [accNum, setAccNum] = useState('');
    const [trxHash, setTrxHash] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [tx, setTx] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const transaction = await ViewTransaction(accNum, trxHash);
        console.log('Account Number:', accNum, "Tx Hash: ", trxHash)
        if (transaction) {
            let temp = [];
            temp[0] = transaction;
            if (temp[0].beneficiary_name === '') {
                window.alert('Please submit a valid transaction hash');
            }
            else {
                temp = temp.map((item) => ({
                    ...item,
                    amount: String(item.amount),
                    beneficiary_account_number: String(item.beneficiary_account_number),
                    remitter_account_number: String(item.remitter_account_number),
                    fee: String(Number(item.fee) / 1e9),
                    datetime: (new Date(Number(item.datetime) * 1000)).toLocaleString("en-PK")
                }));
                setTx(temp);
                setShowTable(true);
            }
        }
    };

    return (
        <Card>
            <h2>View Transaction</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Customer Account Number:
                    <input
                        type="text"
                        value={accNum}
                        onChange={(e) => setAccNum(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Trx Hash:
                    <input
                        type="text"
                        value={trxHash}
                        onChange={(e) => setTrxHash(e.target.value)}
                        required
                    />
                </label>
                <br />
                <CustomButton>Submit</CustomButton>
            </form> <br /><br />
            {showTable && <DynamicTable tableValue="OneTrxHistory" forPrint="View Transaction" transaction={tx}></DynamicTable>}
        </Card>
    );
};

export default ViewTrx;

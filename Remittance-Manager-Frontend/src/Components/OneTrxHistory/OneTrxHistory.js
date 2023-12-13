// const OneTrxHistory = [
//     {Sender: "", Reciever: "", Amount: "", Date: "", "Transaction Fee": "", "Transaction Hash": ""}
// ]

const OneTrxHistory = [
    {
        title: 'Remitter (name)',
        dataIndex: 'remitter_name',
        key: 'remitter_name',
    },
    {
        title: 'Remitter (Account Number)',
        dataIndex: 'remitter_account_number',
        key: 'remitter_account_number',
    },
    {
        title: 'Beneficiary (name)',
        dataIndex: 'beneficiary_name',
        key: 'beneficiary_name',
    },
    {
        title: 'Beneficiary (Account Number)',
        dataIndex: 'beneficiary_account_number',
        key: 'beneficiary_account_number',
    },
    {
        title: 'Amount (Fiat)',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: 'Transaction Fee (Ether)',
        dataIndex: 'fee',
        key: 'fee'
    },
    {
        title: 'Date and Time',
        dataIndex: 'datetime',
        key: 'datetime'
    },
    {
        title: 'Transaction Hash',
        dataIndex: 'tx_hash',
        key: 'tx_hash'
    }
];


export default OneTrxHistory;

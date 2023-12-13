export const TrxHistory = [
    { Sno: 1, "Sender/Reciever": 12387873402, Amount: 1231, Date: "25-Aug-2023", "Transaction fee": 0.21234, "Transaction Hash": "0gsf23w234" },
    { Sno: 2, "Sender/Reciever": 12387873402, Amount: 234, Date: "25-Aug-2023", "Transaction fee": 0.234, "Transaction Hash": "0dsf2342234" },
    { Sno: 3, "Sender/Reciever": 12387873402, Amount: 3432, Date: "25-Aug-2023", "Transaction fee": 0.5432, "Transaction Hash": "0hsf234534" },
    { Sno: 4, "Sender/Reciever": 12387873402, Amount: 342, Date: "25-Aug-2023", "Transaction fee": 0.643, "Transaction Hash": "0dsf22344" },
    { Sno: 5, "Sender/Reciever": 12387873402, Amount: 344, Date: "25-Aug-2023", "Transaction fee": 0.1212, "Transaction Hash": "0dsf237567" }
]

export const RemitTrxHistory = [
    {
        title: 'Sr No.',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'To (name)',
        dataIndex: 'beneficiary_name',
        key: 'beneficiary_name',
    },
    {
        title: 'To (Account Number)',
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

export const ReceiveTrxHistory = [
    {
        title: 'Sr No.',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'From (name)',
        dataIndex: 'remitter_name',
        key: 'remitter_name',
    },
    {
        title: 'From (Account Number)',
        dataIndex: 'remitter_account_number',
        key: 'remitter_account_number',
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
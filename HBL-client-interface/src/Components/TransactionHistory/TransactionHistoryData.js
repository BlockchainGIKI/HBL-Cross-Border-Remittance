// const TransactionHistory = [
//     {Sno: 1, "Account Number (from)": 12387873402, "Account Number (to)": 27347347899, Category: "Send", Date: "25-Aug-2023"},
//     {Sno: 2, "Account Number (from)": 34293473444, "Account Number (to)": 38748723344, Category: "Send", Date: "5-Aug-2023"},
//     {Sno: 3, "Account Number (from)": 13487837211, "Account Number (to)": 34293473444, Category: "Recieved", Date: "25-Jun-2023"},
//     {Sno: 4, "Account Number (from)": 64736761831, "Account Number (to)": 87348972897, Category: "Send", Date: "2-Jun-2023"},
//     {Sno: 5, "Account Number (from)": 78381934782, "Account Number (to)": 21573487543, Category: "Recieved", Date: "21-May-2023"}
// ]

// const TransactionHistory = [
//     { key: 'remitter_name', heading: 'Remitter Name' },
//     { key: 'beneficiary_name', heading: 'Beneficiary Name' },
//     { key: 'remitter_account_number', heading: 'Account Number (Remitter)' },
//     { key: 'beneficiary_account_number', heading: 'Account Number (Beneficiary)' },
//     { key: 'amount', heading: 'Amount' },
//     { key: 'tx_hash', heading: 'Transaction Hash' },
//     { key: 'datetime', heading: 'Date and Time' },
//     { key: 'fee', heading: 'Gas Fee' },
// ];

const TransactionHistory = [
    { key: 'sr_no', heading: 'Sr No.' },
    { key: 'beneficiary_name', heading: 'To (Name)' },
    { key: 'beneficiary_account_number', heading: 'To (Account Number)' },
    { key: 'amount', heading: 'Amount (Fiat)' },
    { key: 'fee', heading: 'Gas Fee (Ether)' },
    { key: 'datetime', heading: 'Date and Time' },
    { key: 'tx_hash', heading: 'Transaction Hash' },

];


export default TransactionHistory;

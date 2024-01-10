// const ActiveUsers = [
//     {Sno: 1, "Account Number": 12387873402, Name: "Send", Balance: "25-Aug-2023", "Number of Transactions": 12},
//     {Sno: 2, "Account Number": 34293473444, Name: "Send", Balance: "5-Aug-2023", "Number of Transactions": 10},
//     {Sno: 3, "Account Number": 13487837211, Name: "Recieved", Balance: "25-Jun-2023", "Number of Transactions": 15},
//     {Sno: 4, "Account Number": 64736761831, Name: "Send", Balance: "2-Jun-2023", "Number of Transactions": 8},
//     {Sno: 5, "Account Number": 78381934782, Name: "Recieved", Balance: "21-May-2023", "Number of Transactions": 20}
// ]

const ActiveUsers = [{
    title: 'Sr No.',
    dataIndex: 'no',
    key: 'no',
},
{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
},
{
    title: 'Account Number',
    dataIndex: 'account_number',
    key: 'account_number',
},
{
    title: 'Blacklisted',
    dataIndex: 'blacklisted',
    key: 'blacklisted',
},
{
    title: 'Balance (Fiat)',
    dataIndex: 'balance',
    key: 'balance'
},
{
    title: 'Sent Transactions',
    dataIndex: 'number_of_rem_transactions',
    key: 'number_of_rem_transactions'
},
{
    title: 'Received Transactions',
    dataIndex: 'number_of_ben_transactions',
    key: 'number_of_ben_transactions'
},
];

export default ActiveUsers;

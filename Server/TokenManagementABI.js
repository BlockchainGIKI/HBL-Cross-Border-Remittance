const tokenManagementABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_tokenAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "TokenManagement__AccountNumerOutOfBounds",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TokenManagement__ConversionFailed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TokenManagement__InactiveAccountNumbers",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TokenManagement__NameIsNull",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TokenManagement__NeedsMoreThanZero",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            }
        ],
        "name": "CustomerCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "_rem",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "_ben",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TransactionIssued",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "SUPER_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "accountToAccNumToIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "_CNIC_hash",
                "type": "bytes"
            }
        ],
        "name": "blacklistBranchCustomer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_balance",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_CNIC_hash",
                "type": "bytes"
            }
        ],
        "name": "createCustomer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_branch_code",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_location",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "createManager",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBranchCustomers",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "CNIC_hash",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "number_of_rem_transactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "number_of_ben_transactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "blacklisted",
                        "type": "bool"
                    }
                ],
                "internalType": "struct TokenManagement.User[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_acc_num",
                "type": "uint256"
            }
        ],
        "name": "getBranchRecTxHistory",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "remitter_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "beneficiary_name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "remitter_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "beneficiary_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "tx_hash",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "datetime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TokenManagement.Transaction[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_acc_num",
                "type": "uint256"
            }
        ],
        "name": "getBranchRemTxHistory",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "remitter_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "beneficiary_name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "remitter_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "beneficiary_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "tx_hash",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "datetime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TokenManagement.Transaction[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_acc_num",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_tx_hash",
                "type": "bytes"
            }
        ],
        "name": "getBranchTx",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "remitter_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "beneficiary_name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "remitter_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "beneficiary_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "tx_hash",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "datetime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TokenManagement.Transaction",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_acc_number",
                "type": "uint256"
            }
        ],
        "name": "getCustomer",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "CNIC_hash",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "number_of_rem_transactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "number_of_ben_transactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "blacklisted",
                        "type": "bool"
                    }
                ],
                "internalType": "struct TokenManagement.User",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDeletedAccountNumbers",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "getManager",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "branch_code",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "location",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "number_of_customers",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "internalType": "struct TokenManagement.Manager",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_acc_num",
                "type": "uint256"
            }
        ],
        "name": "getReceiveTransactionHistory",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "remitter_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "beneficiary_name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "remitter_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "beneficiary_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "tx_hash",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "datetime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TokenManagement.Transaction[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_acc_num",
                "type": "uint256"
            }
        ],
        "name": "getRemitTransactionHistory",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "remitter_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "beneficiary_name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "remitter_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "beneficiary_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "tx_hash",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "datetime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TokenManagement.Transaction[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleAdmin",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_acc_num",
                "type": "uint256"
            }
        ],
        "name": "getSingleCustomer",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "CNIC_hash",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "number_of_rem_transactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "number_of_ben_transactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "blacklisted",
                        "type": "bool"
                    }
                ],
                "internalType": "struct TokenManagement.User",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_acc_num",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isRem",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "_t_num",
                "type": "uint256"
            }
        ],
        "name": "getTransaction",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "remitter_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "beneficiary_name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "remitter_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "beneficiary_account_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "tx_hash",
                        "type": "bytes"
                    },
                    {
                        "internalType": "uint256",
                        "name": "datetime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TokenManagement.Transaction",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "hasRole",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_rem",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_ben",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "issueTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_acc_num",
                "type": "uint256"
            }
        ],
        "name": "removeBranchCustomer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_account_number",
                "type": "uint256"
            }
        ],
        "name": "removeCustomer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_node",
                "type": "address"
            }
        ],
        "name": "removeNodeAsAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "_tx_hash",
                "type": "bytes"
            },
            {
                "internalType": "uint256",
                "name": "_datetime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_fee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_rem",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_ben",
                "type": "uint256"
            }
        ],
        "name": "setTransactionParameters",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

module.exports = { tokenManagementABI };
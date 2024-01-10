// SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.19;

// import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {RemittanceToken} from "./RemittanceToken.sol";
import {DSCEngine} from "./DSCEngine.sol";

contract TokenManagement is AccessControl {
    ///////////////////
    // Errors /////////
    ///////////////////
    error TokenManagement__NeedsMoreThanZero();
    error TokenManagement__ConversionFailed();
    error TokenManagement__NameIsNull();
    error TokenManagement__AccountNumerOutOfBounds();
    error TokenManagement__InactiveAccountNumbers();

    ///////////////////
    // State Variables
    ///////////////////
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant SUPER_ADMIN_ROLE = keccak256("SUPER_ADMIN_ROLE");
    address[] private admins;
    address private immutable super_admin;

    RemittanceToken private immutable rem_token;

    uint256 private active_account_numbers;
    uint256[] private deleted_customer_account_numbers;

    // uint256 private constant ETH_TO_USD_EXCHANGE_RATE = 1664;
    // uint256 private constant _DECIMALS = 8;

    struct Transaction {
        string remitter_name;
        string beneficiary_name;
        uint256 remitter_account_number;
        uint256 beneficiary_account_number;
        uint256 amount;
        bytes tx_hash;
        uint256 datetime;
        uint256 fee;
    }

    struct User {
        string name;
        uint256 account_number;
        uint256 balance;
        bytes CNIC_hash;
        uint256 number_of_rem_transactions;
        uint256 number_of_ben_transactions;
        bool status;
        bool blacklisted;
    }

    struct Manager {
        string name;
        uint256 branch_code;
        string location;
        uint256 number_of_customers;
        address account;
    }

    mapping(uint256 customerAccNumber => string customerName)
        private customerAccountNumbertoName;
    mapping(uint256 accNum => mapping(bool isRem => Transaction[] txArrar))
        private accNumtoTypetoTransactions;
    mapping(uint256 => User) private accNumToUser;
    mapping(uint256 => bool) private accNumToUserStatus;
    mapping(address => User[]) private accountToCustomers;
    mapping(address => mapping(uint256 => uint256))
        public accountToAccNumToIndex;
    mapping(address => uint256) private accountToBranchCode;
    mapping(address => Manager) private accountToManager;
    mapping(bytes => Transaction) private txHashToTx;
    mapping(uint256 => address) private customerAccNumToManagerAddress;
    mapping(address => mapping(bytes => uint256)) private accountToCNICToAccNum;

    ///////////////////
    // Events /////////
    ///////////////////
    event CustomerCreated(bool status);
    event TransactionIssued(
        string indexed _rem,
        string indexed _ben,
        uint256 amount
    );

    ///////////////////
    // Modifiers //////
    ///////////////////
    modifier moreThanZero(uint256 amount) {
        if (amount == 0) {
            revert TokenManagement__NeedsMoreThanZero();
        }
        _;
    }

    modifier nullName(string memory _name) {
        bytes memory tempEmptyStringTest = bytes(_name); // Uses memory
        if (tempEmptyStringTest.length == 0) {
            emit CustomerCreated(false);
            revert TokenManagement__NameIsNull();
        }
        _;
    }

    modifier activeCustomer(uint256 _rem, uint256 _ben) {
        if (!accNumToUserStatus[_rem] || !accNumToUserStatus[_ben]) {
            revert TokenManagement__InactiveAccountNumbers();
        }
        _;
    }

    ///////////////////
    // Functions //////
    ///////////////////
    constructor(address _tokenAddress) {
        rem_token = RemittanceToken(_tokenAddress);
        active_account_numbers = 0;
        _grantRole(SUPER_ADMIN_ROLE, msg.sender);
        _setRoleAdmin(ADMIN_ROLE, SUPER_ADMIN_ROLE);
        super_admin = msg.sender;
    }

    function setNodeAsAdmin(address _node) internal onlyRole(SUPER_ADMIN_ROLE) {
        _grantRole(ADMIN_ROLE, _node);
    }

    function removeNodeAsAdmin(
        address _node
    ) external onlyRole(SUPER_ADMIN_ROLE) {
        _revokeRole(ADMIN_ROLE, _node);
    }

    function createManager(
        string memory _name,
        uint256 _branch_code,
        string memory _location,
        address _account
    ) external onlyRole(SUPER_ADMIN_ROLE) {
        require(
            accountToBranchCode[_account] != _branch_code,
            "This manager already exists"
        );
        accountToManager[_account] = Manager(
            _name,
            _branch_code,
            _location,
            0,
            _account
        );
        accountToBranchCode[_account] = _branch_code;
        setNodeAsAdmin(_account);
    }

    function createCustomer(
        string memory _name,
        uint256 _balance,
        bytes memory _CNIC_hash
    ) external onlyRole(ADMIN_ROLE) nullName(_name) moreThanZero(_balance) {
        active_account_numbers = active_account_numbers + 1;
        accNumToUser[active_account_numbers] = User(
            _name,
            active_account_numbers,
            _balance,
            _CNIC_hash,
            0,
            0,
            true,
            false
        );
        customerAccountNumbertoName[active_account_numbers] = _name;
        accNumToUserStatus[active_account_numbers] = true;
        accountToCustomers[msg.sender].push(
            User(
                _name,
                active_account_numbers,
                _balance,
                _CNIC_hash,
                0,
                0,
                true,
                false
            )
        );
        accountToAccNumToIndex[msg.sender][active_account_numbers] =
            accountToCustomers[msg.sender].length -
            1; // accountToManager[msg.sender].number_of_customers;
        accountToManager[msg.sender].number_of_customers += 1;
        customerAccNumToManagerAddress[active_account_numbers] = msg.sender;
        accountToCNICToAccNum[msg.sender][_CNIC_hash] = active_account_numbers;
        emit CustomerCreated(true);
    }

    function removeCustomer(
        uint256 _account_number
    ) external onlyRole(ADMIN_ROLE) moreThanZero(_account_number) {
        if (_account_number > active_account_numbers) {
            revert TokenManagement__AccountNumerOutOfBounds();
        }
        deleted_customer_account_numbers.push(_account_number);
        accNumToUserStatus[_account_number] = false;
    }

    function removeBranchCustomer(
        uint256 _acc_num
    ) external onlyRole(ADMIN_ROLE) moreThanZero(_acc_num) {
        if (_acc_num > active_account_numbers) {
            revert TokenManagement__AccountNumerOutOfBounds();
        }
        uint256 index = accountToAccNumToIndex[msg.sender][_acc_num];
        require(
            accountToCustomers[msg.sender][index].account_number == _acc_num,
            "You cannot remove other branch customers"
        );
        deleted_customer_account_numbers.push(_acc_num);
        accNumToUserStatus[_acc_num] = false;
        accountToCustomers[msg.sender][index].status = false;
        accountToManager[msg.sender].number_of_customers -= 1;
    }

    function blacklistBranchCustomer(
        bytes memory _CNIC_hash
    ) external onlyRole(ADMIN_ROLE) {
        uint256 _acc_num = accountToCNICToAccNum[msg.sender][_CNIC_hash];
        uint256 index = accountToAccNumToIndex[msg.sender][_acc_num];
        require(
            accountToCustomers[msg.sender][index].account_number == _acc_num,
            "You cannot blacklist other branch customers"
        );
        accountToCustomers[msg.sender][index].blacklisted = true;
    }

    function issueTransaction(
        uint256 _rem,
        uint256 _ben,
        uint256 _amount
    )
        external
        onlyRole(ADMIN_ROLE)
        moreThanZero(_amount)
        activeCustomer(_rem, _ben)
    {
        require(
            _rem > 0 && _ben > 0,
            "The remitter and beneficiary accounts cannot be less than zero!"
        );
        require(
            accNumToUser[_rem].balance > _amount,
            "You do not have sufficient funds to initiate this transation!"
        );
        // Setting Remitter properties
        accNumToUser[_rem].balance -= _amount;
        accNumToUser[_rem].number_of_rem_transactions += 1;
        address manager = customerAccNumToManagerAddress[_rem];
        uint256 index = accountToAccNumToIndex[manager][_rem];
        accountToCustomers[manager][index].balance -= _amount;
        accountToCustomers[manager][index].number_of_rem_transactions += 1;
        accNumtoTypetoTransactions[_rem][true].push(
            Transaction(
                customerAccountNumbertoName[_rem],
                customerAccountNumbertoName[_ben],
                _rem,
                _ben,
                _amount,
                "",
                0,
                0
            )
        );

        // Setting Beneficiary properties
        accNumToUser[_ben].balance += _amount;
        accNumToUser[_ben].number_of_ben_transactions += 1;
        manager = customerAccNumToManagerAddress[_ben];
        index = accountToAccNumToIndex[manager][_ben];
        accountToCustomers[manager][index].balance += _amount;
        accountToCustomers[manager][index].number_of_ben_transactions += 1;
        accNumtoTypetoTransactions[_ben][false].push(
            Transaction(
                customerAccountNumbertoName[_rem],
                customerAccountNumbertoName[_ben],
                _rem,
                _ben,
                _amount,
                "",
                0,
                0
            )
        );

        emit TransactionIssued(
            customerAccountNumbertoName[_rem],
            customerAccountNumbertoName[_ben],
            _amount
        );

        // convertTokens(
        //     customerAccNumToManagerAddress[_rem],
        //     customerAccNumToManagerAddress[_ben],
        //     _amount
        // );
    }

    function convertTokens(
        // address _sender,
        address _recipient,
        uint256 _amount
    ) external {
        // _amount = (_amount);
        require(
            rem_token.balanceOf(msg.sender) > _amount,
            "Insufficient Balance!"
        );
        bool success = rem_token.transferFrom(msg.sender, _recipient, _amount);
        if (!success) {
            revert TokenManagement__ConversionFailed();
        }
    }

    function setTransactionParameters(
        bytes memory _tx_hash,
        uint256 _datetime,
        uint256 _fee,
        uint256 _rem,
        uint256 _ben
    ) external onlyRole(ADMIN_ROLE) activeCustomer(_rem, _ben) {
        uint256 txArrayLength = accNumtoTypetoTransactions[_rem][true].length;
        accNumtoTypetoTransactions[_rem][true][txArrayLength - 1]
            .tx_hash = _tx_hash;
        accNumtoTypetoTransactions[_rem][true][txArrayLength - 1]
            .datetime = _datetime;
        accNumtoTypetoTransactions[_rem][true][txArrayLength - 1].fee = _fee;

        txArrayLength = accNumtoTypetoTransactions[_ben][false].length;
        accNumtoTypetoTransactions[_ben][false][txArrayLength - 1]
            .tx_hash = _tx_hash;
        accNumtoTypetoTransactions[_ben][false][txArrayLength - 1]
            .datetime = _datetime;
        accNumtoTypetoTransactions[_ben][false][txArrayLength - 1].fee = _fee;

        txHashToTx[_tx_hash] = Transaction(
            accNumtoTypetoTransactions[_rem][true][txArrayLength - 1]
                .remitter_name,
            accNumtoTypetoTransactions[_rem][true][txArrayLength - 1]
                .beneficiary_name,
            accNumtoTypetoTransactions[_rem][true][txArrayLength - 1]
                .remitter_account_number,
            accNumtoTypetoTransactions[_rem][true][txArrayLength - 1]
                .beneficiary_account_number,
            accNumtoTypetoTransactions[_rem][true][txArrayLength - 1].amount,
            _tx_hash,
            _datetime,
            _fee
        );
    }

    function getRemitTransactionHistory(
        uint256 _acc_num
    ) external view onlyRole(ADMIN_ROLE) returns (Transaction[] memory) {
        return accNumtoTypetoTransactions[_acc_num][true];
    }

    function getBranchRemTxHistory(
        uint256 _acc_num
    ) external view onlyRole(ADMIN_ROLE) returns (Transaction[] memory) {
        uint256 index = accountToAccNumToIndex[msg.sender][_acc_num];
        require(
            accountToCustomers[msg.sender][index].account_number == _acc_num,
            "You cannot access transaction history of other branch customers"
        );
        return accNumtoTypetoTransactions[_acc_num][true];
    }

    function getReceiveTransactionHistory(
        uint256 _acc_num
    ) external view onlyRole(ADMIN_ROLE) returns (Transaction[] memory) {
        return accNumtoTypetoTransactions[_acc_num][false];
    }

    function getBranchRecTxHistory(
        uint256 _acc_num
    ) external view onlyRole(ADMIN_ROLE) returns (Transaction[] memory) {
        uint256 index = accountToAccNumToIndex[msg.sender][_acc_num];
        require(
            accountToCustomers[msg.sender][index].account_number == _acc_num,
            "You cannot access transaction history of other branch customers"
        );
        return accNumtoTypetoTransactions[_acc_num][false];
    }

    function getTransaction(
        uint256 _acc_num,
        bool isRem,
        uint256 _t_num
    ) external view onlyRole(ADMIN_ROLE) returns (Transaction memory) {
        return accNumtoTypetoTransactions[_acc_num][isRem][_t_num];
    }

    function getBranchTx(
        uint256 _acc_num,
        bytes memory _tx_hash
    ) external view onlyRole(ADMIN_ROLE) returns (Transaction memory) {
        uint256 index = accountToAccNumToIndex[msg.sender][_acc_num];
        require(
            accountToCustomers[msg.sender][index].account_number == _acc_num,
            "You cannot access transaction history of other branch customers"
        );
        return txHashToTx[_tx_hash];
    }

    function getCustomer(
        uint256 _acc_number
    ) external view onlyRole(ADMIN_ROLE) returns (User memory) {
        require(
            accNumToUserStatus[_acc_number],
            "This action cannot be performed on a deleted user!"
        );
        return accNumToUser[_acc_number];
    }

    function getBranchCustomers()
        external
        view
        onlyRole(ADMIN_ROLE)
        returns (User[] memory)
    {
        require(
            accountToManager[msg.sender].account == msg.sender,
            "You cannot access other branch customers"
        );
        return accountToCustomers[msg.sender];
    }

    function getSingleCustomer(
        uint256 _acc_num
    ) external view onlyRole(ADMIN_ROLE) returns (User memory) {
        require(
            accountToManager[msg.sender].account == msg.sender,
            "You cannot access other branch customers"
        );
        uint256 index = accountToAccNumToIndex[msg.sender][_acc_num];
        return accountToCustomers[msg.sender][index];
    }

    function getManager(
        address _account
    ) external view onlyRole(SUPER_ADMIN_ROLE) returns (Manager memory) {
        return accountToManager[_account];
    }

    function getDeletedAccountNumbers()
        external
        view
        onlyRole(ADMIN_ROLE)
        returns (uint256[] memory)
    {
        return deleted_customer_account_numbers;
    }
}

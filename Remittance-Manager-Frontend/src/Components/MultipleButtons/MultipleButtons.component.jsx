import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../DynamicTable/DynamicTable.component";
import Card from "../Card/Card.component";
// import CustomButton from "../Custom-Button/Custom-button.component";
import CreateUser from "../CreateUser/CreateUser.component";
import RemoveUser from "../RemoveUser/RemoveUser.component";
import BlacklistUser from "../BlacklistUser/BlacklistUser.component";
import SendToken from "../SendStableCoin/SendToken.component";
import ViewTransactionHistory from "../ViewTrxHistory/TrxHistory.component";
import ViewTrx from "../ViewTrx/ViewTrx.component";
import ViewExchangeRate from "../ViewExchangeRate/ViewExchangeRate.component";
import './MultipleButtons.styles.css';

const MultipleButtons = () => {

    const [selectedButton, setSelectedButton] = useState(null);
    const navigate = useNavigate();

    const handleButtonClick = (buttonName, route) => {
        setSelectedButton(buttonName);
        navigate(route);
    };

    const handleCreateUser = useCallback(() => {
        handleButtonClick('Create User', '/home/create-user');
    }, []);

    const handleRemoveUser = useCallback(() => {
        handleButtonClick('Remove User', '/home/remove-user');
    }, []);

    const handleBlacklistUser = useCallback(() => {
        handleButtonClick('Blacklist User', '/home/blacklist-user');
    }, []);

    const handleActiveUsers = useCallback(() => {
        handleButtonClick('View Active Users', '/home/active-users');
    }, []);

    const handleDeletedUsers = useCallback(() => {
        handleButtonClick('View Deleted Users', '/home/deleted-users');
    }, []);

    const handleViewCustomerTrxHistory = useCallback(() => {
        handleButtonClick('View Customer Transaction History', '/home/customer-transaction-history');
    }, []);

    const handleViewTrxHistory = useCallback(() => {
        handleButtonClick('View Transaction', '/home/transaction-history');
    }, []);

    const handleSendTokens = useCallback(() => {
        handleButtonClick('Send Stablecoins', '/home/send-stablecoins');
    }, []);

    const handleViewExchangeRate = useCallback(() => {
        handleButtonClick('View Exchange Rate', '/home/view-exchange-rate');
    }, []);

    return (
        <div className="button-card">
            <div className="button-container">
                <a href="#create" onClick={handleCreateUser}>
                    Create User
                </a>
                <a href="#remove" onClick={handleRemoveUser}>
                    Remove User
                </a>
                <a href="#blacklist" onClick={handleBlacklistUser}>
                    Blacklist User
                </a>
                <a href="#active" onClick={handleActiveUsers}>
                    View Active Users
                </a>
                <a href="#deleted" onClick={handleDeletedUsers}>
                    View Deleted Users
                </a>
                <a href="#customer" onClick={handleViewCustomerTrxHistory}>
                    View Customer Transaction History
                </a>
                <a href="#transaction" onClick={handleViewTrxHistory}>
                    View Transaction
                </a>
                <a href="#exchange" onClick={handleViewExchangeRate}>
                    View Exchange Rate
                </a>
                <a href="#send" onClick={handleSendTokens}>
                    Send Stablecoins
                </a>
            </div>
            <div className="functionality-container">
                {selectedButton === 'Create User' && <CreateUser />}
                {selectedButton === 'Remove User' && <RemoveUser />}
                {selectedButton === 'Blacklist User' && <BlacklistUser />}
                {selectedButton === 'View Active Users' && <Card><DynamicTable tableValue="ActiveUsers" forPrint="Active users list">
                </DynamicTable></Card>}
                {selectedButton === 'View Deleted Users' && <Card><DynamicTable tableValue="DeletedUsers" forPrint="Deleted users list">
                </DynamicTable></Card>}
                {selectedButton === 'View Customer Transaction History' && <ViewTransactionHistory />}
                {selectedButton === 'View Transaction' && <ViewTrx />}
                {selectedButton === 'View Exchange Rate' && <ViewExchangeRate />}
                {selectedButton === 'Send Stablecoins' && <SendToken />}
            </div>
        </div>
    )
}

export default MultipleButtons;

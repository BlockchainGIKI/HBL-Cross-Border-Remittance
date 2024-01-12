import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Custom-Button/Custom-button.component";
import './MultipleButtons.styles.css';

const MultipleButtons = () => {
    const navigate = useNavigate();

    const handleTransferMoney = useCallback(() => {
        navigate('/home/transfer-money');
    }, []);

    const handleTransactionHistory = useCallback(() => {
        navigate('/home/transaction-history');
    }, []);

    const handleFavorite = useCallback(() => {
        navigate('/home/favorite');
    }, []);

    const handleExchangeRate = useCallback(() => {
        navigate('/home/exchange');
    }, []);

    return (
        <div className="InlineButtons">
            <CustomButton handleClick={handleTransferMoney}> Transfer Money </CustomButton>
            <CustomButton handleClick={handleTransactionHistory}> View Sent Transactions </CustomButton>
            <CustomButton handleClick={handleFavorite}> View Received Transactions </CustomButton>
            <CustomButton handleClick={handleExchangeRate}> View ETH-to-PKR Exchange Rate </CustomButton>
        </div>
    )
}

export default MultipleButtons;

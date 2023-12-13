import React from "react";
import { useState } from "react";

import CustomButton from "../Custom-Button/Custom-button.component";

const SendMoney = () => {

    const { fromAccount, setFromAccount } = useState("");
    const { selectedBank, setSelectedBank } = useState("");
    const { accountNumber, setAccountNumber } = useState("");
    const { amount, setAmount } = useState("");
    const { selectedPurpose, setSelectedPurpose } = useState("");
    const { mobileNumber, setMobileNumber } = useState("");

    return (
        <div>
            <form>
                <label>From Account
                    <input
                        type = "text"
                        name = "fromAccount"
                        value = {fromAccount}
                        onChange = {(e) => setFromAccount(e.target.value)}
                        required
                    />
                </label>
                <label>Bank
                    <select
                        name = "Bank"
                        value = {selectedBank}
                        onChange = {(e) => setSelectedBank(e.target.value)}
                        required
                    >
                        <option value="HBL">Habib Bank</option>
                        <option value="UBL">United Bank</option>
                        <option value="ABL">Allied Bank</option>
                        <option value="BOP">Bank of Punjab</option>
                    </select>
                </label>
                <label>Account Number
                    <input
                        type = "text"
                        name = "accountNumber"
                        value = {accountNumber}
                        onChange = {(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </label>
                <label>Amount
                    <input
                        type = "text"
                        name = "amount"
                        value = {amount}
                        onChange = {(e) => setAmount(e.target.value)}
                        required
                    />
                </label>
                <label>Purpose of Payment
                    <select
                        name = "purposeOfPayment"
                        value = {selectedPurpose}
                        onChange = {(e) => setSelectedPurpose(e.target.value)}
                        required
                    >
                        <option value="rentalPayment">Rental payment</option>
                        <option value="familySupport">Family support</option>
                        <option value="miscellaneousPayment">miscellaneous payment</option>
                        <option value="loanPayment">Loan payment</option>
                        <option value="personalInvestment">Personal investment</option>
                    </select>
                </label>
                <label>Mobile Number
                    <input
                        type = "text"
                        name = "mobileNumber"
                        value = {mobileNumber}
                        onChange = {(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </label>
            </form>
            <CustomButton>Send Money</CustomButton>
        </div>
    )
}

export default SendMoney;

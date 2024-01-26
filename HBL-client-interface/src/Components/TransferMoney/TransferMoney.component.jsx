import React from "react";
import { useState, useRef } from "react";
import CustomButton from "../Custom-Button/Custom-button.component";
import './TransferMoney.styles.css';
import { useWeb3 } from '../../hooks/useWeb3';
import { useSelector, useDispatch } from "react-redux";
import { setChange } from "../../changeSlice";

const defaultField = {
    AccountNumber: 0,
    Amount: 0,
};

const TransferMoney = () => {
    // const { SetAsAdmin, CreateCustomer, GetCustomer, GetRemitTransaction, IssueAndSetTransactionParameters } = useWeb3()
    const { IssueAndSetTransactionParameters, web3 } = useWeb3()
    const [formField, setFormField] = useState(defaultField);
    const { AccountNumber, Amount } = formField;
    const formRef = useRef(null);
    const account = useSelector((state) => state.account.value);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormField({ ...formField, [name]: value })
    }

    // const handleSendMoney = () => {
    //     alert("Money send successfully!");
    // }

    const [isLoading, setIsLoading] = useState(false); // State to track loading state

    const handleSendMoney = async (e) => {

        e.preventDefault(); // Prevent the default form submission behavior
        setIsLoading(true); // Set loading state to true
        try {
            // Call your contract function here, e.g., IssueAndSetTransactionParameters(1, 2, 1)
            console.log("Before execution")
            web3.eth.net.isListening()
                .then(() => console.log('is connected'))
                .catch(e => console.log('Wow. Something went wrong: ' + e));
            await IssueAndSetTransactionParameters(account, AccountNumber, Amount);
            // formRef.current.submit();
            setFormField(defaultField);
            // alert("Money sent successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while sending money.");
        } finally {
            setIsLoading(false); // Reset loading state when the operation is complete
            dispatch(setChange(true));
        }
    };

    return (
        <div className="transfer-card">
            <form className="transfer-money" ref={formRef}>
                <div className="row">
                    <div className="col-25">
                        <label>Reciever account number</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            name="AccountNumber"
                            value={AccountNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Amount</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            name="Amount"
                            value={Amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <br></br>
                <CustomButton type="submit" handleClick={(e) => handleSendMoney(e)} disabled={isLoading}>
                    {isLoading ? 'Sending Money...' : 'Send Money'} </CustomButton>
            </form>
        </div>
    )
}

export default TransferMoney;
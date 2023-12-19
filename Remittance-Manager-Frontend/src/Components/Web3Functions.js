import Web3 from "web3";
import { useSelector } from 'react-redux'
import { selectAccount } from '../accountSlice';
import { selectKey } from "../keySlice";
import abi from './ABI';

const TokenManagementAddress = '0x677c57E1f78a4eAB22895Fa8a274EfD9a1dB64C8';
const Admin = '0xE1D876B3B9c64D1273b00f7D1C9e1923DD5945EF';
export function useWeb3() {
    const web3 = new Web3('http://localhost:7545');
    const tokenmanagement = new web3.eth.Contract(abi, TokenManagementAddress)
    tokenmanagement.handleRevert = true;
    const account = useSelector(selectAccount);
    const key = useSelector(selectKey);

    async function GetManager() {
        try {
            console.log('Web3 account: ', account);
            const manager = await tokenmanagement.methods.getManager(account).call({ from: Admin });
            // console.log('Manager :', manager);
            return manager
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function CreateCustomer(name, balance) {
        try {
            await tokenmanagement.methods.createCustomer(name, balance).send({
                from: account, gas: 1500000, gasPrice: '30000000000'
            });
            console.log(`Created customer ${name} with ${balance}`);
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    async function RemoveCustomer(acc_num) {
        try {
            await tokenmanagement.methods.removeBranchCustomer(acc_num).send({
                from: account, gas: 1500000, gasPrice: '30000000000'
            });
            console.log(`Removed customer with account number ${acc_num}`);
        }
        catch (error) {
            console.error('Error:', error);
        }

    }

    async function ViewActiveCustomers() {
        try {
            const customers = await tokenmanagement.methods.getBranchCustomers().call({ from: account });
            console.log('Branch Customers: ', customers)
            return customers;
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    async function ViewRemitHistory(acc_num) {
        try {
            const remit = await tokenmanagement.methods.getBranchRemTxHistory(acc_num).call({ from: account });
            console.log('Remit History: ', remit);
            return remit;
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    async function ViewReceiveHistory(acc_num) {
        try {
            const receive = await tokenmanagement.methods.getBranchRecTxHistory(acc_num).call({ from: account });
            console.log('Receive History: ', receive);
            return receive;
        }
        catch (error) {
            console.error('Error in getting receive history:', error);
        }
    }

    async function ViewTransaction(acc_num, tx_hash) {
        try {
            const transaction = await tokenmanagement.methods.getBranchTx(acc_num, tx_hash).call({ from: account });
            console.log('Transaction: ', transaction);
            return transaction;
        }
        catch (error) {
            console.error('Error in getting transaction:', error);
        }
    }


    return {
        web3,
        GetManager,
        CreateCustomer,
        RemoveCustomer,
        ViewActiveCustomers,
        ViewReceiveHistory,
        ViewRemitHistory,
        ViewTransaction
    }
}

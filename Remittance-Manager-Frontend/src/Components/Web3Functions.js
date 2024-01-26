import Web3 from "web3";
import { useSelector } from 'react-redux'
import { selectAccount } from '../accountSlice';
import { selectKey } from "../keySlice";
import abi from './ABI';
import stableABI from "./StableCoinABI";

const TokenManagementAddressGanache = '0xB27B756C3C6634297484f009C3e4285FDAD30d78';
const StableCoinAddressGanache = '0x6a135e08C49dCA54989D9e88e9685e54F23383eb';
const SuperAdmin = '0xE1D876B3B9c64D1273b00f7D1C9e1923DD5945EF';

const TokenManagementAddressSepolia = '0xcF035e1872E4d7736C5cc436Da8d4D8f4B6030A2';
const StableCoinAddressSepolia = '0x2f036f934dA47e762A9A21503fC8a0012d335698';
const SuperAdminSepolia = '0x1D5359780ee3B0a70C535f1afCc4548F3955A6dA';

export function useWeb3() {
    const web3 = new Web3(window.ethereum || 'wss://ethereum-sepolia.publicnode.com');
    const tokenmanagement = new web3.eth.Contract(abi, TokenManagementAddressSepolia);
    tokenmanagement.handleRevert = true;
    const stablecoin = new web3.eth.Contract(stableABI, StableCoinAddressSepolia);
    stablecoin.handleRevert = true;
    const account = useSelector(selectAccount);
    const key = useSelector(selectKey);

    async function GetManager() {
        try {
            console.log('Web3 account: ', account);
            const manager = await tokenmanagement.methods.getManager(account).call({ from: SuperAdminSepolia });
            // console.log('Manager :', manager);
            return manager
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function CreateCustomer(name, balance, CNIC_hash) {
        try {
            const gas = await tokenmanagement.methods.createCustomer(name, balance, CNIC_hash).estimateGas({ from: account });
            const gasPrice = await web3.eth.getGasPrice();
            await tokenmanagement.methods.createCustomer(name, balance, CNIC_hash).send({
                from: account, gas: gas, gasPrice: gasPrice
            });
            console.log(`Created customer ${name} with ${balance}`);
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    async function RemoveCustomer(acc_num) {
        try {
            const gas = await tokenmanagement.methods.removeBranchCustomer(acc_num).estimateGas({ from: account });
            const gasPrice = await web3.eth.getGasPrice();
            await tokenmanagement.methods.removeBranchCustomer(acc_num).send({
                from: account, gas: gas, gasPrice: gasPrice
            });
            console.log(`Removed customer with account number ${acc_num}`);
            return true;
        }
        catch (error) {
            console.error('Error:', error);
            window.alert(error.message);
        }
    }

    async function BlacklistCustomer(CNIC_hash) {
        try {
            const gas = await tokenmanagement.methods.blacklistBranchCustomer(CNIC_hash).estimateGas({ from: account });
            const gasPrice = await web3.eth.getGasPrice();
            await tokenmanagement.methods.blacklistBranchCustomer(CNIC_hash).send({
                from: account, gas: gas, gasPrice: gasPrice
            });
            console.log(`Blacklisted customer with CNIC hash ${CNIC_hash}`);
            return true;
        }
        catch (error) {
            console.error('Error:', error);
            window.alert(error.message);
        }
    }

    async function SendStableCoins(_receiver, _amount) {
        try {
            const gas = await stablecoin.methods.transfer(_receiver, _amount).estimateGas({ from: account });
            const gasPrice = await web3.eth.getGasPrice();
            await stablecoin.methods.transfer(_receiver, _amount).send({
                from: account, gas: gas, gasPrice: gasPrice
            });
            // await stablecoin.methods.approve(TokenManagementAddressSepolia, _amount).send({
            //     from: account, gas: 1500000, gasPrice: '30000000000'
            // });
            // await tokenmanagement.methods.convertTokens(_receiver, _amount).send({
            //     from: account, gas: 1500000, gasPrice: '30000000000'
            // });
            console.log(`Sent ${_amount} stablecoins to ${_receiver}`);
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
            console.error('Error in getting remittance history:', error.message);
            window.alert(error.message);
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
            window.alert(error.message)
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
            window.alert(error.message)
        }
    }

    async function GetBalance() {
        try {
            const balance = await stablecoin.methods.balanceOf(account).call();
            console.log('Balance: ', balance);
            return balance;
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
        BlacklistCustomer,
        SendStableCoins,
        ViewActiveCustomers,
        ViewReceiveHistory,
        ViewRemitHistory,
        ViewTransaction,
        GetBalance
    }
}

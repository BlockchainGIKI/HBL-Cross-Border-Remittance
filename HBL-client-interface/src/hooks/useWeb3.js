import abi from '../assets/ABI';
import Web3 from "web3";
import { Configs } from '../configs';
import { useSelector } from "react-redux";
import axios from 'axios'

export function useWeb3() {
  const ServerIP = '10.1.33.35';
  const ServerPort = '8000';
  const account = useSelector((state) => state.account.value);
  const { TokenManagementAddressSepolia, Admin, AdminSepolia } = Configs()
  // const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
  const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/312d34ea2d0b473b902a7ad34d993070'));
  // const eth = Web3.givenProvider
  const tokenmanagement = new web3.eth.Contract(abi, TokenManagementAddressSepolia)
  tokenmanagement.handleRevert = true;
  const transactionObject = {
    from: AdminSepolia,
  }

  async function GetCustomer(account_num) {
    try {
      const customer = await tokenmanagement.methods.getCustomer(account_num).call(transactionObject);
      // console.log('Customer:', customer);
      return customer
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function GetRemitTransaction(account_num) {
    try {
      const tx = await tokenmanagement.methods.getRemitTransactionHistory(account_num).call(transactionObject);
      // console.log('Transaction:', tx);
      return tx
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function GetReceiveTransaction(account_num) {
    try {
      const tx = await tokenmanagement.methods.getReceiveTransactionHistory(account_num).call(transactionObject);
      // console.log('Transaction:', tx);
      return tx
    } catch (error) {
      console.log('AT receive error');
      console.error('Error:', error);
    }
  }

  async function IssueAndSetTransactionParameters(sender, receiver, amount) {
    // try {
    //   const gas = await tokenmanagement.methods.issueTransaction(account, ben, amount).estimateGas(transactionObject)
    //   console.log("Gas Estimated:", gas)
    //   const receipt = await tokenmanagement.methods.issueTransaction(account, ben, amount).send(transactionObject)
    //   console.log('Receipt:', receipt);
    //   var date = await web3.eth.getBlock(receipt.blockNumber);
    //   const fee = (Number(receipt.gasUsed) * Number(receipt.effectiveGasPrice)) / 1e9;
    //   console.log('fee', fee, 'gas used', receipt.gasUsed, 'gas price', receipt.effectiveGasPrice);
    //   const tx = await tokenmanagement.methods.setTransactionParameters(receipt.transactionHash, date.timestamp, fee, rem, ben).send(transactionObject);
    //   console.log('Set tx:', tx);
    // } catch (error) {
    //   console.error('Error:', error);
    //   console.log("Here")
    // }
    const params = {
      sender: sender,
      receiver: receiver,
      amount: amount
    };
    const response = await axios.get(`http://10.1.33.35:8000/send-transaction`, { params });
    console.log(response.data);
    if (response.data.result) {
      window.alert('Transaction Successful');
    } else {
      window.alert(response.data.error.message);
    }

  }

  return {
    GetCustomer,
    GetRemitTransaction,
    GetReceiveTransaction,
    IssueAndSetTransactionParameters,
    web3
  }
}
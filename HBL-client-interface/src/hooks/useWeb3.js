import ABI from '../assets/ABI';
import Web3 from "web3";
import { Configs } from '../configs';
import { useSelector } from "react-redux";
// import { User } from "../types"

// import { AccountBalance, TokenInfo } from '../types'

export function useWeb3() {
  const account = useSelector((state) => state.account.value);
  const { TokenManagementAddress, SuperAdmin, Admin } = Configs()
  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
  // const eth = Web3.givenProvider
  const tokenmanagement = new web3.eth.Contract(ABI, TokenManagementAddress)
  tokenmanagement.handleRevert = true;

  const superTransactionObject = {
    from: SuperAdmin,
    gas: 1500000,
    gasPrice: '30000000000'
  }
  const transactionObject = {
    from: Admin,
    gas: 1500000,
    gasPrice: '30000000000'
  }

  async function SetAsAdmin() {
    tokenmanagement.handleRevert = true
    await tokenmanagement.methods.setNodeAsAdmin("0x884EA7E2C4eaB795ce3c1CDf56656733CE8A87C7").send({ from: "0x07F84A996786643C962Bc430F045C949379E1263" })
    // tokenmanagement.methods.setNodeAsAdmin(Admin).send({ from: SuperAdmin })
    console.log("Node set as admin")
  }

  async function CreateCustomer(name, balance) {
    tokenmanagement.handleRevert = true
    await tokenmanagement.methods.createCustomer(name, balance).send({ from: "0xE97067DE6DC5424457e771BA4B7CfAC69413CfAA" })
    // tokenmanagement.methods.setNodeAsAdmin(Admin).send({ from: SuperAdmin })
    console.log("Created Customer")
  }

  async function GetCustomer(account_num) {
    tokenmanagement.handleRevert = true
    try {
      const customer = await tokenmanagement.methods.getCustomer(account_num).call(transactionObject);
      // console.log('Customer:', customer);
      return customer
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function GetRemitTransaction(account_num) {
    tokenmanagement.handleRevert = true
    try {
      const tx = await tokenmanagement.methods.getRemitTransactionHistory(account_num).call(transactionObject);
      // console.log('Transaction:', tx);
      return tx
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function GetReceiveTransaction(account_num) {
    tokenmanagement.handleRevert = true
    try {
      const tx = await tokenmanagement.methods.getReceiveTransactionHistory(account_num).call(transactionObject);
      // console.log('Transaction:', tx);
      return tx
    } catch (error) {
      console.log('AT receive error');
      console.error('Error:', error);
    }
  }

  async function IssueAndSetTransactionParameters(rem, ben, amount) {
    tokenmanagement.handleRevert = true
    try {
      const gas = await tokenmanagement.methods.issueTransaction(account, ben, amount).estimateGas(transactionObject)
      console.log("Gas Estimated:", gas)
      const receipt = await tokenmanagement.methods.issueTransaction(account, ben, amount).send(transactionObject)
      console.log('Receipt:', receipt);
      var date = await web3.eth.getBlock(receipt.blockNumber);
      const fee = (Number(receipt.gasUsed) * Number(receipt.effectiveGasPrice)) / 1e9;
      console.log('fee', fee, 'gas used', receipt.gasUsed, 'gas price', receipt.effectiveGasPrice);
      const tx = await tokenmanagement.methods.setTransactionParameters(receipt.transactionHash, date.timestamp, fee, rem, ben).send(transactionObject);
      console.log('Set tx:', tx);
    } catch (error) {
      console.error('Error:', error);
      console.log("Here")
    }

  }



  // async function getAccount(index: number) {
  //   const accounts = await web3.eth.getAccounts()
  //   return accounts[index] ? accounts[index].toLowerCase() : ''
  // }


  return {
    SetAsAdmin,
    CreateCustomer,
    GetCustomer,
    GetRemitTransaction,
    GetReceiveTransaction,
    IssueAndSetTransactionParameters,
    web3
  }
}
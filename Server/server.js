const express = require('express');
const cors = require('cors');
const { Web3 } = require('web3');
require('dotenv').config();
const { tokenManagementABI } = require('./TokenManagementABI')

// Setting up the server
const app = express();
app.use(express.json());
app.use(cors());

// Setting up the web3 provider
const web3 = new Web3('https://sepolia.infura.io/v3/312d34ea2d0b473b902a7ad34d993070');
const ContractAddressSepolia = '0xcF035e1872E4d7736C5cc436Da8d4D8f4B6030A2'
const tokenmanagement = new web3.eth.Contract(tokenManagementABI, ContractAddressSepolia);
tokenmanagement.handleRevert = true;

// The account used to sign and send the transactions
const privateKey = process.env.PRIVATE_KEY;
const address = '0xE6B8A09608b0D8a3124444b45e6Bb999f3b03dF5';

app.get('/send-transaction', async (req, res) => {
    // Execute your Node.js script here
    console.log('At Send Transaction');
    const { sender, receiver, amount } = req.query;
    console.log('Sender: ', sender, 'Receiver: ', receiver, 'Amount: ', amount);
    try {
        // For the issueTransaction Function Call
        console.log('------------------------------------------------------------------------------');
        console.log('Preparing to invoke the issueTransaction function')
        let gas = await tokenmanagement.methods.issueTransaction(sender, receiver, amount).estimateGas({ from: address });
        console.log("Gas Estimated:", gas)
        let gasPrice = await web3.eth.getGasPrice();
        console.log("Current Gas Price: ", gasPrice)
        let data = tokenmanagement.methods.issueTransaction(sender, receiver, amount).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction({
            to: ContractAddressSepolia,
            data: data,
            gas: gas,
            gasPrice: gasPrice,
            from: address,
        }, privateKey);
        let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('issueTransaction Receipt:', receipt);
        const date = await web3.eth.getBlock(receipt.blockNumber);
        const fee = Number(receipt.gasUsed) * Number(receipt.effectiveGasPrice);
        console.log('Transaction Fee: ', fee, 'Gas used: ', receipt.gasUsed, 'Gas Price: ', receipt.effectiveGasPrice);
        console.log('Ivoked the issueTransaction function')
        console.log('------------------------------------------------------------------------------');

        // For the setTransactionParameters Function Call
        console.log('------------------------------------------------------------------------------');
        console.log('Preparing to invoke the setTransactionParameters function');
        gas = await tokenmanagement.methods.setTransactionParameters(receipt.transactionHash, date.timestamp, fee, sender, receiver).estimateGas({ from: address });
        console.log("Gas Estimated:", gas)
        gasPrice = await web3.eth.getGasPrice();
        console.log("Current Gas Price: ", gasPrice);
        data = tokenmanagement.methods.setTransactionParameters(receipt.transactionHash, date.timestamp, fee, sender, receiver).encodeABI();
        signedTx = await web3.eth.accounts.signTransaction({
            to: ContractAddressSepolia,
            data: data,
            gas: gas,
            gasPrice: gasPrice,
            from: address,
        }, privateKey);
        receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('setTransactionParameters Receipt:', receipt);
        console.log('Ivoked the setTransactionParameters function');
        console.log('------------------------------------------------------------------------------');
        const result = 'Transaction Successful';
        res.json({ result });
    } catch (error) {
        console.error('Error:', error);
        res.json({ error });
    }

});

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

async function main() {
    const fee = 4078807158046446;
    const hash = '0xf0323f70756db6925cd43891f95a28765ddba267c352c782560cdb8e6b1bf93d';
    const blockNumber = 5151573;
    const date = await web3.eth.getBlock(blockNumber);
    const gas = await tokenmanagement.methods.setTransactionParameters(hash, date.timestamp, fee, 1, 2).estimateGas({ from: address });
    console.log("Gas Estimated:", gas)
    const gasPrice = await web3.eth.getGasPrice();
    console.log("Current Gas Price: ", gasPrice);
    const data = tokenmanagement.methods.setTransactionParameters(hash, date.timestamp, fee, 1, 2).encodeABI();
    const signedTx = await web3.eth.accounts.signTransaction({
        to: ContractAddressSepolia,
        data: data,
        gas: gas,
        gasPrice: gasPrice,
        from: address,
    }, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('setTransactionParameters Receipt:', receipt);
}

// main();
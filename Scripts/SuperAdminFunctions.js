const { Web3 } = require('web3');
const axios = require('axios');
const { stableABI } = require('./StableCoinABI');
const { tokenManagementABI } = require('./TokenManagementABI');
const { engineABI } = require('./EngineABI');
const { config } = require('./Constants');
require('dotenv').config();

const super_admin = '0xE1D876B3B9c64D1273b00f7D1C9e1923DD5945EF';
const network = 'Sepolia';
const web3 = new Web3(config[network]['RPC']);
// const token_management = new web3.eth.Contract(tokenManagementABI, config[network]['TokenManagementContractAddress']);
// token_management.handleRevert == true;
const engine = new web3.eth.Contract(engineABI, config[network]['DSCEngineContractAddress']);
engine.handleRevert == true;

async function setExchangeRate() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=pkr');
        console.log('Exchange Rate Provided by CoinGecko', response.data.ethereum.pkr);
        const gas = await engine.methods.setPKRExchangeRate(response.data.ethereum.pkr * 1e8).estimateGas({ from: super_admin });
        console.log('Estimated Gas: ', gas);
        const gasPrice = await web3.eth.getGasPrice();
        console.log('Current Gas Price: ', gasPrice);
        const tx = await engine.methods.setPKRExchangeRate(response.data.ethereum.pkr * 1e8).send({ from: super_admin, gasPrice: gasPrice, gas: gas });
        console.log('Transaction Receipt: ', tx);
    } catch (error) {
        console.error(error);
    }
}

async function getExchangeRate() {
    try {
        const rate = await engine.methods.getPKRExchangeRate().call();
        console.log('Current Exchange Rate: ', rate);
    } catch (error) {
        console.error(error);
    }
}

async function depositCollateral(amount) {
    try {
        const rate = await engine.methods.getPKRExchangeRate().call();
        console.log('Current Exchange Rate: ', rate);
    } catch (error) {
        console.error(error);
    }
}

// setExchangeRate()
getExchangeRate()
// async function createManager(manager_name, branch_code, location, address) {
//     createManager(
//         "Umer", 456, "Rawalpindi", node_account, { "from": super_admin }
//     )
// }
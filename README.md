To run this project:
1.	Clone this repository. 
2.	Download and run the Ganache AppImage or executable from https://trufflesuite.com/ganache/. Alternatively, you can use Ganache CLI to start a local blockchain test network.
3.	Deploy “RemittanceToken” in “remittance-dApp/contracts”. You can use Remix or a smart contract development framework such as Hardhat or Brownie for deployment. This sol file imports the ERC20 smart contract from Open Zeppelin so configure the import utility tool of your framework accordingly.
4.	Deploy “TokenManagement” in “remittance-dApp/contracts”. You can use Remix or a smart contract development framework such as Hardhat or Brownie for deployment. Pass the address of “RemittanceToken” as the first parameter and any Ethereum address as the second parameter (the second parameter is a placeholder for the price feed oracle address to be implemented in a future version). This sol file imports AccessControl and IERC20 smart contracts from Open Zeppelin and the AggregatorV3Interface from Chainlink so configure the import utility tool of your framework accordingly.
5.	Invoke the “createManager” function of the deployed “TokenManagement” smart contract. Pass these parameters as function arguments: string name, uint256 branch_code, string location, and address account.
6.	Change the working folder to “/Remittance-Manager-Frontend” and run “npm install” from a terminal to install project dependencies. In “/src/components/Web3Functions.js” replace the values of “TokenManagementAddress” and “SuperAdmin” with the address of “TokenManagement” and the address of the deployer of “RemittanceToken” respectively.
7.	Run “npm start” from a terminal to launch the manager interface.
8.	Paste the address of the manager in the username field and type any random string in the password field. Click on sign in to go to the manager dashboard.
9.	Create one or two customers from the manager dashboard.
10.	Change the working folder to “/HBL-client-interface” and run “npm install” from a terminal to install project dependencies. In “/src/configs/index.js” replace the values of “TokenManagementAddress” and “Admin” with the address of “TokenManagement” and the address of the manager from step 5 respectively.
11.	Run “npm start” from a terminal to launch the customer interface.
12.	Paste the account number of the newly created customer in the username field and type any random string in the password field. Click on sign in to go to the customer dashboard.

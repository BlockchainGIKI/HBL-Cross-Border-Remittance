import React, { useState } from 'react';
import CustomButton from '../Custom-Button/Custom-button.component';
import Card from '../Card/Card.component';
import './ConnectMetaMask.styles.css';

const ConnectMetaMask = () => {
    const [walletAddress, setWalletAddress] = useState(null);

    async function requestAccount() {
        if (window.ethereum) {
            try {
                // Request access to accounts
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Listen for changes to accounts
                window.ethereum.on('accountsChanged', (newAccounts) => {
                    if (newAccounts.length > 0) {
                        // Use the first account in the array as the active account
                        setWalletAddress(newAccounts[0]);
                    } else {
                        // Handle the case where no accounts are found
                        alert('No Ethereum accounts found in MetaMask.');
                        setWalletAddress('');
                    }
                });
                // Get initial accounts
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                } else {
                    alert('No Ethereum accounts found in MetaMask.');
                }
            } catch (error) {
                console.log('Error connecting to MetaMask:', error);
            }
        } else {
            alert('MetaMask not detected');
        }
    }

    return (
        <Card>
            <h2>Connect MetaMask</h2>
            <br /> <br />
            <CustomButton handleClick={requestAccount}>{'Connected' || 'Connect'}</CustomButton>
        </Card>
    );
};

export default ConnectMetaMask;

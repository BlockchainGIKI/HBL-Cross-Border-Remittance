import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card.component';
import './ViewExchangeRate.styles.css'

const ViewExchangeRate = () => {
    const [exchangeRate, setExchangeRate] = useState(null);

    async function fetchExchangeRate() {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=pkr');
            console.log('Exchange Rate Provided by CoinGecko', response.data.ethereum.pkr);
            setExchangeRate(response.data.ethereum.pkr);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchExchangeRate();
    }, []);

    return (
        <Card>
            <h2>Ether to PKR Exchange Rate (Provided by CoinGecko)</h2>
            <br></br>
            <label style={{ width: '150px' }}>
                {exchangeRate}
            </label>
        </Card>
    );
};

export default ViewExchangeRate;

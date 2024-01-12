import React, { useEffect, useState } from 'react';
import { Statistic } from 'antd';
import axios from 'axios';
import './ExchangeRate.styles.css';

const ExchangeRate = () => {
    const [exchangeRate, setExchangeRate] = useState("");

    useEffect(() => {
        fetchExchangeRate();
    }, []);

    async function fetchExchangeRate() {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=pkr');
            console.log('Exchange Rate Provided by CoinGecko', response.data.ethereum.pkr);
            setExchangeRate(response.data.ethereum.pkr);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="exchange-card">
            <div className="row">
                <div className="stat-25">
                    <Statistic title="Eth to PKR Exchange Rate (Data Provided by CoinGecko)" value={exchangeRate} />
                </div>
            </div>
        </div>
    )
};

export default ExchangeRate;
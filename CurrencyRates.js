import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyRates = () => {
    const [rates, setRates] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('RUB');
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const fetchRates = async () => {
        setLoading(true);
        setError(null);   
        try {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/a9c39cab3993a4c941fef999/latest/${baseCurrency}`);
            setRates(response.data.rates);
        } catch (error) {
            setError('Ошибка при получении курсов валют');
            console.error('Ошибка при получении курсов валют', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, [baseCurrency]);

    return (
        <div>
            <h2>Текущие курсы валют</h2>
            <select onChange={(e) => setBaseCurrency(e.target.value)} value={baseCurrency}>
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                
            </select>

            {loading && <p>Загрузка...</p>}  
            {error && <p style={{ color: 'red' }}>{error}</p>} 

            <ul>
                {Object.entries(rates).map(([currency, rate]) => (
                    <li key={currency}>
                        1 {baseCurrency} = {rate.toFixed(2)} {currency}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CurrencyRates;

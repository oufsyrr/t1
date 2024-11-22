import React, { useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleConvert = async () => {
        const regex = /^(\d+(\.\d+)?)\s*([a-zA-Z]{3})\s*in\s*([a-zA-Z]{3})$/;
        const match = input.match(regex);
        if (match) {
            const amount = parseFloat(match[1]);
            const fromCurrency = match[3].toUpperCase();
            const toCurrency = match[4].toUpperCase();

            try {
                const response = await axios.get(`https://v6.exchangerate-api.com/v6/a9c39cab3993a4c941fef999/latest/${fromCurrency}`);
                const rate = response.data.conversion_rates[toCurrency];
                if (rate) {
                    setResult(amount * rate);
                    setError('');
                } else {
                    setError('Неверная валюта');
                }
            } catch (error) {
                setError('Ошибка при получении данных');
            }
        } else {
            setError('Неверный формат ввода');
        }
    };

    return (
        <div>
            <h2>Конвертер валют</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="15 USD in RUB"
            />
            <button onClick={handleConvert}>Конвертировать</button>
            {result && <p>Результат: {result.toFixed(2)}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CurrencyConverter;

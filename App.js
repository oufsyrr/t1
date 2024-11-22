import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CurrencyConverter from './CurrencyConverter';
import CurrencyRates from './CurrencyRates';

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/" style={{ marginRight: '10px' }}>Конвертер валют</Link>
                <Link to="/rates">Курсы валют</Link>
            </nav>
            <Routes>
                <Route path="/" element={<CurrencyConverter />} />
                <Route path="/rates" element={<CurrencyRates />} />
            </Routes>
        </Router>
    );
};

export default App;

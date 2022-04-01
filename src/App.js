import React, { useEffect, useState } from 'react';
import Account from './Account/Account';
import Transactions from './Transactions/Transactions';
import api from './api';
import './App.css';

export const calculateNewBalance = (values, balance) => {
    if (values.transaction === 'deposit') {
        return balance + parseInt(values.value)
    } else {
        return balance - parseInt(values.value);
    };
};

function App() {
    const [balance, updateBalance] = useState(1000);
    const [transations, updateTransactions] = useState([]);

    async function loadTransactions() {
        const transations = await api.listTransactions();
        updateTransactions(transations);
    };

    async function getBalance() {
        updateBalance(await api.searchBalance());
    };

    function carryOutTransaction(values) {
        const newBalance = calculateNewBalance(values, balance);

        api.toUpdateBalance(newBalance).catch((error) => console.error(error))
        api.updateTransactions(values).catch((error) => console.error(error))

        updateBalance(newBalance);
        updateTransactions([values]);
    };

    useEffect(() => {
        getBalance();
        loadTransactions();
    }, [balance]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>React App Bank</h1>
            </header>

            <Account balance={balance} carryOutTransaction={carryOutTransaction} />
            <Transactions transations={transations} />
        </div>
    );
};

export default App;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Account.css'

const Account = ({ balance, carryOutTransaction }) => {
    const [values, updateValues] = useState({ transaction: '', value: 0 });

    function handleChange(e) {
        const { name, value } = e.target;
        const updatedValues = { ...values, [name]: value };

        updateValues(updatedValues);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const dateTransaction = new Date().toLocaleDateString('pt-br');
        carryOutTransaction({ ...values, data: dateTransaction });
    };

    return <div className="Account-header">
        <h2>Account</h2>
        <p>Balance: <span data-testid="balance-account" className="Balance-value">{`R$ ${balance}`}</span></p>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Deposit
                    <input
                        type="radio"
                        name="transaction"
                        value="deposit"
                        onChange={handleChange}
                        data-testid="transaction"
                        checked={values.transaction === 'deposit'}
                    />
                </label>
            </div>

            <div>
                <label>
                    Withdraw
                    <input
                        type="radio"
                        name="transaction"
                        value="withdraw"
                        data-testid="transaction"
                        onChange={handleChange}
                        checked={values.transaction === 'withdraw'}
                    />
                </label>
            </div>

            <label>Value:</label>
            <input
                type="text"
                name="value"
                value={values.value}
                data-testid="value"
                onChange={handleChange}
            ></input>

            <div>
                <button type='submit'>
                    Carry Out Operation
                </button>
            </div>
        </form>
    </div>
};

Account.defaultProps = {
    balance: 0,
};

Account.propTypes = {
    balance: PropTypes.number,
};

export default Account;

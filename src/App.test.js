import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App, { calculateNewBalance } from './app';

describe('Principal component', () => {
    describe('When I start the App', () => {
        it('Should return, the bank name.', () => {
            render(<App />);
            expect(screen.getByText('React App Bank')).toBeInTheDocument();
        });

        it('Should return, the account balance.', () => {
            render(<App />);
            expect(screen.getByText('Balance:')).toBeInTheDocument();
        });

        it('Should display, the perform transaction button.', () => {
            render(<App />);
            expect(screen.getByText('Carry Out Operation')).toBeInTheDocument();
        });
    });

    describe('When I make a transaction', () => {
        it('Should decrease the value', () => {
            const values = {
                trasaction: 'withdraw',
                value: 50
            };
            const newBalance = calculateNewBalance(values, 150);

            expect(newBalance).toBe(100);
        });

        it('Should carry out a transaction', () => {
            render(<App />);

            const balance = screen.getByText('R$ 1000');
            const transaction = screen.getByLabelText('withdraw');
            const value = screen.getByTextId('value');
            const transactionButton = screen.getByText('Carry Out Transaction');

            expect(balance.textContent).toBe('R$ 1000');

            fireEvent.click(transaction, { target: { value: 'withdraw' } });
            fireEvent.change(value, { target: { value: '10' } });
            fireEvent.change(transactionButton);

            expect(balance.textContent).toBe('R$ 990');
        });
    });
});

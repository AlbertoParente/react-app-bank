import React from 'react';
import { render, screen } from '@testing-library/react';
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
    });
});


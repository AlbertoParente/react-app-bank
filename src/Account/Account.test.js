import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Account from './Account';

describe('Account Component', () => {
    it('Should display the balance with the monetary value', () => {
        render(<Account balance={1000} />);

        const balance = screen.getByTestId('balance-account');

        expect(balance).toBe('R$ 1000');
    })

    it('Should call perform transaction function, when button is clicked', () => {
        const functionCarryOutTransaction = jest.fn();

        render(<Account balance={1000} carryOutTransaction={functionCarryOutTransaction} />);

        fireEvent.click(screen.getByText('Carry Out Operation'));

        expect(functionCarryOutTransaction).toHaveBeenCalled();
    })
})

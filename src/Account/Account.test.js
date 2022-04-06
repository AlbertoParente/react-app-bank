import React from 'react';
import { render, screen } from '@testing-library/react';
import Account from './Account';

describe('Account Component', () => {
    it('Should display the balance with the monetary value', () => {
        render(<Account balance={1000} />);

        const balance = screen.getByTestId('balance-account');

        expect(balance).toBe('R$ 1000');
    })
})

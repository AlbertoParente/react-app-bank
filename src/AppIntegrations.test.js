import React from 'react';
import { render, screen } from '@testing-library/react/dist/pure';
import api from './api';
import App from './App';

jest.mock('./api');

describe('API requests', () => {
    it('Should display transaction list via API', () => {
        api.listTransactions.mockResolvedValue([
            {
                "value": 10,
                "transaction": "withdraw",
                "date": "01/03/2022",
                "id": 1
            },
            {
                "transaction": "deposit",
                "value": 20,
                "date": "29/03/2022",
                "id": 2
            }
        ]);

        render(<App />);
        // screen(findByText('withdraw')).toBeInTheDocument;
        expect(screen.getByTestId('transactions').children.lenght).toBe(2);
    });
});

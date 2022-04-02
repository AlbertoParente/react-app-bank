import React from 'react';
import { render } from '@testing-library/react';
import Transaction from './Transaction';

describe('Extract transaction component', () => {
    it('Should always keep the same snapshot', () => {
        const { container } = render(
            <Transaction
                date="02/04/2022"
                type="withdraw"
                value="20.00"
            />)

        expect(container.firstChild).toMatchSnapshot();
    });
});

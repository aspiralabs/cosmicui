import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import DatePicker from './DatePicker';

describe('DatePicker', () => {
    test('DatePicker renders', async () => {
        render(<DatePicker data-testid="test-date-picker" value="" />);
        const picker = screen.getByTestId('test-date-picker');
        expect(picker).toBeInTheDocument();
    });
});

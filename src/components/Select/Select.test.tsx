import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Select from './Select';

describe('Select', () => {
    test('Select renders', async () => {
        render(<Select data-testid="test-select" options={[]} />);
        const select = screen.getByTestId('test-select');
        expect(select).toBeInTheDocument();
    });
});

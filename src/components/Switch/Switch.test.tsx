import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Switch from '.';

describe('Switch', () => {
    test('Switch can be disabled', async () => {
        render(<Switch disabled />);
        expect(screen.getByRole('checkbox')).toBeDisabled();
    });
});

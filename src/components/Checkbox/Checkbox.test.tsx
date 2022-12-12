import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
    test('Checkbox can be disabled', async () => {
        render(<Checkbox disabled />);
        expect(screen.getByRole('checkbox')).toBeDisabled();
    });
});

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Button from '../Button';

import Dropdown from './Dropdown';

describe('Dropdown', () => {
    test('Dropdown renders children (button)', async () => {
        render(
            <Dropdown menuOptions={[]}>
                <Button data-testid="test-btn">Click Me</Button>
            </Dropdown>
        );
        const button = screen.getByTestId('test-btn');
        expect(button).toBeInTheDocument();
    });
});

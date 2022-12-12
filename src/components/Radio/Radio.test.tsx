import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Radio } from '../..';

describe('Radio', () => {
    test('Radio can be disabled', async () => {
        render(<Radio disabled />);
        expect(screen.getByRole('radio')).toBeDisabled();
    });
});

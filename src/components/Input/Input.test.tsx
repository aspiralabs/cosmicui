import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Input from './Input';

describe('Input', () => {
    test('Input supports uncontrolled state', async () => {
        render(<Input />);
        expect(screen.getByRole('textbox')).toHaveValue('');
        await userEvent.type(screen.getByRole('textbox'), 'test-value');
        expect(screen.getByRole('textbox')).toHaveValue('test-value');
    });

    test('Input supports controlled state', async () => {
        const spy = jest.fn();
        render(<Input value="" onChange={spy} />);
        expect(screen.getByRole('textbox')).toHaveValue('');
        await userEvent.type(screen.getByRole('textbox'), 'test-value');
        expect(spy).toHaveBeenCalled();
        expect(screen.getByRole('textbox')).toHaveValue('');
    });
});

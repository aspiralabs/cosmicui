import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import TextArea from './TextArea';

describe('TextArea', () => {
    test('TextArea supports uncontrolled state', async () => {
        render(<TextArea />);
        expect(screen.getByRole('textbox')).toHaveValue('');
        await userEvent.type(screen.getByRole('textbox'), 'test-value');
        expect(screen.getByRole('textbox')).toHaveValue('test-value');
    });

    test('TextArea supports controlled state', async () => {
        const spy = jest.fn();
        render(<TextArea value="" onChange={spy} />);
        expect(screen.getByRole('textbox')).toHaveValue('');
        await userEvent.type(screen.getByRole('textbox'), 'test-value');
        expect(spy).toHaveBeenCalled();
        // expect(screen.getByRole('textbox')).toHaveValue('');
    });
});

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Badge from './Badge';

describe('Badge', () => {
    test('Badge renders', async () => {
        render(<Badge>Hello World</Badge>);
        expect(screen.getByText('Hello World'));
    });
});

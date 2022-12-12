import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Form, Input } from '../..';

describe('Form', () => {
    test('Form renders children (input)', async () => {
        render(
            <Form onSubmit={() => console.log('submitted')}>
                <Input data-testid="first-name" name="firstName" />
            </Form>
        );
        const input = screen.getByTestId('first-name');
        expect(input).toBeInTheDocument();
    });
});

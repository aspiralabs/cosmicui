import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import Button from './Button';
expect.extend(toHaveNoViolations);

describe('Button', () => {
    test('Renders the Button component', () => {
        render(<Button id="button-to-test">Hello World</Button>);
        expect(screen.getByText('Hello World'));
    });

    test('Passes type to button component', () => {
        render(<Button type="submit" />);
        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    test('Sets disabled attribute based on prop', () => {
        render(<Button disabled />);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    test('Button a11y', async () => {
        const { container } = render(<Button>Click</Button>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});

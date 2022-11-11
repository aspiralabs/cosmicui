import '../src/styles/global.css';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
        isCodeExpanded: true
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};

import '../src/styles/global.css';
import CosmicProvider from '../src/components/CosmicProvider';

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

export const decorators = [
    Story => (
        <CosmicProvider>
            <Story />
        </CosmicProvider>
    )
];

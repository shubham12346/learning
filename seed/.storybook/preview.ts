import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { ThemeProvider } from '@emotion/react';

import { PureLightTheme } from '../src/core/theme/schemes/PureLightTheme';

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: PureLightTheme
    },
    Provider: ThemeProvider
  })
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;

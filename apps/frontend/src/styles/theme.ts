import { extendTheme } from '@chakra-ui/theme-utils';

const theme = extendTheme({
  config: { initialColorMode: 'light', useSystemColorMode: false },
  styles: {
    global: {
      'html, body, #__next': { height: '100%' },
    },
  },
});

export default theme;

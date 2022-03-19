import { extendTheme } from '@chakra-ui/react';
export const theme = extendTheme({
  colors: {
    gray: {
      '50': '#F5F6F9',
      '400': '#A9A7B1',
    },
    purple: {
      '600': '#6356A5',
    },
    blue: {
      '600': '#6356A5',
      '700': '#52488a',
    },
    yellow: {
      '300': '#FEC92E',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

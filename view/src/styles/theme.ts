import { extendTheme } from '@chakra-ui/react';
export const theme = extendTheme({
  colors: {
    gray: {
      '50': '#F5F6F9',
      '400': '#A9A7B1',
    },
    Purple: {
      '600': '#6356A5',
    },
  },
  fonts:{
    heading:"Roboto",
    body:"Roboto"
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

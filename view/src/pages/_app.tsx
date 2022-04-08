import { ChakraProvider } from '@chakra-ui/react';
import { Header } from '../components/Header/Header';
import { AuthProvider } from '../services/hook/auth';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;

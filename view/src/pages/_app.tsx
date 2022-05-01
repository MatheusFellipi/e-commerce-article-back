import { ChakraProvider } from '@chakra-ui/react';
import { Header } from '../components/Header/Header';
import { AuthProvider } from '../services/hook/auth';
import { CartProvider } from '../services/hook/useCart';
import { theme } from '../styles/theme';
import '../styles/teste.css';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default MyApp;

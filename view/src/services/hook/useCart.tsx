import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type UsersType = {
  name: string;
  job_role: string;
  avatar: string;
};

type ArticlesType = {
  amount: number;
  id: string;
  title: string;
  themes: string[];
  text: string;
  img_url: string;
  created_at: string;
  user: UsersType;
};

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  cart: ArticlesType[];
  addProduct: (article: ArticlesType) => Promise<void>;
  removeProduct: (article: ArticlesType) => void;
  valueTotal: any;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<ArticlesType[]>(() => {
    let storagedCart: any;

    if (typeof window !== 'undefined') {
      storagedCart = window.localStorage.getItem('@article:cart');
    }

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }
    return [];
  });
  const [valueTotal, setValueTotal] = useState<any>(0);

  const prevCartRef = useRef<ArticlesType[]>();

  useEffect(() => {
    prevCartRef.current = cart;
    value();
  });

  const cartPreviousValues = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValues !== cart) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('@article:cart', JSON.stringify(cart));
        value();
      }
    }
  }, [cart, cartPreviousValues]);

  const value = async () => {
    const total = cart.reduce((total: any, item) => {
      return total.amount + item.amount;
    });
    setValueTotal(total);
  };

  const addProduct = async (article: ArticlesType) => {
    try {
      const updatedCart = [...cart];

      const productExists = updatedCart.find((item) => item.id === article.id);

      if (productExists) {
        return;
      }
      updatedCart.push(article);

      setCart(updatedCart);
      console.log(cart);
    } catch (err) {
      console.log('Erro na adição do produto');
    }
  };

  const removeProduct = (article: ArticlesType) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (product) => product.id === article.id
      );

      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
      } else {
        throw Error();
      }
    } catch {
      console.log('Erro na remoção do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, valueTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}

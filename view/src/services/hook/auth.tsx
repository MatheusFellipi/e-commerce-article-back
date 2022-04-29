import { createContext, ReactNode, useContext, useState } from 'react';

import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useRouter } from 'next/router';
import { UserType } from '../Type';

interface AuthContextData {
  signin: (data: UserType) => void;
  signout: () => void;
  user: UserType;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const route = useRouter();
  const usersInitial = {
    token: '',
    user: {
      email: '',
      name: '',
    },
  };

  const [user, setUser] = useState<UserType>(usersInitial);

  const signin = (data: UserType) => {
    setCookie(null, 'togdesign:token', data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    route.push('/dashboard');
    setUser(data);
  };

  const signout = () => {
    setUser(usersInitial);
    destroyCookie(null, 'togdesign:token');
    route.push('/login');
  };

  return (
    <AuthContext.Provider value={{ signin, signout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

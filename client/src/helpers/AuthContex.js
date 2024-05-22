import { createContext } from 'react';

export const AuthContext = createContext({
    authState: { status: false, isAdmin: false },
    setAuthState: () => {}
  });
import { createContext, useContext } from 'react';
import type { AuthContextType } from './authTypes';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook is the only non-component export from this file.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};


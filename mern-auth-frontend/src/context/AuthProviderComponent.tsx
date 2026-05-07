import React, { useEffect, useMemo, useState } from 'react';
import * as authAPI from '../api/auth';
import type { AuthContextType } from './authTypes';
import { AuthContext } from './AuthContext';


const toAxiosMessage = (err: unknown) => {
  const axiosErr = err as unknown as { response?: { data?: { message?: string } } };
  return axiosErr?.response?.data?.message || 'Login/Register failed';
};

const initialLoadingState = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState<boolean>(initialLoadingState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    authAPI
      .getProfile(token)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((e) => {
        console.log('Profile fetch failed:', e);
        localStorage.removeItem('token');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (err) {
      const message = toAxiosMessage(err);
      setError(message);
      const e = new Error(message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e as any).cause = (err as any) ?? undefined;
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(name, email, password);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (err) {
      const message = toAxiosMessage(err);
      setError(message);
      const e = new Error(message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e as any).cause = (err as any) ?? undefined;
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
    setIsLoading(false);
  };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      error,
    }),
    [user, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


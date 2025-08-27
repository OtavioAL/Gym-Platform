'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import api from '../lib/api';
import { login } from '../services/auth';
import { IPropsErrosRequest } from '../interface/errors-request';
import { User } from '../features/users/types';
import { backendMessagesConvert } from '../utils/backendMessageConvert';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoadingUser: boolean;
  isLoadingLogin: boolean;
};

const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  const { mutate: mutateUserLogin, isPending: isLoadingLogin } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      Cookies.set('access_token', data.accessToken, { sameSite: 'lax' });
      Cookies.set('refresh_token', data.refreshToken, { sameSite: 'lax' });
      Cookies.set('user_role', data.user.role, { sameSite: 'lax' });

      api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      setUser(data.user);

      router.push('/dashboard');
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message) {
        toast.error(backendMessagesConvert(error?.response?.data?.message));
      }
    },
  });

  function signOut() {
    setUser(null);
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('user_role');
    router.push('/');
  }

  async function signIn(email: string, password: string) {
    mutateUserLogin({ username: email, password });
  }

  const loadUserFromCookies = useCallback(async () => {
    setIsLoadingUser(true);
    const token = Cookies.get('access_token');

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        const { data } = await api.get('/users/me');

        setUser(data);
      } catch (error: any) {
        if (error?.response?.data?.message) {
          toast.error(backendMessagesConvert(error?.response?.data?.message));
          return;
        }

        toast.error(error?.message);
      } finally {
        setIsLoadingUser(false);
      }
    } else {
      setIsLoadingUser(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') loadUserFromCookies();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        signIn,
        isLoadingUser,
        isLoadingLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

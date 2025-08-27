'use client';

import React, { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { queryClient } from '../lib/queryClient';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { BrowserRouter } from 'react-router-dom';

type Props = { children: ReactNode };
type Provider = (props: Props) => React.JSX.Element;

export const composeProviders = (...providers: Provider[]) =>
  providers.reduceRight(
    (AccumulatedProviders, CurrentProvider, index) => {
      const Wrapper = ({ children }: Props) => (
        <CurrentProvider>
          <AccumulatedProviders>{children}</AccumulatedProviders>
        </CurrentProvider>
      );
      Wrapper.displayName = `ComposedProvider_${index}`;
      return Wrapper;
    },
    ({ children }: Props) => <>{children}</>,
  );

const QueryProvider = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const ChakraProviderUser = ({ children }: Props) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

const ToastProvider = ({ children }: Props) => (
  <>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    {children}
  </>
);

export const AppProviders = composeProviders(
  BrowserRouter,
  QueryProvider,
  AuthProvider,
  ChakraProviderUser,
  ToastProvider,
);

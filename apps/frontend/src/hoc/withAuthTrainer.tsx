'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export function withAuthTrainer<P extends object>(Component: React.ComponentType<P>) {
  const AuthenticatedComponent = (props: P) => {
    const { user, isLoadingUser } = useAuth();

    const router = useRouter();

    useEffect(() => {
      if (typeof window === 'undefined') return;
      if (!isLoadingUser && !user?.id) {
        router.push('/');
      }

      if (!isLoadingUser && user?.role !== 'trainer') {
        router.push('/');
      }
    }, [isLoadingUser, user, router]);

    if (isLoadingUser || !user?.id) {
      return <LoadingSpinner />;
    }

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

  return AuthenticatedComponent;
}

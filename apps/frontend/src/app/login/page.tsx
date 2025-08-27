'use client';

import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@/features/auth/index'));

export default function LoginPage() {
  return <Login />;
}

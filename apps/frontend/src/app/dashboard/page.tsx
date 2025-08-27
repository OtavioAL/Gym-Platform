'use client';

import { Box, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import AdminDashboardPage from '@/features/users/admin/DashboardPage';
import TrainerDashboardPage from '@/features/users/trainer/DashboardPage';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <Box p={8}>
        <Heading mb={6}>Bem-vindo, {user?.name}</Heading>
        <Text mb={8}>Você está logado como: {user?.role?.toUpperCase()}</Text>

        {user?.role === 'admin' && <AdminDashboardPage />}
        {/* {user?.role === 'student' && <TrainerDashboardPage />} */}
        {user?.role === 'trainer' && <TrainerDashboardPage />}
      </Box>
    </>
  );
}

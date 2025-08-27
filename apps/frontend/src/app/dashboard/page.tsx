'use client';

import { Box, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import AdminDashboardPage from '@/features/users/admin/DashboardPage';
import TrainerDashboardPage from '@/features/users/trainer/DashboardPage';
import StudentDashboardPage from '@/features/users/student/DashboardPage';

export default function Dashboard() {
  const { user } = useAuth();

  const TYPE_USER = {
    admin: 'Administrador',
    trainer: 'Professor',
    student: 'Aluno',
  };

  return (
    <>
      <Header />
      <Box p={8}>
        <Heading mb={6}>Bem-vindo, {user?.name}</Heading>
        <Text mb={8}>Você está logado como: {TYPE_USER[user?.role as keyof typeof TYPE_USER]}</Text>

        {user?.role === 'admin' && <AdminDashboardPage />}
        {user?.role === 'student' && <StudentDashboardPage />}
        {user?.role === 'trainer' && <TrainerDashboardPage />}
      </Box>
    </>
  );
}

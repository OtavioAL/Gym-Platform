import Header from '@/components/Header';
import { withAuthAdmin } from '@/hoc/withAuthAdmin';
import { Heading, VStack } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useUsers } from '../hooks/useUsers';
import { CreateUserInput } from '@shared/validations/create-user';
import { UserForm } from '../components/UserForm';

const AdminCreateUsersPage = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const { handleCreateUser, isLoadingCreateUser } = useUsers();

  return (
    <>
      <Header />

      <VStack spacing={4} alignItems="flex-start" width={'100%'} m={'auto'} maxW={'600px'} my={8}>
        <Heading size="lg">Criar um novo {role === 'student' ? 'aluno' : 'professor'}</Heading>
        <VStack spacing={4} alignItems="flex-start" width={'100%'} m={'auto'} maxW={'600px'} my={8}>
          <UserForm
            onSubmit={(data) => handleCreateUser(data as CreateUserInput)}
            isSubmitting={isLoadingCreateUser}
            submitText="Cadastrar usuário"
            defaultValues={{
              role: role as 'student' | 'trainer',
            }}
          />
        </VStack>
      </VStack>
    </>
  );
};

export default withAuthAdmin(AdminCreateUsersPage);

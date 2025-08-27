'use client';
import Header from '@/components/Header';
import { BaseSelect } from '@/components/inputs/BaseSelect';
import { withAuthAdmin } from '@/hoc/withAuthAdmin';
import { Button, Heading, HStack, Stack, Table, Tbody } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUsers } from './hooks/useUsers';
import { TableHeader } from './components/TableHeader';
import { UserDTO } from '@shared/types';
import { TableBody } from './components/TableBody';
import { MessageEmpty } from '@/components/feedbacks/MessageEmpty';
import { useAuth } from '@/context/AuthContext';

const AdminListUsersPage = () => {
  const methods = useForm();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const { dataListUsers, handleFilter, role } = useUsers();
  const [typeUser, setTypeUser] = useState<'trainer' | 'admin'>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const typeUser = window.location.pathname.split('/')[1];
      setTypeUser(typeUser as 'trainer' | 'admin');
      handleFilter(typeUser === 'trainer' ? 'student' : 'trainer');
    }
  }, []);

  return (
    <>
      <Header />

      <Stack p={6} gap={6}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mb={6}
          width={{ md: '90%', lg: '90%' }}
          margin={'10px auto'}
          flexWrap={{
            base: 'wrap',
            md: 'nowrap',
          }}
        >
          <Heading size="lg">Usuários</Heading>
          <HStack
            gap={4}
            justifyContent={'center'}
            alignItems={'flex-end'}
            flexDir={{
              base: 'column',
              md: 'row',
            }}
          >
            {typeUser === 'admin' ? (
              <FormProvider {...methods}>
                <BaseSelect
                  size="sm"
                  maxW={{
                    md: '200px',
                    lg: '200px',
                    sm: 'full',
                  }}
                  name="role"
                  label="Tipo de Usuário"
                  value={role}
                  onChange={(e) => handleFilter(e.target.value as 'student' | 'trainer')}
                  options={[
                    { label: 'Professor', value: 'trainer' },
                    { label: 'Aluno', value: 'student' },
                  ]}
                />
              </FormProvider>
            ) : null}
            <Button
              size="sm"
              colorScheme="green"
              variant="solid"
              width={'300px'}
              onClick={() =>
                router.push(
                  `/${currentUser?.role}/users/new?role=${role === 'student' ? 'student' : 'trainer'}`,
                )
              }
            >
              <span>Cadastrar {role === 'student' ? 'aluno' : 'professor'}</span>
            </Button>
          </HStack>
        </HStack>

        <Table
          variant="simple"
          size="sm"
          maxWidth={{ md: '90%', lg: '90%' }}
          m={'auto'}
          overflowX={{ sm: 'auto' }}
          minWidth={{
            md: '800px',
            lg: '800px',
          }}
        >
          <TableHeader
            columns={[
              { name: 'name', label: 'Nome' },
              { name: 'username', label: 'Usuário', responsive: true },
              { name: 'role', label: 'Tipo', responsive: true },
              { name: 'status', label: 'Status' },
              { name: 'actions', label: 'Ações' },
            ]}
          />

          <Tbody>
            {dataListUsers?.length &&
              dataListUsers?.map((user: UserDTO, index: number) => (
                <TableBody index={index} key={user?.id} user={user} />
              ))}
          </Tbody>
        </Table>

        {dataListUsers?.length === 0 ? (
          <HStack w={'full'}>
            <MessageEmpty width="100%" message="Nenhum usuario encontrado." />
          </HStack>
        ) : null}
      </Stack>
    </>
  );
};

export default withAuthAdmin(AdminListUsersPage);

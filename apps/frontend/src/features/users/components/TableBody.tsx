import { Button, HStack, IconButton, Td, Text, Tooltip, Tr, VStack } from '@chakra-ui/react';
import { UserDTO, UserRole, UserStatus } from '@shared/types';
import { DeleteIcon, EditIcon, InfoIcon, ViewIcon } from '@chakra-ui/icons';
import { BaseToggle } from '@/components/inputs/BaseToggle';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { BaseModal } from '@/components/modals/BaseModal';
import { useUsers } from '../hooks/useUsers';
import { UserForm } from './UserForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface TableBodyProps {
  user: UserDTO;
  index: number;
}

export const TableBody = ({ user, index }: TableBodyProps) => {
  const { user: currentUser } = useAuth();
  const router = useRouter();
  const { handleToggleStatus, handleUpdateUser, handleDeleteUser } = useUsers();
  const [isShowModal, setIsShowModal] = useState({
    edit: false,
    delete: false,
  });
  const methods = useForm();
  const USER_STATUS = {
    ACTIVE: 'Ativo',
    INACTIVE: 'Inativo',
  };
  const USER_ROLE = {
    ADMIN: 'Admin',
    TRAINER: 'Professor',
    STUDENT: 'Aluno',
  };

  const handleCloseModal = () => {
    setIsShowModal({ ...isShowModal, delete: false, edit: false });
  };

  const renderContentModal = (type: 'edit' | 'delete') => {
    if (type === 'edit')
      return (
        <UserForm
          isEdit={true}
          defaultValues={{
            name: user?.name,
            username: user?.username,
            role: user?.role,
          }}
          onClose={() => handleCloseModal()}
          onSubmit={(formData) => {
            handleUpdateUser({ ...formData, id: user?.id as string });
          }}
          isSubmitting={false}
        />
      );
    if (type === 'delete')
      return (
        <VStack
          spacing={4}
          align="center"
          width={'100%'}
          m={'auto'}
          maxW={'600px'}
          my={8}
          justifyContent={'center'}
        >
          <Text mb={4} fontSize="md" color="gray.700" textAlign="center">
            Tem certeza que deseja excluir?
          </Text>
          <HStack w={'100%'} justifyContent={'center'} gap={4}>
            <Button colorScheme="red" onClick={() => handleDeleteUser(user?.id as string)}>
              Sim
            </Button>
            <Button onClick={() => handleCloseModal()}>Não</Button>
          </HStack>
        </VStack>
      );
  };

  return (
    <>
      <BaseModal
        isOpen={isShowModal.edit || isShowModal.delete}
        onClose={() => handleCloseModal()}
        title={isShowModal.edit ? 'Editar Usuário' : 'Excluir Usuário'}
        description={isShowModal?.edit ? 'Preencha os dados abaixo' : ''}
        showFooter={false}
      >
        {renderContentModal(isShowModal.edit ? 'edit' : 'delete')}
      </BaseModal>
      <FormProvider {...methods}>
        <Tr
          key={user?.id}
          bg={index % 2 === 0 ? 'gray.50' : 'gray.100'}
          // bg={user?.status === UserStatus.ACTIVE ? 'teal.50' : 'red.50'}
          _hover={{
            bg: 'gray.200',
          }}
        >
          <Td>{user?.name}</Td>
          <Td display={{ base: 'none', md: 'table-cell' }}>{user?.username}</Td>
          <Td display={{ base: 'none', md: 'table-cell' }}>
            {USER_ROLE[user?.role.toUpperCase() as keyof typeof USER_ROLE]}
          </Td>
          <Td>
            <HStack>
              <BaseToggle
                name="status"
                label={USER_STATUS[user?.status.toUpperCase() as keyof typeof USER_STATUS]}
                isChecked={user?.status === UserStatus.ACTIVE}
                onChange={(e) => handleToggleStatus(user?.id as string)}
              />
            </HStack>
          </Td>
          <Td>
            <HStack>
              <Tooltip label="Editar">
                <IconButton
                  aria-label="Edit"
                  size="sm"
                  onClick={() => setIsShowModal({ ...isShowModal, edit: true })}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              {currentUser?.role === UserRole.ADMIN ? (
                <Tooltip label="Excluir">
                  <IconButton
                    aria-label="Delete"
                    size="sm"
                    onClick={() => setIsShowModal({ ...isShowModal, delete: true })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
              {user?.role === UserRole.STUDENT ? (
                <Tooltip label="Detalhes">
                  <IconButton
                    aria-label="Details"
                    size="sm"
                    onClick={() =>
                      router.push(`/${currentUser?.role}/users/evaluations?studentId=${user?.id}`)
                    }
                  >
                    <ViewIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
            </HStack>
          </Td>
        </Tr>
      </FormProvider>
    </>
  );
};

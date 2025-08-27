'use client';
import { REACT_QUERY_KEYS } from '@/const';
import { queryClient } from '@/lib/queryClient';
import { createUser } from '@/services/users/createUser';
import { useListUsers } from '@/services/users/listUsers';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { CreateUserInput } from '../../../../../../packages/shared/src/validations/create-user';
import { IPropsErrosRequest } from '@/interface/errors-request';
import { backendMessagesConvert } from '@/utils/backendMessageConvert';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { toggleStatus } from '@/services/users/toggleStatus';
import { editUser } from '@/services/users/editUser';
import { UpdateUserInput } from '../../../../../../packages/shared/src/validations/update-user';
import { deleteUser } from '@/services/users/deleteUser';

export function useUsers() {
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'trainer'>('trainer');
  const [username, setUsername] = useState<string>();
  const { data: dataListUsers } = useListUsers({ role, username });
  const { mutate: mutateDeleteUser } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('Usuário deletado com sucesso');
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.screens.users.list],
        exact: false,
      });
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message)
        toast.error(backendMessagesConvert(error?.response?.data?.message));
      else toast.error(error?.message);
    },
  });
  const { mutate: mutateToggleStatus } = useMutation({
    mutationFn: toggleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.screens.users.list],
        exact: false,
      });
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message)
        toast.error(backendMessagesConvert(error?.response?.data?.message));
      else toast.error(error?.message);
    },
  });
  const { mutate: mutateEditUser, isPending: isLoadingEditUser } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      toast.success('Usuário atualizado com sucesso');
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.screens.users.list],
        exact: false,
      });
      setRole('trainer');
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message)
        toast.error(backendMessagesConvert(error?.response?.data?.message));
      else toast.error(error?.message);
    },
  });
  const { mutate: mutateCreateUser, isPending: isLoadingCreateUser } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('Usuário cadastrado com sucesso');
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.screens.users.list],
        exact: false,
      });
      setRole('trainer');
      setTimeout(() => {
        const typeUser = window.location.pathname.split('/')[1];
        router.push(`/${typeUser}/users`);
      }, 2000);
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message)
        toast.error(backendMessagesConvert(error?.response?.data?.message));
      else toast.error(error?.message);
    },
  });

  const handleFilter = (role: 'student' | 'trainer') => {
    setRole(role);
    queryClient.invalidateQueries({
      queryKey: [REACT_QUERY_KEYS.screens.users.list],
      exact: false,
    });
  };

  const handleCreateUser = ({ name, username, password }: CreateUserInput) => {
    mutateCreateUser({ name, username, password, role });
  };

  const handleToggleStatus = (id: string) => {
    mutateToggleStatus(id);
  };

  const handleUpdateUser = ({ username, password, role, id }: UpdateUserInput & { id: string }) => {
    mutateEditUser({ username, password, role, id });
  };

  const handleDeleteUser = (id: string) => {
    mutateDeleteUser(id);
  };

  return {
    dataListUsers,
    setRole,
    role,
    username,
    setUsername,
    handleFilter,
    handleCreateUser,
    isLoadingCreateUser,
    handleToggleStatus,
    handleUpdateUser,
    handleDeleteUser,
  };
}

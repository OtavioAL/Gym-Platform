import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { MINUTE, REACT_QUERY_KEYS } from '../../const';

interface IPropsRequest {
  username?: string;
  role?: string;
}

export async function listUsers({ role, username }: IPropsRequest) {
  const { data } = await api.get(
    `/users${role ? `?role=${role}` : ''}${username ? `?username=${username}` : ''}`,
  );

  return data;
}

export function useListUsers({ role, username }: IPropsRequest) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.screens.users.list, { role, username }],
    queryFn: () => listUsers({ role, username }),
    enabled: true,
    staleTime: MINUTE * 3,
  });
}

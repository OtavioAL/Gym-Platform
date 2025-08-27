import { AuthResponse } from '../../features/auth/types';
import api from '../../lib/api';

type UserProps = {
  username: string;
  password: string;
};

export async function login({ username, password }: UserProps): Promise<AuthResponse> {
  const response = await api.post('/auth/login', {
    username,
    password,
  });

  return response.data;
}

import { CreateUserInput } from '../../../../../packages/shared/src/validations/create-user';
import api from '../../lib/api';

export async function createUser({ name, username, password, role }: CreateUserInput) {
  const { data } = await api.post('/users', { name, username, password, role });
  return data;
}

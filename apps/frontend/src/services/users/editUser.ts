import { UpdateUserInput } from '../../../../../packages/shared/src/validations/update-user';
import api from '../../lib/api';

export async function editUser({
  username,
  password,
  role,
  id,
  name,
}: UpdateUserInput & { id: string }) {
  const { data } = await api.put(`/users/${id}`, { name, username, password, role });
  return data;
}

import api from '@/lib/api';

export function deleteUser(id: string) {
  return api.delete(`/users/${id}`);
}

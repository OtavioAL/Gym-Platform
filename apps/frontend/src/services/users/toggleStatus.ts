import api from '@/lib/api';

export async function toggleStatus(id: string) {
  const { data } = await api.patch(`/users/${id}/status`);
  return data;
}

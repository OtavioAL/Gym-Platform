import { UpdateEvalInput } from '@shared/validations/update-evaluations';
import api from '../../lib/api';

export async function editEvaluation({
  id,
  userId,
  height,
  weight,
}: UpdateEvalInput & { id: string }) {
  const { data } = await api.put(`/evaluations/${id}`, { userId, height, weight });
  return data;
}

import api from '@/lib/api';

export function deleteEvaluation(id: string) {
  return api.delete(`/evaluations/${id}`);
}

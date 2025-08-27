import api from '../../lib/api';

interface IPropsRequest {
  userId: string;
  height: number;
  weight: number;
}
export async function createEvaluations({ userId, height, weight }: IPropsRequest) {
  const { data } = await api.post('/evaluations', { userId, height, weight });
  return data;
}

import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { MINUTE, REACT_QUERY_KEYS } from '../../const';

export async function meEvaluations() {
  const { data } = await api.get(`/evaluations/me`);

  return data;
}

export function useMeEvaluations({ enabled = false }: { enabled: boolean }) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.screens.evaluations.list],
    queryFn: () => meEvaluations(),
    enabled,
    staleTime: MINUTE * 3,
  });
}

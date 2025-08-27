import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { MINUTE, REACT_QUERY_KEYS } from '../../const';

interface IPropsRequest {
  studentId?: string;
  evaluatorId?: string;
}

export async function listEvaluations({ studentId, evaluatorId }: IPropsRequest) {
  const { data } = await api.get(
    `/evaluations${studentId ? `?studentId=${studentId}` : ''}${evaluatorId ? `?evaluatorId=${evaluatorId}` : ''}`,
  );

  return data;
}

export function useListEvaluations({ studentId, evaluatorId }: IPropsRequest) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.screens.evaluations.list, { studentId, evaluatorId }],
    queryFn: () => listEvaluations({ studentId, evaluatorId }),
    enabled: true,
    staleTime: MINUTE * 3,
  });
}

import { useMutation } from '@tanstack/react-query';
import { useListEvaluations } from '../../services/evaluations/listEvaluations';
import { toast } from 'react-toastify';
import { backendMessagesConvert } from '../../utils/backendMessageConvert';
import { IPropsErrosRequest } from '../../interface/errors-request';
import { createEvaluations } from '../../services/evaluations/createEvaluations';
import { queryClient } from '../../lib/queryClient';
import { REACT_QUERY_KEYS } from '../../const';
import { useListUsers } from '@/services/users/listUsers';
import { mapUsersToOptions } from '@/utils/mapUsersToOptions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteEvaluation } from '@/services/evaluations/deleteEvaluation';
import { editEvaluation } from '@/services/evaluations/editEvaluations';
import { UpdateEvalInput } from '@shared/validations/update-evaluations';

export function useEvaluations() {
  const { data: dataListUsers } = useListUsers({ role: 'student', username: undefined });
  const [studentId, setStudentId] = useState<string>();
  const [evaluatorId, setEvaluatorId] = useState<string>();
  const { data: dataListEvaluations } = useListEvaluations({ studentId, evaluatorId });
  const router = useRouter();

  const { mutate: mutateDeleteEvaluation } = useMutation({
    mutationFn: deleteEvaluation,
    onSuccess: () => {
      toast.success('Avaliação deletada com sucesso');
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.screens.evaluations.list],
      });
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message)
        toast.error(backendMessagesConvert(error?.response?.data?.message));
      else toast.error(error?.message);
    },
  });

  const { mutate: mutateEditEvaluation } = useMutation({
    mutationFn: editEvaluation,
    onSuccess: () => {
      toast.success('Avaliação editada com sucesso');
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.screens.evaluations.list],
      });
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message)
        toast.error(backendMessagesConvert(error?.response?.data?.message));
      else toast.error(error?.message);
    },
  });

  const { mutate: mutateCreateEvaluations, isPending: isLoadingCreateEvaluations } = useMutation({
    mutationFn: createEvaluations,
    onSuccess: () => {
      toast.success('Avaliação criada com sucesso');
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.screens.evaluations.list],
      });
      setTimeout(() => {
        const type = window.location.pathname.split('/')[1];

        router.push(`/${type}/users/evaluations`);
      });
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message)
        toast.error(backendMessagesConvert(error?.response?.data?.message));
      else toast.error(error?.message);
    },
  });

  const handleListEvaluations = ({
    studentId,
    evaluatorId,
  }: {
    studentId?: string;
    evaluatorId?: string;
  }) => {
    setStudentId(studentId);
    setEvaluatorId(evaluatorId);
    queryClient.invalidateQueries({
      queryKey: [REACT_QUERY_KEYS.screens.evaluations.list, { studentId, evaluatorId }],
      exact: false,
    });
  };

  const handleCreateEvaluations = ({
    userId,
    height,
    weight,
  }: {
    userId: string;
    height: number;
    weight: number;
  }) => {
    mutateCreateEvaluations({
      userId,
      height,
      weight,
    });
  };

  const handleDeleteEvaluation = (id: string) => {
    mutateDeleteEvaluation(id);
  };

  const handleEditEvaluation = ({
    id,
    userId,
    height,
    weight,
  }: UpdateEvalInput & { id: string }) => {
    mutateEditEvaluation({
      id,
      userId,
      height,
      weight,
    });
  };

  return {
    handleListEvaluations,
    handleCreateEvaluations,
    handleDeleteEvaluation,
    handleEditEvaluation,
    isLoadingCreateEvaluations,
    dataEvaluations: dataListEvaluations,
    optionsListStudents: mapUsersToOptions(dataListUsers),
  };
}

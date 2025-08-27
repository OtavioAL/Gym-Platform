import { MessageEmpty } from '@/components/feedbacks/MessageEmpty';
import { TableBody } from '@/features/evaluations/components/TableBody';
import { TableHeader } from '@/features/evaluations/components/TableHeader';
import { useMeEvaluations } from '@/services/evaluations/meEvaluations';
import { Heading, Stack, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { Evaluation } from '@shared/types';

const StudentDashboardPage = () => {
  const { data: dataEvaluations } = useMeEvaluations({ enabled: true });

  return (
    <>
      <Stack p={6} gap={6} w={'full'}>
        <Heading size="lg">Minhas avaliações</Heading>

        <Table size="sm" variant="simple" maxWidth={{ md: '90%', lg: '90%' }} m={'auto'}>
          <TableHeader
            columns={[
              { name: 'student', label: 'Aluno' },
              { name: 'evaluator', label: 'Avaliador' },
              { name: 'height', label: 'Altura' },
              { name: 'weight', label: 'Peso' },
              { name: 'bmi', label: 'IMC' },
              { name: 'classification', label: 'Classificação' },
              { name: 'createdAt', label: 'Data' },
            ]}
          />
          <Tbody>
            {dataEvaluations?.length ? (
              dataEvaluations?.map((evaluation: Evaluation) => (
                <TableBody
                  isDisabledActions
                  key={evaluation?.id}
                  evaluation={evaluation}
                  index={0}
                />
              ))
            ) : (
              <Tr>
                <Td colSpan={8}>
                  <MessageEmpty message="Nenhuma avaliação encontrada." />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Stack>
    </>
  );
};

export default StudentDashboardPage;

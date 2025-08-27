'use client';
import { withAuthAdmin } from '@/hoc/withAuthAdmin';
import { useEvaluations } from './hook';
import { Button, Heading, HStack, Stack, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { Evaluation } from '@shared/types';
import Header from '@/components/Header';
import { MessageEmpty } from '@/components/feedbacks/MessageEmpty';
import { useRouter } from 'next/navigation';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';
import { FormProvider, useForm } from 'react-hook-form';
import { BaseSelect } from '@/components/inputs/BaseSelect';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ListEvaluationsPage = () => {
  const {
    dataEvaluations,
    optionsListStudents,
    handleListEvaluations,
    studentId: studentIdSelected,
  } = useEvaluations();
  const router = useRouter();
  const methods = useForm();
  const searchParams = useSearchParams();
  const { user: currentUser } = useAuth();

  const studentId = searchParams.get('studentId');

  useEffect(() => {
    if (studentId?.length) {
      handleListEvaluations({ studentId });
    }
  }, [studentId]);

  return (
    <>
      <Header />
      <Stack p={6} gap={6} w={'full'}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mb={6}
          width={{ md: '90%', lg: '90%' }}
          margin={'10px auto'}
          flexWrap={{
            base: 'wrap',
            md: 'nowrap',
          }}
        >
          <Heading size="lg">Avaliações de IMC</Heading>

          <HStack gap={4} justifyContent={'center'} alignItems={'flex-end'}>
            <FormProvider {...methods}>
              <BaseSelect
                name="userId"
                label="Aluno"
                value={studentIdSelected}
                onChange={(e) => handleListEvaluations({ studentId: e.target.value as string })}
                options={optionsListStudents}
              />
            </FormProvider>
            <Button
              size="sm"
              colorScheme="green"
              variant="solid"
              width={'300px'}
              onClick={() => router.push(`/${currentUser?.role}/users/evaluations/new`)}
            >
              <span>Nova avaliação</span>
            </Button>
          </HStack>
        </HStack>
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
              { name: 'actions', label: 'Ações' },
            ]}
          />
          <Tbody>
            {dataEvaluations?.length ? (
              dataEvaluations?.map((evaluation: Evaluation) => (
                <TableBody key={evaluation?.id} evaluation={evaluation} index={0} />
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

export default withAuthAdmin(ListEvaluationsPage);

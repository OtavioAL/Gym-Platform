import Header from '@/components/Header';
import { withAuthAdmin } from '@/hoc/withAuthAdmin';
import { Heading, VStack } from '@chakra-ui/react';
import { EvaluationForm } from './components/EvaluationForm';
import { useEvaluations } from './hook';
import { CreateEvalInput } from '@shared/validations/create-evaluations';

const CreateEvaluationsPage = () => {
  const { handleCreateEvaluations, isLoadingCreateEvaluations, optionsListStudents } =
    useEvaluations();

  return (
    <>
      <Header />

      <VStack spacing={4} alignItems="flex-start" width={'100%'} m={'auto'} maxW={'600px'} my={8}>
        <Heading size="lg">Criar nova avaliação</Heading>
        <VStack spacing={4} alignItems="flex-start" width={'100%'} m={'auto'} maxW={'600px'} my={8}>
          <EvaluationForm
            onSubmit={(data) => {
              console.log('dara', data);
              handleCreateEvaluations(data as CreateEvalInput);
            }}
            isSubmitting={isLoadingCreateEvaluations}
            submitText="Criar avaliação"
            optionsStudents={optionsListStudents}
          />
        </VStack>
      </VStack>
    </>
  );
};

export default withAuthAdmin(CreateEvaluationsPage);

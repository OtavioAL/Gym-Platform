import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, Td, Text, Tooltip, Tr, VStack } from '@chakra-ui/react';
import { Evaluation, UserRole } from '@shared/types';
import dayjs from 'dayjs';
import { useState } from 'react';
import { EvaluationForm } from './EvaluationForm';
import { useEvaluations } from '../hook';
import { useAuth } from '@/context/AuthContext';
import { BaseModal } from '@/components/modals/BaseModal';

interface TableBodyProps {
  evaluation: Evaluation;
  index: number;
}

export const TableBody = ({ evaluation, index }: TableBodyProps) => {
  const { handleDeleteEvaluation, handleEditEvaluation } = useEvaluations();
  const { user: currentUser } = useAuth();
  const [isShowModal, setIsShowModal] = useState({
    edit: false,
    delete: false,
  });
  const BMI_CLASSIFICATION = {
    underweight: 'Abaixo do peso',
    normal_weight: 'Peso normal',
    overweight: 'Sobrepeso',
    obesity_class_1: 'Obesidade grau 1',
    obesity_class_2: 'Obesidade grau 2',
    obesity_class_3: 'Obesidade grau 3',
  };

  const handleCloseModal = () => {
    setIsShowModal({ ...isShowModal, delete: false, edit: false });
  };

  const renderContentModal = (type: 'edit' | 'delete') => {
    if (type === 'edit')
      return (
        <EvaluationForm
          optionsStudents={[]}
          isEdit={true}
          defaultValues={{
            height: evaluation?.height,
            weight: evaluation?.weight,
            userId: evaluation?.student?.id,
          }}
          onClose={() => handleCloseModal()}
          onSubmit={(formData) =>
            handleEditEvaluation({ ...formData, id: evaluation?.id as string })
          }
          isSubmitting={false}
        />
      );
    if (type === 'delete')
      return (
        <VStack
          spacing={4}
          align="center"
          width={'100%'}
          m={'auto'}
          maxW={'600px'}
          my={8}
          justifyContent={'center'}
        >
          <Text mb={4} fontSize="md" color="gray.700" textAlign="center">
            Tem certeza que deseja excluir?
          </Text>
          <HStack w={'100%'} justifyContent={'center'} gap={4}>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteEvaluation(evaluation?.id as string)}
            >
              Sim
            </Button>
            <Button onClick={() => handleCloseModal()}>Não</Button>
          </HStack>
        </VStack>
      );
  };

  return (
    <>
      <BaseModal
        isOpen={isShowModal.edit || isShowModal.delete}
        onClose={() => handleCloseModal()}
        title={isShowModal.edit ? 'Editar avaliação' : 'Excluir avaliação'}
        description={isShowModal?.edit ? 'Preencha os dados abaixo' : ''}
        showFooter={false}
      >
        {renderContentModal(isShowModal.edit ? 'edit' : 'delete')}
      </BaseModal>
      <Tr
        key={evaluation?.id}
        bg={index % 2 === 0 ? 'gray.50' : 'gray.100'}
        _hover={{
          bg: 'gray.200',
        }}
      >
        <Td>{evaluation?.student.name}</Td>
        <Td>{evaluation?.evaluator?.name}</Td>
        <Td>{evaluation?.height?.toFixed(2)} m</Td>
        <Td>{evaluation?.weight?.toFixed(1)} kg</Td>
        <Td>{evaluation?.bmi?.toFixed(1)}</Td>
        <Td>
          {BMI_CLASSIFICATION[evaluation?.classification?.label as keyof typeof BMI_CLASSIFICATION]}
        </Td>
        <Td>{dayjs(evaluation?.createdAt).format('DD/MM/YYYY')}</Td>
        <Td>
          <HStack>
            <Tooltip label="Editar">
              <IconButton
                aria-label="Edit"
                size="sm"
                onClick={() => setIsShowModal({ ...isShowModal, edit: true })}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            {currentUser?.role === UserRole?.ADMIN ? (
              <Tooltip label="Excluir">
                <IconButton
                  aria-label="Delete"
                  size="sm"
                  onClick={() => setIsShowModal({ ...isShowModal, delete: true })}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </HStack>
        </Td>
      </Tr>
    </>
  );
};

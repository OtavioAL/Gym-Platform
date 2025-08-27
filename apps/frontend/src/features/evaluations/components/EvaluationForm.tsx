import { BaseSelect } from '@/components/inputs/BaseSelect';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEvalInput, createEvalSchema } from '@shared/validations/create-evaluations';
import { UpdateEvalInput, updateEvalSchema } from '@shared/validations/update-evaluations';
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
  defaultValues?: Partial<CreateEvalInput | UpdateEvalInput>;
  onSubmit: (data: CreateEvalInput | UpdateEvalInput) => void;
  isSubmitting?: boolean;
  submitText?: string;
  isEdit?: boolean;
  onClose?: () => void;
  optionsStudents: { value: string; label: string }[];
};

export const EvaluationForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitText = 'Salvar',
  isEdit = false,
  onClose,
  optionsStudents = [],
}: Props) => {
  const schema = isEdit ? updateEvalSchema : createEvalSchema;

  const methods = useForm<CreateEvalInput | UpdateEvalInput>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack gap={4}>
          {isEdit ? null : (
            <BaseSelect
              name="userId"
              label="Aluno"
              value={methods.watch('userId')}
              onChange={(e) => methods.setValue('userId', e.target.value as string)}
              options={optionsStudents}
            />
          )}

          <FormControl isInvalid={!!methods.formState.errors.height}>
            <FormLabel>Altura (m)</FormLabel>
            <Input
              type="number"
              step="0.01"
              {...methods.register('height', { valueAsNumber: true })}
            />
            <FormErrorMessage>{methods.formState.errors.height?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!methods.formState.errors.weight}>
            <FormLabel>Peso (kg)</FormLabel>
            <Input
              type="number"
              step="0.1"
              {...methods.register('weight', { valueAsNumber: true })}
            />
            <FormErrorMessage>{methods.formState.errors.weight?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
            {submitText}
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

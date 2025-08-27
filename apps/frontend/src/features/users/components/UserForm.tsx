'use client';

import { Stack, Button, VStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseInput } from '@/components/inputs/BaseInput';
import { BaseSelect } from '@/components/inputs/BaseSelect';
import {
  CreateUserInput,
  createUserSchema,
} from '../../../../../../packages/shared/src/validations/create-user';
import { useEffect } from 'react';
import { UpdateUserInput, updateUserSchema } from '@shared/validations/update-user';

type Props = {
  defaultValues?: Partial<CreateUserInput | UpdateUserInput>;
  onSubmit: (data: CreateUserInput | UpdateUserInput) => void;
  isSubmitting?: boolean;
  submitText?: string;
  isEdit?: boolean;
  onClose?: () => void;
};

export const UserForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitText = 'Salvar',
  isEdit = false,
  onClose,
}: Props) => {
  const schema = isEdit ? updateUserSchema : createUserSchema;

  const methods = useForm<CreateUserInput | UpdateUserInput>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <VStack spacing={4} align="stretch">
          <BaseInput name="name" label="Nome" />
          <BaseInput name="username" label="Usuário" />
          {!isEdit ? <BaseInput name="password" label="Senha" type="password" /> : null}
          <BaseSelect
            name="role"
            label="Tipo de Usuário"
            value={methods.watch('role')}
            onChange={(e) => methods.setValue('role', e.target.value as 'student' | 'trainer')}
            options={[
              { label: 'Professor', value: 'trainer' },
              { label: 'Aluno', value: 'student' },
            ]}
          />

          <Stack direction="row" justifyContent="end">
            {isEdit ? (
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancelar
              </Button>
            ) : null}
            <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
              {submitText}
            </Button>
          </Stack>
        </VStack>
      </form>
    </FormProvider>
  );
};

'use client';

import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type BaseInputProps = {
  name: string;
  label: string;
} & InputProps;

export const BaseInput = ({ name, label, ...rest }: BaseInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} {...register(name)} {...rest} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

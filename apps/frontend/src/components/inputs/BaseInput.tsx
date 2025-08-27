'use client';

import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type BaseInputProps = {
  name: string;
  label: string;
  register: any;
} & InputProps;

export const BaseInput = ({ name, label, register, ...rest }: BaseInputProps) => {
  const {
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

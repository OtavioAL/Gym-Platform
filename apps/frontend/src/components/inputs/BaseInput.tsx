'use client';

import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from '@chakra-ui/react';

type BaseInputProps = {
  name: string;
  label: string;
  register: any;
  error: any;
} & InputProps;

export const BaseInput = ({ name, label, register, error, ...rest }: BaseInputProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} {...register(name)} {...rest} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

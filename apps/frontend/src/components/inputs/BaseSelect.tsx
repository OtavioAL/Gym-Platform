'use client';

import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from '@chakra-ui/react';
import { useFormContext, Controller } from 'react-hook-form';

type Option = {
  label: string;
  value: string | number;
};

type BaseSelectProps = {
  name: string;
  label: string;
  defaultValue?: string;
  options: Option[];
} & SelectProps;

export const BaseSelect = ({ name, label, options, defaultValue, ...rest }: BaseSelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field} {...rest}>
            <option value="">Selecione</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        )}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

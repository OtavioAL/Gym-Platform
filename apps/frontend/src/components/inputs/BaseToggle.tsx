'use client';

import {
  FormControl,
  FormLabel,
  Switch,
  FormErrorMessage,
  HStack,
  SwitchProps,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

type BaseToggleProps = {
  name: string;
  label: string;
} & SwitchProps;

export const BaseToggle = ({ name, label, ...rest }: BaseToggleProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <FormControl display="flex" alignItems="center" isInvalid={!!error}>
      <HStack spacing={4}>
        <FormLabel htmlFor={name} mb="0" cursor="pointer">
          {label}
        </FormLabel>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange, ref } }) => (
            <Switch
              value={value}
              id={name}
              isChecked={value}
              onChange={(e) => onChange(e.target.checked)}
              ref={ref}
              {...rest}
            />
          )}
        />
      </HStack>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

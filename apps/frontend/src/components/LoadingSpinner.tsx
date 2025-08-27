'use client';
import { Spinner, Center, Box, SpinnerProps } from '@chakra-ui/react';

type LoadingSpinnerProps = {
  fullScreen?: boolean;
} & SpinnerProps;

export const LoadingSpinner = ({ fullScreen = false, ...rest }: LoadingSpinnerProps) => {
  if (fullScreen) {
    return (
      <Center h="100vh" w="100vw">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" {...rest} />
      </Center>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={8}>
      <Spinner size="lg" color="blue.500" {...rest} />
    </Box>
  );
};

'use client';

import { Box, Center, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface EmptyMessageProps {
  message?: string;
  icon?: ReactNode;
  width?: string;
}

export const MessageEmpty = ({
  message = 'Nenhum item encontrado.',
  icon = <InfoOutlineIcon boxSize={6} color="gray.400" />,
  ...props
}: EmptyMessageProps) => {
  return (
    <Center
      py={10}
      px={4}
      flexDirection="column"
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.100"
      {...props}
    >
      <Box mb={3}>{icon}</Box>
      <Text color="gray.500" fontSize="sm" textAlign="center">
        {message}
      </Text>
    </Center>
  );
};

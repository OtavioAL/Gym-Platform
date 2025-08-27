'use client';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { signOut } = useAuth();

  return (
    <Box bg="white" px={4} boxShadow="sm" position="sticky" top={0} zIndex={1000}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" color="teal.500">
          Gym Platform
        </Text>

        <Flex alignItems="center">
          <Button colorScheme="teal" size="sm" onClick={signOut}>
            Sair
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

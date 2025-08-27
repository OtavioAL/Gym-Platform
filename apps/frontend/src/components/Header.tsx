'use client';
import { ReactNode } from 'react';
import { Box, Flex, IconButton, Button, useDisclosure, Text } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { signOut } = useAuth();

  return (
    <Box bg="white" px={4} boxShadow="sm" position="sticky" top={0} zIndex={1000}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" color="teal.500">
          Gym Platform
        </Text>

        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <Flex alignItems="center">
          <Button colorScheme="teal" size="sm" onClick={signOut}>
            Sair
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

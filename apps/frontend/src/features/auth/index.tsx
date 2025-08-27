'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { LoginInput, loginSchema } from '../../../../../packages/shared/src/validations/auth';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const { signIn, isLoadingLogin } = useAuth();

  const onSubmit = async (data: LoginInput) => {
    await signIn(data.username, data.password);
  };

  return (
    <Box minH="100dvh" display="grid" placeItems="center" p={6}>
      <Card w="100%" maxW="420px">
        <CardBody>
          <Heading size="md" mb={6}>
            Entrar
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Usuário</FormLabel>
                <Input {...register('username')} />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Senha</FormLabel>
                <Input type="password" {...register('password')} />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Button colorScheme="blue" w="100%" type="submit" isLoading={isLoadingLogin}>
                Entrar
              </Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}

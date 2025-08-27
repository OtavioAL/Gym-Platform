/**
 * @export
 * @hook
 * @name backendMessagesConvert
 *
 * @description
 * Responsável por controlar e converter para português
 * as mensagens recebidas do back-end.
 */
export const backendMessagesConvert = (translateMessage: string) => {
  const possibleMessages = [
    {
      enUs: 'Height must be greater than zero.',
      ptBr: 'A altura deve ser maior que zero.',
    },
    {
      enUs: 'Weight cannot be negative.',
      ptBr: 'O peso não pode ser negativo.',
    },
    {
      enUs: 'unauthorized',
      ptBr: 'Não autorizado',
    },
    {
      enUs: 'User not found',
      ptBr: 'Usuário não encontrado',
    },
    {
      enUs: 'User has linked reviews',
      ptBr: 'Usuário possui avaliação vinculada',
    },
    {
      enUs: 'Invalid credentials',
      ptBr: 'Credenciais inválidas',
    },
    {
      enUs: 'Invalid token',
      ptBr: 'Token inválido',
    },
    {
      enUs: 'Inactive user',
      ptBr: 'Usuário inativo',
    },
    {
      enUs: 'Expired refresh token',
      ptBr: 'Token de atualização expirado',
    },
    {
      enUs: 'Invalid refresh token',
      ptBr: 'Token de atualização inválido',
    },
    {
      enUs: 'User has linked reviews',
      ptBr: 'Usuário possui avaliação vinculada',
    },
    {
      enUs: 'Student cannot register evaluation',
      ptBr: 'Aluno não pode registrar avaliação',
    },
    {
      enUs: 'Invalid user type',
      ptBr: 'Tipo de usuário inválido',
    },
    {
      enUs: 'Inactive student cannot receive evaluation',
      ptBr: 'Não é possivel avaliar aluno inativo',
    },
    {
      enUs: 'Evaluation not found',
      ptBr: 'Avaliação nao encontrada',
    },
    {
      enUs: 'User already exists',
      ptBr: 'Usuário ja cadastrado',
    },
    {
      enUs: 'Student cannot register evaluation',
      ptBr: 'Aluno não pode registrar avaliação',
    },
    {
      enUs: 'Internal server error',
      ptBr: 'Erro interno do servidor',
    },
    {
      enUs: 'Validation error',
      ptBr: 'Erro de validação',
    },
    {
      enUs: 'invalid token',
      ptBr: 'Token inválido',
    },
  ];

  const messageInPtBr = possibleMessages.find(
    (item: { enUs: string; ptBr: string }) => item.enUs === translateMessage,
  );
  return messageInPtBr?.ptBr ?? translateMessage;
};

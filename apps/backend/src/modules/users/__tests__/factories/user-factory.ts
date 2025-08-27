import { UserRole, UserStatus } from '../../enums';

export const makeFakeUser = () => ({
  id: 'user-123',
  name: 'John Doe',
  username: 'john@example.com',
  password: 'hashed-password',
  role: UserRole.ADMIN,
  status: UserStatus.ACTIVE,
});

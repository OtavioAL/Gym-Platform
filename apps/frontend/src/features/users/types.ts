export type UserRole = 'admin' | 'trainer' | 'student';

export type UserStatus = 'active' | 'inactive';

export type User = {
  id: string;
  name: string;
  role: UserRole;
  status: UserStatus;
};

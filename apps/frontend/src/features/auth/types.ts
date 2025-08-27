import { User } from '../users/types';

export type AuthResponse = {
  accessToken: string;
  user: User;
  refreshToken: string;
};

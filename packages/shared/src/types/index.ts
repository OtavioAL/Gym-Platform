export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserDTO = {
  id: string;
  name: string;
  username: string;
  role: 'admin' | 'trainer' | 'student';
  status: 'active' | 'inactive';
  created_at: Date;
  updated_at: Date;
};

export type Evaluation = {
  id: string;
  height: number;
  weight: number;
  bmi: number;
  createdAt: string;
  classification: { id: number; label: string };
  evaluator: { id: string; name: string };
  student: { id: string; name: string };
};

export enum UserRole {
  ADMIN = 'admin',
  TRAINER = 'trainer',
  STUDENT = 'student',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

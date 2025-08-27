export type UserDTO = {
  id: string;
  name: string;
  username: string;
  role: 'admin' | 'trainer' | 'student';
  status: 'active' | 'inactive';
  created_at: Date;
  updated_at: Date;
};

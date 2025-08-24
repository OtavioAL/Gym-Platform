import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserRole, UserStatus } from '../enums';
import { AppError } from '../../../shared/errors/AppError';
import { CreateUserService } from '../services/CreateUserService';
import { DeleteUserService } from '../services/DeleteUserService';
import { ToggleStatusService } from '../services/ToggleStatusService';
import { UpdateUserService } from '../services/UpdateUserService';

vi.mock('bcryptjs', async () => {
  const actual = await vi.importActual<typeof import('bcryptjs')>('bcryptjs');
  return {
    default: {
      ...actual,
      hash: vi.fn().mockResolvedValue('hashed-password'),
    },
  };
});

const fakeUser = {
  id: 'user-1',
  name: 'John',
  username: 'john@example.com',
  password: 'hashed-password',
  role: UserRole.STUDENT,
  status: UserStatus.ACTIVE,
  created_at: new Date(),
  updated_at: new Date(),
};

describe('User Services', () => {
  let usersRepo: any;

  beforeEach(() => {
    usersRepo = {
      create: vi.fn(),
      delete: vi.fn(),
      save: vi.fn(),
      findById: vi.fn(),
      findByUsername: vi.fn(),
      hasEvaluations: vi.fn(),
    };
  });

  describe('CreateUserService', () => {
    it('should create a user if valid and role is allowed', async () => {
      usersRepo.findByUsername.mockResolvedValue(null);
      usersRepo.create.mockResolvedValue(fakeUser);

      const service = new CreateUserService(usersRepo);
      const result = await service.execute(
        { name: 'John', username: 'john@example.com', password: '123456', role: 'student' },
        UserRole.ADMIN,
      );

      expect(usersRepo.create).toHaveBeenCalled();
      expect(result.email).toBe('john@example.com');
    });

    it('should throw if user already exists', async () => {
      usersRepo.findByUsername.mockResolvedValue(fakeUser);
      const service = new CreateUserService(usersRepo);

      await expect(
        service.execute(
          { name: 'John', username: 'john@example.com', password: '123456', role: 'student' },
          UserRole.ADMIN,
        ),
      ).rejects.toThrow(AppError);
    });

    it('should throw if current user is student', async () => {
      const service = new CreateUserService(usersRepo);

      await expect(
        service.execute(
          { name: 'John', username: 'john@example.com', password: '123456', role: 'student' },
          UserRole.STUDENT,
        ),
      ).rejects.toThrow(AppError);
    });
  });

  describe('DeleteUserService', () => {
    it('should delete user if no evaluations', async () => {
      usersRepo.hasEvaluations.mockResolvedValue(false);
      const service = new DeleteUserService(usersRepo);
      await service.execute('user-1', UserRole.ADMIN);

      expect(usersRepo.delete).toHaveBeenCalledWith('user-1');
    });

    it('should throw if user has evaluations', async () => {
      usersRepo.hasEvaluations.mockResolvedValue(true);
      const service = new DeleteUserService(usersRepo);

      await expect(service.execute('user-1', UserRole.ADMIN)).rejects.toThrow(AppError);
    });

    it('should throw if not admin', async () => {
      const service = new DeleteUserService(usersRepo);

      await expect(service.execute('user-1', UserRole.STUDENT)).rejects.toThrow(AppError);
    });
  });

  describe('ToggleStatusService', () => {
    it('should toggle user status', async () => {
      usersRepo.findById.mockResolvedValue({ ...fakeUser, status: UserStatus.ACTIVE });
      usersRepo.save.mockResolvedValue({ ...fakeUser, status: UserStatus.INACTIVE });

      const service = new ToggleStatusService(usersRepo);
      const result = await service.execute('user-1', UserRole.ADMIN);

      expect(result.status).toBe(UserStatus.INACTIVE);
    });

    it('should throw if not admin', async () => {
      const service = new ToggleStatusService(usersRepo);
      await expect(service.execute('user-1', UserRole.STUDENT)).rejects.toThrow(AppError);
    });
  });

  describe('UpdateUserService', () => {
    it('should update user successfully', async () => {
      usersRepo.findById.mockResolvedValue({ ...fakeUser });
      usersRepo.save.mockResolvedValue({ ...fakeUser, username: 'updated@example.com' });

      const service = new UpdateUserService(usersRepo);
      const result = await service.execute(
        'user-1',
        { username: 'updated@example.com' },
        UserRole.ADMIN,
      );

      expect(result.username).toBe('updated@example.com');
    });

    it('should throw if not found', async () => {
      usersRepo.findById.mockResolvedValue(null);
      const service = new UpdateUserService(usersRepo);

      await expect(
        service.execute('user-1', { username: 'updated@example.com' }, UserRole.ADMIN),
      ).rejects.toThrow(AppError);
    });

    it('should throw if student tries to update', async () => {
      const service = new UpdateUserService(usersRepo);
      await expect(
        service.execute('user-1', { username: 'updated@example.com' }, UserRole.STUDENT),
      ).rejects.toThrow(AppError);
    });
  });
});

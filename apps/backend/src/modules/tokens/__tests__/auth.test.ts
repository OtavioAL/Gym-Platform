import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import bcrypt from 'bcryptjs';
import { UserStatus } from '../../users/enums';
import { AuthenticateService } from '../services/AuthenticateService';
import { AppError } from '../../../shared/errors/AppError';
import * as jwtUtils from '../../../utils/jwt';
import { makeFakeUser } from '../../users/__tests__/factories/user-factory';

const makeUsersRepo = () => ({
  findByUsername: vi.fn(),
});

const makeTokensRepo = () => ({
  createRefresh: vi.fn(),
});

vi.mock('bcryptjs', () => ({
  default: {
    compare: vi.fn(),
  },
}));

vi.mock('../../../utils/jwt', async () => {
  return {
    generateToken: vi.fn(),
    generateRefreshToken: vi.fn(),
    verifyToken: vi.fn(),
  };
});

describe('AuthenticateService', () => {
  let usersRepo: ReturnType<typeof makeUsersRepo>;
  let tokensRepo: ReturnType<typeof makeTokensRepo>;
  let service: AuthenticateService;
  const fakeAccessToken = 'fake-access-token';
  const fakeRefreshToken = 'fake-refresh-token';

  beforeEach(() => {
    usersRepo = makeUsersRepo();
    tokensRepo = makeTokensRepo();
    service = new AuthenticateService(usersRepo as any, tokensRepo as any);

    vi.clearAllMocks();

    (jwtUtils.generateToken as Mock).mockReturnValue(fakeAccessToken);
    (jwtUtils.generateRefreshToken as Mock).mockReturnValue(fakeRefreshToken);
  });

  it('should authenticate a valid user', async () => {
    const user = makeFakeUser();
    usersRepo.findByUsername.mockResolvedValue(user);
    (bcrypt.compare as any).mockResolvedValue(true);

    const result = await service.execute('john@example.com', 'plaintext-password');

    expect(usersRepo.findByUsername).toHaveBeenCalledWith('john@example.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('plaintext-password', user.password);
    expect(jwtUtils.generateToken).toHaveBeenCalledWith({ sub: user.id, role: user.role });
    expect(jwtUtils.generateRefreshToken).toHaveBeenCalledWith({ sub: user.id, role: user.role });
    expect(tokensRepo.createRefresh).toHaveBeenCalled();

    expect(result).toEqual({
      accessToken: fakeAccessToken,
      refreshToken: fakeRefreshToken,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  });

  it('should throw if user does not exist', async () => {
    usersRepo.findByUsername.mockResolvedValue(null);

    await expect(service.execute('john@example.com', '123')).rejects.toThrow(AppError);
  });

  it('should throw if user is inactive', async () => {
    const user = { ...makeFakeUser(), status: UserStatus.INACTIVE };
    usersRepo.findByUsername.mockResolvedValue(user);

    await expect(service.execute('john@example.com', '123')).rejects.toThrow(AppError);
  });

  it('should throw if password does not match', async () => {
    const user = makeFakeUser();
    usersRepo.findByUsername.mockResolvedValue(user);
    (bcrypt.compare as any).mockResolvedValue(false);

    await expect(service.execute('john@example.com', 'wrong-password')).rejects.toThrow(AppError);
  });
});

import { Request, Response } from 'express';

import { CreateUserService } from '../services/CreateUserService';
import { UpdateUserService } from '../services/UpdateUserService';
import { ToggleStatusService } from '../services/ToggleStatusService';
import { DeleteUserService } from '../services/DeleteUserService';
import { createUserSchema } from '@shared/validations/create-user';
import { UsersRepository } from '../repositories/implementations/UsersRepository';
import { updateUserSchema } from '@shared/validations/update-user';
import { UserRole } from '../enums';
import { GetMeService } from '../services/GetMeService';
import { ListUsersService } from '../services/ListUsersService';
import { GetUserService } from '../services/GetUserService';

export class UsersController {
  async create(req: Request, res: Response) {
    const data = createUserSchema.parse(req.body);

    const current = req.user;

    const out = await new CreateUserService(new UsersRepository()).execute(
      data,
      current?.role as UserRole,
    );

    return res.status(201).json(out);
  }
  async update(req: Request, res: Response) {
    const data = updateUserSchema.parse(req.body);

    const current = req.user;

    const out = await new UpdateUserService(new UsersRepository()).execute(
      req.params.id,
      data,
      current?.role as UserRole,
    );

    return res.json(out);
  }
  async toggle(req: Request, res: Response) {
    const current = req.user;

    const out = await new ToggleStatusService(new UsersRepository()).execute(
      req.params.id,
      current?.role as UserRole,
    );

    return res.json(out);
  }
  async remove(req: Request, res: Response) {
    const current = req.user;

    await new DeleteUserService(new UsersRepository()).execute(
      req.params.id,
      current?.role as UserRole,
    );

    return res.status(204).send();
  }

  async me(req: Request, res: Response) {
    const current = req.user;

    const out = await new GetMeService(new UsersRepository()).execute(current?.id as string);

    return res.json(out);
  }

  async list(req: Request, res: Response) {
    const out = await new ListUsersService(new UsersRepository()).execute({
      username: req.query.username as string,
      role: req.query.role as UserRole,
    });

    return res.json(out);
  }

  async get(req: Request, res: Response) {
    const current = req.user;
    const out = await new GetUserService(new UsersRepository()).execute(
      req.params.id,
      current?.role as UserRole,
    );

    return res.json(out);
  }
}

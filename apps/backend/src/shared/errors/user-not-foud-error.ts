import { USER_NOT_FOUND } from './error.messages';

export class UserNotFoundError extends Error {
  constructor() {
    super(USER_NOT_FOUND);
  }
}

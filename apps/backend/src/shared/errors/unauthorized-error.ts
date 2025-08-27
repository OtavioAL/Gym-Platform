import { UNAUTHORIZED } from './error.messages';

export class UnauthorizedError extends Error {
  constructor() {
    super(UNAUTHORIZED);
  }
}

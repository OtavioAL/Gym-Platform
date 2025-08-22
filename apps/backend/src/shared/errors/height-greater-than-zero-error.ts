import { HEIGHT_GREATER_THAN_ZERO } from './error.messages';

export class HeightGreaterThanZeroError extends Error {
  constructor() {
    super(HEIGHT_GREATER_THAN_ZERO);
  }
}

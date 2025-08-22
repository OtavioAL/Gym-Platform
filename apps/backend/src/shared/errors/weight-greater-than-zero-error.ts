import { WEIGHT_GREATER_THAN_ZERO } from './error.messages';

export class WeightGreaterThanZeroError extends Error {
  constructor() {
    super(WEIGHT_GREATER_THAN_ZERO);
  }
}

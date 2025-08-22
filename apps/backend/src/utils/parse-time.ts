/**
 * Converts a time expression like "15m", "7d", "2h", "30s" into milliseconds.
 * @param expression - The time string (e.g., "15m", "1h", "7d").
 * @returns The equivalent duration in milliseconds.
 * @throws If the expression is invalid or unsupported.
 */
export function parseTimeToMilliseconds(expression: string): number {
  const match = expression.match(/^(\d+)([smhd])$/);

  if (!match) {
    throw new Error(
      `Invalid time expression: "${expression}". Use formats like "15m", "2h", "7d", "30s".`,
    );
  }

  const [, amountStr, unit] = match;
  const amount = Number(amountStr);

  const multipliers: Record<string, number> = {
    s: 1000, // seconds
    m: 60_000, // minutes
    h: 3_600_000, // hours
    d: 86_400_000, // days
  };

  const multiplier = multipliers[unit];

  return amount * multiplier;
}

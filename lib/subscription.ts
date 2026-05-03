export type UserTier = 'USER' | 'ADMIN';

/**
 * All countries are now UNLOCKED for all users.
 * The platform is now open-access.
 */
export function isCountryLocked(_countryName: string, _tier?: UserTier): boolean {
  return false;
}

/**
 * Features like Export are now Pay-Per-Use ($1.00).
 * We return false here to ensure the UI is visible and "Open," 
 * but the actual download will trigger a payment modal.
 */
export function isFeatureLocked(_feature: string, _tier?: UserTier): boolean {
  return false;
}

export const DOWNLOAD_FEE = 1.00;

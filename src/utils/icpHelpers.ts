
import { Principal } from '@dfinity/principal';
import { getBackendActor } from '@/services/icpService';

/**
 * Validates an ICP principal ID
 * @param principalId - The principal ID to validate
 * @returns True if valid, false otherwise
 */
export const isValidPrincipalId = (principalId: string): boolean => {
  try {
    // Will throw if invalid
    Principal.fromText(principalId);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Shortens a principal ID for display
 * @param principalId - The principal ID to shorten
 * @param startChars - Number of characters to keep from the start
 * @param endChars - Number of characters to keep from the end
 * @returns Shortened principal ID
 */
export const shortenPrincipalId = (
  principalId: string,
  startChars: number = 5,
  endChars: number = 4
): string => {
  if (!principalId || principalId.length <= startChars + endChars) {
    return principalId;
  }
  return `${principalId.slice(0, startChars)}...${principalId.slice(-endChars)}`;
};

/**
 * Checks if a Digital ID is registered on the IC
 * @returns Promise resolving to boolean indicating if ID exists
 */
export const checkDigitalIdExists = async (): Promise<boolean> => {
  try {
    const actor = await getBackendActor();
    const digitalID = await actor.getDigitalID();
    return digitalID.length > 0;
  } catch (error) {
    console.error("Error checking Digital ID:", error);
    return false;
  }
};

/**
 * Gets ICP network name based on environment
 * @returns Network name
 */
export const getNetworkName = (): string => {
  const network = import.meta.env.VITE_DFX_NETWORK;
  return network === 'ic' ? 'Internet Computer Mainnet' : 'Local Development Network';
};

/**
 * Generates explorer URL for principal
 * @param principalId - The principal ID
 * @returns URL to the IC explorer for this principal
 */
export const getExplorerUrl = (principalId: string): string => {
  return `https://dashboard.internetcomputer.org/account/${principalId}`;
};

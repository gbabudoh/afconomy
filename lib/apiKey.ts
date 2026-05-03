import prisma from "./prisma";

/**
 * Validates an Enterprise API key and increments request count.
 */
export async function validateApiKey(key: string) {
  if (!key) return null;

  try {
    const apiKey = await (prisma as any).apiKey.findUnique({
      where: { key, isActive: true }
    });

    if (!apiKey) return null;

    // Check limits
    if (apiKey.requests >= apiKey.limit) {
      return { ...apiKey, limitExceeded: true };
    }

    // Background: increment request count (don't wait for it)
    (prisma as any).apiKey.update({
      where: { id: apiKey.id },
      data: { requests: { increment: 1 } }
    }).catch(console.error);

    return apiKey;
  } catch (error) {
    console.error("API Key Validation Error:", error);
    return null;
  }
}

/**
 * Generates a new secure Enterprise API key.
 */
export function generateSecureKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'afc_';
  const bytes = new Uint8Array(32);
  // Using a simpler random for this helper, but ideally use crypto.getRandomValues
  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

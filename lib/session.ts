import "server-only";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { SubscriptionTier, UserRole } from "@/generated/prisma/client";

export const SESSION_COOKIE = "afconomy_uid";

const TIER_RANK: Record<SubscriptionTier, number> = {
  FREE: 0,
  PREMIUM: 1,
  ELITE: 2,
};

const ROLE_RANK: Record<UserRole, number> = {
  READER: 0,
  JOURNALIST: 1,
  EDITOR: 2,
  ADMIN: 3,
};

/**
 * Resolves the current user.
 *
 * TODO: replace with a real auth provider (Auth.js, Clerk, …). Until then the
 * user id is read from a plain cookie, and in development we fall back to
 * DEV_USER_EMAIL so the premium/newsroom flows can be exercised locally.
 */
export async function getCurrentUser() {
  const include = { subscription: true, author: true, preferences: true };

  const userId = (await cookies()).get(SESSION_COOKIE)?.value;
  if (userId) {
    return prisma.user.findUnique({ where: { id: userId }, include });
  }

  const devEmail = process.env.DEV_USER_EMAIL;
  if (process.env.NODE_ENV !== "production" && devEmail) {
    return prisma.user.findUnique({ where: { email: devEmail }, include });
  }

  return null;
}

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

/** Effective tier — lapsed or cancelled subscriptions count as FREE. */
export function effectiveTier(user: CurrentUser | null): SubscriptionTier {
  const sub = user?.subscription;
  if (!sub) return "FREE";
  const live = sub.status === "ACTIVE" || sub.status === "TRIALING";
  const unexpired = !sub.currentPeriodEnd || sub.currentPeriodEnd > new Date();
  return live && unexpired ? sub.tier : "FREE";
}

export function hasTier(user: CurrentUser | null, required: SubscriptionTier) {
  return TIER_RANK[effectiveTier(user)] >= TIER_RANK[required];
}

export function hasRole(user: CurrentUser | null, required: UserRole) {
  return !!user && ROLE_RANK[user.role] >= ROLE_RANK[required];
}

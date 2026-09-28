"use server";

import { revalidatePath } from "next/cache";
import type { AlertDelivery } from "@/generated/prisma/client";
import { isAssetClass, isRegion } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

const DELIVERY: Record<string, AlertDelivery> = {
  "terminal-only": "TERMINAL_ONLY",
  sms: "SMS",
  all: "ALL",
};

export async function updateTraderPreferences(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Sign in to save your terminal preferences." };

  const regions = formData.getAll("regions").filter(isRegion);
  const assetClasses = formData.getAll("assets").filter(isAssetClass);
  const delivery = DELIVERY[String(formData.get("delivery"))];

  if (regions.length === 0) return { success: false, error: "Select at least one regional bloc." };
  if (!delivery) return { success: false, error: "Choose a valid alert delivery mode." };

  try {
    await prisma.traderPreference.upsert({
      where: { userId: user.id },
      create: { userId: user.id, regions, assetClasses, delivery },
      update: { regions, assetClasses, delivery },
    });
  } catch (err) {
    console.error("Failed to save trader preferences:", err);
    return { success: false, error: "Could not save preferences. Please try again." };
  }

  revalidatePath("/");
  return { success: true, message: "Terminal filters saved." };
}

"use server";

import { revalidatePath } from "next/cache";
import { isCategory, isRegion } from "@/lib/constants";
import { slugify } from "@/lib/news";
import { prisma } from "@/lib/prisma";
import { indexArticles } from "@/lib/search";
import { getCurrentUser, hasRole } from "@/lib/session";

export type PublishResult =
  | { success: true; message: string; slug: string }
  | { success: false; error: string };

function splitList(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function publishPolicyBrief(formData: FormData): Promise<PublishResult> {
  const user = await getCurrentUser();
  if (!hasRole(user, "JOURNALIST") || !user?.author) {
    return { success: false, error: "Only newsroom staff with an author profile can publish." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const category = formData.get("category");
  const region = formData.get("region");
  const tags = splitList(formData.get("tags"));
  const symbols = splitList(formData.get("symbols")).map((s) => s.toUpperCase());
  const isPremium = formData.get("isPremium") === "on";
  const asDraft = formData.get("intent") === "draft";

  if (!title || !content) return { success: false, error: "Title and content are required." };
  if (!isCategory(category)) return { success: false, error: "Choose a valid category." };
  if (!isRegion(region)) return { success: false, error: "Choose a valid region." };

  const knownAssets = symbols.length
    ? await prisma.financialAsset.findMany({ where: { symbol: { in: symbols } }, select: { symbol: true } })
    : [];
  const unknown = symbols.filter((s) => !knownAssets.some((a) => a.symbol === s));
  if (unknown.length) return { success: false, error: `Unknown ticker(s): ${unknown.join(", ")}` };

  // Suffix the slug if the title collides with an existing article
  let slug = slugify(title);
  if (!slug) return { success: false, error: "Title must contain letters or numbers." };
  if (await prisma.article.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  try {
    const article = await prisma.article.create({
      data: {
        authorId: user.author.id,
        title,
        slug,
        excerpt,
        content,
        category,
        region,
        tags,
        isPremium,
        status: asDraft ? "DRAFT" : "PUBLISHED",
        publishedAt: asDraft ? null : new Date(),
        assets: { create: symbols.map((symbol) => ({ symbol })) },
      },
    });

    if (!asDraft) {
      await indexArticles([
        {
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          region: article.region,
          category: article.category,
          tags: article.tags,
          publishedAt: article.publishedAt!.getTime(),
        },
      ]);
      revalidatePath("/");
      revalidatePath("/news");
    }

    return {
      success: true,
      slug,
      message: asDraft ? "Draft saved." : "Brief published.",
    };
  } catch (err) {
    console.error("Failed to publish article:", err);
    return { success: false, error: "Database error while saving the article." };
  }
}

// ==========================================
// Shared Clerk-id -> internal user id resolution
// ==========================================
// A request's `userId` may be either our own internal database user id,
// or a Clerk id (prefixed "user_") that needs to be resolved via the
// UserAuth table first. This is the same resolution used by
// app/api/products/[category]/[slug]/scan/route.ts and
// app/api/saved-products/route.ts.
// ==========================================

import { prisma } from "@/app/lib/prisma";

export async function resolveUserId(userId: string): Promise<string | null> {
  if (!userId.startsWith("user_")) return userId;
  const authRecord = await prisma.userAuth.findUnique({
    where: { clerkId: userId },
    select: { userId: true },
  });
  return authRecord?.userId ?? null;
}

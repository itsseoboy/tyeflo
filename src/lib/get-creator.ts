import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

/**
 * Reads the signed-in user from Supabase and ensures a row exists in our
 * User table. Template count runs in parallel with the upsert to cut
 * latency. Name is only set at creation - manual changes persist.
 */
export async function getCreator() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const meta = user.user_metadata ?? {};
  const name = (meta.full_name ?? meta.name ?? null) as string | null;
  const avatar = (meta.avatar_url ?? meta.picture ?? null) as string | null;

  // Run both queries concurrently instead of sequentially.
  const [dbUser, templateCount] = await Promise.all([
    db.user.upsert({
      where: { id: user.id },
      update: {
        image: avatar ?? undefined,
      },
      create: {
        id: user.id,
        email: user.email ?? `${user.id}@tyeflo.local`,
        name,
        image: avatar,
      },
    }),
    db.template.count({ where: { creatorId: user.id } }),
  ]);

  return { dbUser, templateCount };
}

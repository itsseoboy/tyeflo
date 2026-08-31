import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

/**
 * Reads the signed-in user from Supabase and makes sure a matching row
 * exists in OUR User table (where points and templates live).
 *
 * Supabase owns the login; we own the creator data. This helper is the
 * bridge between them. Returns null when not signed in.
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

  const dbUser = await db.user.upsert({
    where: { id: user.id },
    update: {
      name: name ?? undefined,
      image: avatar ?? undefined,
    },
    create: {
      id: user.id,
      email: user.email ?? `${user.id}@tyeflo.local`,
      name,
      image: avatar,
    },
  });

  const templateCount = await db.template.count({
    where: { creatorId: user.id },
  });

  return { dbUser, templateCount };
}

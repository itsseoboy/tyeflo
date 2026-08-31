import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

/**
 * Reads the signed-in user from Supabase and makes sure a matching row
 * exists in OUR User table (where username, points and templates live).
 *
 * Name/image are set at account creation. Afterwards the name is NOT
 * overwritten from Google on every login — manual changes (e.g. an
 * admin renaming themselves) persist. Only the avatar re-syncs, since
 * profile pictures change on Google's side.
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

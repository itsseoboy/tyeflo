import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { checkUsername } from "@/lib/moderation";

/**
 * POST /api/username — set the creator's username (once).
 * The username becomes their badge handle, e.g. "muzamil-lv3".
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Sign in first." }, { status: 401 });
    }

    const dbUser = await db.user.findUnique({ where: { id: user.id } });
    if (!dbUser) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    // Username is chosen ONCE — can't be changed later.
    if (dbUser.username) {
      return NextResponse.json(
        { error: "You already have a username." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const username = typeof body.username === "string" ? body.username : "";

    const validation = checkUsername(username);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.reason }, { status: 400 });
    }

    const clean = username.trim().toLowerCase();

    // Uniqueness check + friendly error.
    const existing = await db.user.findUnique({ where: { username: clean } });
    if (existing) {
      return NextResponse.json(
        { error: "That username is taken — try another." },
        { status: 409 }
      );
    }

    await db.user.update({
      where: { id: user.id },
      data: { username: clean },
    });

    return NextResponse.json({ ok: true, username: clean });
  } catch (err) {
    console.error("Username set failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

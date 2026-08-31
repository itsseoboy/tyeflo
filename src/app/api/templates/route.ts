import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { checkTemplate } from "@/lib/moderation";
import { FONT_STYLES } from "@/lib/fonts";
import { TEMPLATE_LABELS, POINTS_PER_TEMPLATE } from "@/lib/creator";

// Valid style ids - the client can never invent font ids.
const VALID_STYLE_IDS = new Set(FONT_STYLES.map((s) => s.id));

/**
 * POST /api/templates - publish a community template.
 *
 * Security layers:
 *   1. Must be signed in (Supabase session)
 *   2. Must have completed username onboarding
 *   3. Style ids must exist in the registry
 *   4. Content passes moderation (server-side, never trusted client)
 *   5. Rate limit: max 20 templates per user
 */
export async function POST(request: Request) {
  try {
    // 1. Who is calling?
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You need to be signed in to publish." },
        { status: 401 }
      );
    }

    // 2. Load our record; require username onboarding first.
    const dbUser = await db.user.findUnique({ where: { id: user.id } });
    if (!dbUser || !dbUser.username) {
      return NextResponse.json(
        { error: "Pick a username before publishing." },
        { status: 400 }
      );
    }

    // 3. Read + validate the payload.
    const body = await request.json();
    const label = typeof body.label === "string" ? body.label : "";
    const lines = Array.isArray(body.lines) ? body.lines : [];
    const styles = Array.isArray(body.styles) ? body.styles : [];

    if (!TEMPLATE_LABELS.includes(label as never)) {
      return NextResponse.json(
        { error: "Pick a valid category." },
        { status: 400 }
      );
    }

    for (const styleId of styles) {
      if (typeof styleId !== "string" || !VALID_STYLE_IDS.has(styleId)) {
        return NextResponse.json(
          { error: "Unknown font selected." },
          { status: 400 }
        );
      }
    }

    const moderation = checkTemplate({ label, lines, styles });
    if (!moderation.ok) {
      return NextResponse.json(
        { error: moderation.reason },
        { status: 400 }
      );
    }

    // 4. Rate limit: 20 templates per creator.
    const count = await db.template.count({ where: { creatorId: user.id } });
    if (count >= 20) {
      return NextResponse.json(
        { error: "You have reached the 20-template limit for now." },
        { status: 400 }
      );
    }

    // 5. Save + award points.
    const template = await db.template.create({
      data: { label, lines, styles, creatorId: user.id },
    });

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { points: { increment: POINTS_PER_TEMPLATE } },
    });

    return NextResponse.json({
      ok: true,
      template,
      points: updatedUser.points,
    });
  } catch (err) {
    console.error("Publish failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

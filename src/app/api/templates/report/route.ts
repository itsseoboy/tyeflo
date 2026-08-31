import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

/** Templates reaching this many reports are hidden from the community. */
const REPORT_HIDE_THRESHOLD = 5;

/**
 * POST /api/templates/report - flag a community template.
 * Requires sign-in (prevents bot spam). Each report increments the
 * counter; at threshold the template auto-hides until you review it
 * in the Supabase dashboard.
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Sign in to report." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const templateId = typeof body.templateId === "string" ? body.templateId : "";
    if (!templateId) {
      return NextResponse.json(
        { error: "Missing template." },
        { status: 400 }
      );
    }

    const template = await db.template.findUnique({
      where: { id: templateId },
    });
    if (!template) {
      return NextResponse.json(
        { error: "Template not found." },
        { status: 404 }
      );
    }

    const updated = await db.template.update({
      where: { id: templateId },
      data: { reported: { increment: 1 } },
    });

    return NextResponse.json({
      ok: true,
      reported: updated.reported,
      hidden: updated.reported >= REPORT_HIDE_THRESHOLD,
    });
  } catch (err) {
    console.error("Report failed:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

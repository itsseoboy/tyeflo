import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/templates/copied - count a copy (fire-and-forget).
 * No auth: anonymous copying is the point. Invalid ids ignored silently.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const templateId =
      typeof body.templateId === "string" ? body.templateId : "";

    if (templateId) {
      await db.template.update({
        where: { id: templateId },
        data: { copies: { increment: 1 } },
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Never break a copy gesture over analytics.
    return NextResponse.json({ ok: true });
  }
}

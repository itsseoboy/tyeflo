import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/fonts/history
 * Returns recently saved fonts, newest first.
 */
export async function GET() {
  try {
    const items = await db.savedFont.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ items });
  } catch (err) {
    console.error("[/api/fonts/history]", err);
    return NextResponse.json({ items: [] });
  }
}

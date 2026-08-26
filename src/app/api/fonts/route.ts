import { NextResponse } from "next/server";
import { FONT_STYLES, FONT_CATEGORIES, styleCount } from "@/lib/fonts";

/**
 * GET /api/fonts
 * Returns the catalogue of available font styles + categories.
 * The actual text transformation runs on the client for instant
 * feedback as the user types, but this endpoint exposes the same
 * metadata so the registry has a single source of truth.
 */
export async function GET() {
  return NextResponse.json({
    count: styleCount(),
    categories: FONT_CATEGORIES,
    styles: FONT_STYLES.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      tag: s.tag,
    })),
  });
}

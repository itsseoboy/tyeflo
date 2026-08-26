import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/fonts/save
 * Persist a styled font the user wants to keep.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { original, styled, styleId, styleName, category } = body ?? {};

    if (!styled || typeof styled !== "string") {
      return NextResponse.json(
        { error: "Missing required field: styled" },
        { status: 400 }
      );
    }

    const saved = await db.savedFont.create({
      data: {
        original: String(original ?? ""),
        styled,
        styleId: String(styleId ?? "unknown"),
        styleName: String(styleName ?? "Unknown"),
        category: String(category ?? "All"),
      },
    });

    return NextResponse.json({ ok: true, id: saved.id });
  } catch (err) {
    console.error("[/api/fonts/save]", err);
    return NextResponse.json(
      { error: "Failed to save font" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/fonts/save?id=...
 * Remove a saved font.
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    await db.savedFont.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/fonts/save DELETE]", err);
    return NextResponse.json(
      { error: "Failed to delete font" },
      { status: 500 }
    );
  }
}

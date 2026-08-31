import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

/**
 * POST /api/admin/delete-template - admin-only template removal.
 * Use for reported templates (they auto-hide at 5+ reports) or anything
 * you judge unfit. Role is verified SERVER-side; the client can never
 * claim admin.
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
    if (dbUser?.role !== "admin") {
      return NextResponse.json(
        { error: "Admins only." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const templateId =
      typeof body.templateId === "string" ? body.templateId : "";
    if (!templateId) {
      return NextResponse.json(
        { error: "Missing template id." },
        { status: 400 }
      );
    }

    await db.template.delete({ where: { id: templateId } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Admin delete failed:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

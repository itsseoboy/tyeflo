import { NextResponse } from "next/server";

/**
 * Temporary diagnostic - shows WHICH env vars are visible (names only,
 * never values). Visit /api/env-check after deploying. Delete this file
 * once everything is confirmed working.
 */
export async function GET() {
  return NextResponse.json({
    url_ok: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    anon_ok: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    database_ok: Boolean(process.env.DATABASE_URL),
    direct_ok: Boolean(process.env.DIRECT_URL),
    time: new Date().toISOString(),
  });
}

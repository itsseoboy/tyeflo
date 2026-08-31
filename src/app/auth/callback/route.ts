import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Google login lands here after Supabase - swap the code for a session. */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/bio-templates/creator-lab`);
    }
  }

  // Login failed - send them back with a hint
  return NextResponse.redirect(
    `${origin}/bio-templates/creator-lab?auth=error`
  );
}

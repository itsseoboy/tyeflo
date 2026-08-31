import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_URL, SUPABASE_ANON_KEY, hasSupabaseConfig } from "./config";

/**
 * Refreshes the Supabase auth session on every request.
 *
 * FAIL-SAFE: if config is somehow missing, skip the refresh entirely
 * and let the request through — the site stays up (users just appear
 * signed out) instead of crashing with a 500 on every page.
 */
export async function updateSession(request: NextRequest) {
  if (!hasSupabaseConfig()) {
    console.warn("Supabase config missing - skipping session refresh.");
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: no code between createServerClient and getUser().
  await supabase.auth.getUser();

  return supabaseResponse;
}

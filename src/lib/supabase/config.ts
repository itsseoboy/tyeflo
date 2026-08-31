/**
 * Public Supabase config.
 *
 * The project URL and anon key are PUBLIC values — they are embedded in
 * the browser bundle by design and are safe to commit. Supabase protects
 * data via Row Level Security, not by hiding these values.
 *
 * Hardcoding them removes build/deploy env-var failures from the
 * middleware, which previously crashed the whole site when Vercel did
 * not expose the variables to Edge functions.
 *
 * Env vars (if present) still take precedence, so local .env overrides
 * work as usual.
 */

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://rpojpjnmtwfbfudxgetn.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_rtTGVjD0Z__kAv4zr24IRg_4mz6ztqJ";

/** True when both values are usable. */
export function hasSupabaseConfig(): boolean {
  return (
    Boolean(SUPABASE_URL) &&
    Boolean(SUPABASE_ANON_KEY) &&
    SUPABASE_URL.startsWith("http")
  );
}

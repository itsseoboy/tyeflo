"use client";

import { Chrome, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

/** Google sign-in via Supabase Auth. */
export function SignInButton() {
  const handleSignIn = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button
      onClick={handleSignIn}
      className="w-full gap-2 rounded-full"
      size="lg"
    >
      <Chrome className="h-4 w-4" aria-hidden="true" />
      Continue with Google
    </Button>
  );
}

/** Sign out of Supabase, then go home. */
export function SignOutButton() {
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <Button
      variant="outline"
      onClick={handleSignOut}
      className="gap-2 rounded-full"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      Sign out
    </Button>
  );
}

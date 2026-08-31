"use client";

/**
 * UsernameOnboarding — first-run step for new creators.
 *
 * Shown right after sign-in when no username exists yet. The username
 * becomes the permanent badge handle (e.g. "muzamil-lv3") and cannot
 * be changed later — the UI makes that explicit.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UsernameOnboarding({ suggested }: { suggested: string }) {
  const router = useRouter();
  const [username, setUsername] = React.useState(suggested);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const clean = username.trim().toLowerCase();
  const valid = /^[a-z0-9-]{3,20}$/.test(clean);

  const save = async () => {
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: clean }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      router.refresh(); // re-render server component → builder appears
    } catch {
      setError("Network error — try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <UserRound className="h-6 w-6 text-primary" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-2xl font-bold text-foreground">
        Pick your creator name
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        This becomes your badge on every template you publish — like{" "}
        <span className="font-semibold text-primary">{clean || "yourname"}-lv1</span>.
        It&apos;s permanent, so choose well.
      </p>

      <div className="mt-6">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={20}
          placeholder="e.g. muzamil"
          className="text-center"
          aria-label="Choose your username"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          3-20 characters — lowercase letters, numbers, hyphens.
        </p>
      </div>

      {error && (
        <p className="mt-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        onClick={save}
        disabled={!valid || saving}
        size="lg"
        className="mt-5 w-full gap-2 rounded-full"
      >
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Saving…
          </>
        ) : (
          <>
            <Check className="h-4 w-4" aria-hidden="true" />
            Lock in this name
          </>
        )}
      </Button>
    </div>
  );
}

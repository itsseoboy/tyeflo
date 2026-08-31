import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Hammer, ShieldCheck } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SignInButton, SignOutButton } from "@/components/sign-in-button";
import { CreatorBadge, LevelIcon } from "@/components/creator-badge";
import { UsernameOnboarding } from "@/components/username-onboarding";
import { TemplateBuilder } from "@/components/template-builder";
import { getCreator } from "@/lib/get-creator";
import {
  POINTS_PER_TEMPLATE,
  LEVELS,
  levelFromPoints,
  nextLevelAt,
} from "@/lib/creator";

export const metadata: Metadata = {
  title: "Creator Lab - Make & Share Bio Templates | TyeFlo",
  description:
    "Sign in to build bio templates, publish them for the TyeFlo community, and earn creator points and level badges on every template you make.",
};

export default async function CreatorLabPage() {
  const creator = await getCreator();

  const user = creator?.dbUser ?? null;
  const { level } = levelFromPoints(user?.points ?? 0);
  const isAdmin = user?.role === "admin";
  const nextAt = user ? nextLevelAt(user.points) : null;
  const currentFloor = user
    ? LEVELS.filter((l) => user.points >= l.min).pop()?.min ?? 0
    : 0;
  const progress =
    user && nextAt !== null
      ? Math.min(
          100,
          Math.round(
            ((user.points - currentFloor) / (nextAt - currentFloor)) * 100
          )
        )
      : 100;

  // Suggested username from their Google name (first word, cleaned).
  const suggested = (user?.name ?? "creator")
    .split(" ")[0]
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 20) || "creator";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16">
          <Link
            href="/bio-templates"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Bio Templates
          </Link>

          {!user ? (
            /* ---------------- Login gate ---------------- */
            <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
              </span>
              <h1 className="mt-4 text-2xl font-bold text-foreground">
                Creator Lab
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Sign in to build bio templates, publish them for the
                community, and earn creator points and level badges shown on
                every template you make.
              </p>

              <div className="mt-6 space-y-2 rounded-xl border border-border bg-muted/40 p-4 text-left">
                {LEVELS.map((l) => (
                  <div
                    key={l.level}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2 font-semibold text-foreground">
                      <LevelIcon
                        level={l.level}
                        className="h-4 w-4 text-primary"
                      />
                      Level {l.level}
                    </span>
                    <span className="text-muted-foreground">
                      {l.min}+ points
                    </span>
                  </div>
                ))}
                <p className="pt-1 text-center text-xs text-muted-foreground">
                  +{POINTS_PER_TEMPLATE} points for every template you publish
                </p>
              </div>

              <div className="mt-6">
                <SignInButton />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                We only use your Google account to know who made what - no
                spam, ever.
              </p>
            </div>
          ) : !user.username ? (
            /* ---------------- Username onboarding ---------------- */
            <UsernameOnboarding suggested={suggested} />
          ) : (
            /* ---------------- Full dashboard ---------------- */
            <div>
              <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-16 w-16 rounded-full border-2 border-primary/30"
                  />
                ) : (
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    {(user.name ?? user.email).charAt(0).toUpperCase()}
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-foreground">
                    {user.name ?? "Creator"}
                  </h1>
                  <p className="truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                  <CreatorBadge
                    username={user.username}
                    name={user.name}
                    points={user.points}
                    role={user.role}
                    className="mt-2"
                  />
                </div>

                <SignOutButton />
              </div>

              {/* Admin notice */}
              {isAdmin && (
                <p className="mt-3 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary">
                  <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Admin mode - you can
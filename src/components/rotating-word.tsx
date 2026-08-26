"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const WORDS: string[] = [
  "Font",
  "𝓕𝓸𝓷𝓽",
  "𝔉𝔬𝔫𝔱",
  "𝔽𝕠𝕟𝕥",
  "𝗙𝗼𝗻𝘁",
  "𝘍𝘰𝘯𝘵",
  "ᶠᵒⁿᵗ",
  "𝙁𝙤𝙣𝙩",
];

const TYPE_SPEED = 110;
const DELETE_SPEED = 70;
const HOLD_AFTER_TYPE = 1400;
const HOLD_AFTER_DELETE = 250;

export function RotatingWord() {
  const [typed, setTyped] = React.useState(WORDS[0]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const wordChars: string[][] = WORDS.map((w) => Array.from(w));
    let wIdx = 0;
    let charCount = wordChars[0].length;
    let mode: "hold" | "delete" | "next" | "type" = "hold";
    let timer: number;

    const render = () => wordChars[wIdx].slice(0, charCount).join("");

    const tick = () => {
      if (mode === "hold") {
        timer = window.setTimeout(() => { mode = "delete"; tick(); }, HOLD_AFTER_TYPE);
        return;
      }
      if (mode === "delete") {
        charCount -= 1;
        if (charCount <= 0) {
          setTyped("");
          mode = "next";
          timer = window.setTimeout(tick, HOLD_AFTER_DELETE);
          return;
        }
        setTyped(render());
        timer = window.setTimeout(tick, DELETE_SPEED);
        return;
      }
      if (mode === "next") {
        wIdx = (wIdx + 1) % wordChars.length;
        charCount = 0;
        mode = "type";
        tick();
        return;
      }
      charCount += 1;
      setTyped(render());
      if (charCount >= wordChars[wIdx].length) {
        mode = "hold";
        timer = window.setTimeout(tick, HOLD_AFTER_TYPE);
        return;
      }
      timer = window.setTimeout(tick, TYPE_SPEED);
    };

    timer = window.setTimeout(tick, HOLD_AFTER_TYPE);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span className="relative inline-flex items-baseline">
      <span className="text-primary" dir="auto">
        {mounted ? typed : WORDS[0]}
      </span>
      <span
        className="ml-0.5 inline-block w-[3px] animate-pulse bg-primary align-middle"
        style={{ height: "0.9em", opacity: mounted ? 1 : 0 }}
        aria-hidden
      />
    </span>
  );
}

"use client";

import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-center py-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-8 w-8 text-accent" />
        <h1 className="text-2xl font-bold text-foreground">PopBio</h1>
      </div>
    </header>
  );
}

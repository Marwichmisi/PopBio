"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BioVariant } from "@/types";
import { cn, copyTextWithFallback } from "@/lib/utils";
import { Twitter, Linkedin, Copy, Check } from "lucide-react";

interface BioCardProps {
  bio: BioVariant;
}

export function BioCard({ bio }: BioCardProps) {
  const [copied, setCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const isTwitter = bio.platform === "twitter";
  const maxChars = isTwitter ? 280 : 3000;
  const charCount = bio.text.length;
  const isOverLimit = charCount > maxChars;

  const handleCopy = async () => {
    // On copie le texte tel quel (plus pur) sans modifications superflues
    const result = await copyTextWithFallback(bio.text);

    if (result.copied) {
      setCopied(true);
    }

    if (result.usedFallback) {
      setCopyMessage("Copie auto indisponible. Prêt pour copie manuelle.");
    }

    setTimeout(() => {
      setCopied(false);
      setCopyMessage(null);
    }, 2000);
  };

  const PlatformIcon = isTwitter ? Twitter : Linkedin;

  return (
    <Card
      className={cn(
        "bg-white border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-indigo-100",
        isOverLimit && "border-red-200 bg-red-50/10"
      )}
    >
      <CardHeader className="pb-3 border-b border-slate-50/50 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-md", isTwitter ? "bg-[#1DA1F2]/10 text-[#1DA1F2]" : "bg-[#0A66C2]/10 text-[#0A66C2]")}>
              <PlatformIcon className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {bio.length === "short" ? "Version courte" : "Version détaillée"}
            </span>
          </div>
          <span
            className={cn(
              "text-xs font-mono px-2 py-1 rounded-full",
              isOverLimit ? "bg-red-50 text-red-600 font-bold" : "bg-slate-100 text-slate-500"
            )}
            title={isOverLimit ? "Attention: limite de caractères dépassée" : ""}
          >
            {charCount} / {maxChars}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        <p className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
          {bio.text}
        </p>
      </CardContent>
      <CardFooter className="p-5 pt-0 mt-2">
        <Button
          onClick={handleCopy}
          variant={copied ? "default" : "secondary"}
          className={cn(
            "w-full h-11 font-medium transition-all group",
            copied ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          )}
        >
          {copied ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="h-4 w-4" /> Brio copié !
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Copy className="h-4 w-4 group-hover:scale-110 transition-transform" /> Copier cette bio
            </span>
          )}
        </Button>

        {copyMessage && (
          <p className="w-full text-center mt-3 text-xs font-medium text-amber-600 bg-amber-50 py-2 rounded-md">{copyMessage}</p>
        )}
      </CardFooter>
    </Card>
  );
}

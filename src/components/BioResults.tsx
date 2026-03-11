"use client";

import React, { useState } from "react";
import { BioVariant } from "@/types";
import { BioCard } from "./BioCard";
import { Button } from "@/components/ui/button";
import { copyTextWithFallback, cn } from "@/lib/utils";
import { Twitter, Linkedin, Share2 } from "lucide-react";

interface BioResultsProps {
  bios: BioVariant[];
  hashtags: string[];
  onReset: () => void;
}

export function BioResults({ bios, hashtags, onReset }: BioResultsProps) {
  const [copiedHashtag, setCopiedHashtag] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const twitterBios = bios.filter((b) => b.platform === "twitter");
  const linkedinBios = bios.filter((b) => b.platform === "linkedin");

  const handleCopyHashtag = async (tag: string) => {
    const result = await copyTextWithFallback(tag);
    if (result.copied) {
      setCopiedHashtag(tag);
      setTimeout(() => setCopiedHashtag(null), 2000);
    }
  };

  const handleShare = async () => {
    const shareText = "🚀 Je viens de pimper mon profil en 3 secondes grâce à l'IA !\n\nLassé(e) de ta bio éclatée ? Viens générer la tienne (c'est gratuit) 👇\n" + window.location.origin;
    const result = await copyTextWithFallback(shareText);
    setStatusMessage(result.copied ? "Statut copié !" : "Prêt pour une copie manuelle.");
    setTimeout(() => setStatusMessage(null), 2500);
  };

  return (
    <div className="space-y-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Vos résultats</h2>
          <p className="text-slate-500 mt-2 text-sm">Prêtes à être copiées et publiées !</p>
        </div>
        <Button 
          variant="outline" 
          onClick={onReset}
          className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-xl h-10 px-5 transition-colors"
        >
          Nouvelle génération
        </Button>
      </div>

      <div className="space-y-12">
        {twitterBios.length > 0 && (
          <section className="space-y-5">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <span className="p-2 bg-[#1DA1F2]/10 rounded-lg">
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              </span>
              Twitter / X
            </h3>
            <div className="grid gap-5">
              {twitterBios.map((bio) => (
                <BioCard key={bio.id} bio={bio} />
              ))}
            </div>
          </section>
        )}

        {linkedinBios.length > 0 && (
          <section className="space-y-5">
            <div className="h-px bg-slate-100 mb-8" />
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <span className="p-2 bg-[#0A66C2]/10 rounded-lg">
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
              </span>
              LinkedIn
            </h3>
            <div className="grid gap-5">
              {linkedinBios.map((bio) => (
                <BioCard key={bio.id} bio={bio} />
              ))}
            </div>
          </section>
        )}
      </div>

      {hashtags.length > 0 && (
        <section className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 mt-8">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">
            Hashtags recommandés
          </h3>
          <div className="flex flex-wrap gap-2.5 mb-6">
            {hashtags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleCopyHashtag(tag)}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 shadow-sm",
                  copiedHashtag === tag 
                    ? "bg-emerald-500 text-white shadow-emerald-200" 
                    : "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
                )}
              >
                {copiedHashtag === tag ? "✓ Copié!" : tag}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleShare}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl h-10 px-5 transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Partager l&apos;outil
            </Button>
            {statusMessage && (
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                {statusMessage}
              </span>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

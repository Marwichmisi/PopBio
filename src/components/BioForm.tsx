"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { INPUT_LIMITS } from "@/lib/constants";
import { AlertCircle, Wand2, Briefcase, Zap, Target, Pencil } from "lucide-react";

interface BioFormProps {
  onGenerate: (input: string) => Promise<void>;
  isLoading: boolean;
  disabled?: boolean;
  error?: string | null;
  retryAfter?: number;
}

export function BioForm({ onGenerate, isLoading, disabled, error, retryAfter }: BioFormProps) {
  const [mode, setMode] = useState<"guided" | "free">("guided");
  const [freeInput, setFreeInput] = useState("");
  const [job, setJob] = useState("");
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  
  // Guided values
  const [tone] = useState<"PRO" | "CASUAL" | "FUNNY">("PRO");

  const isFreeValid = freeInput.length >= INPUT_LIMITS.minChars;
  const isGuidedValid = job.length > 2 && skills.length > 5 && goal.length > 5;
  const isValid = mode === "free" ? isFreeValid : isGuidedValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || disabled || isLoading) return;

    if (mode === "free") {
      onGenerate(freeInput);
    } else {
      const prompt = `Je suis ${job}. Mes compétences principales: ${skills}. Mon objectif est de ${goal}. Ton souhaité: ${tone}.`;
      onGenerate(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Tabs */}
      <div className="flex p-1 space-x-1 bg-slate-100/80 rounded-xl max-w-sm mx-auto shadow-inner">
        <button
          type="button"
          onClick={() => setMode("guided")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg transition-all ${
            mode === "guided" ? "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
          }`}
        >
          <Target className="w-4 h-4" /> Mode Guidé
        </button>
        <button
          type="button"
          onClick={() => setMode("free")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg transition-all ${
            mode === "free" ? "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
          }`}
        >
          <Pencil className="w-4 h-4" /> Saisie Libre
        </button>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/60 ring-1 ring-black/5">
        {mode === "free" ? (
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">Parle-nous de toi</label>
            <p className="text-sm text-slate-500 mb-2">Décris ton métier, tes passions, et ce que tu recherches.</p>
            <Textarea
              value={freeInput}
              onChange={(e) => setFreeInput(e.target.value)}
              placeholder="Ex: Je suis un développeur passionné par l'IA et le design, à la recherche de projets innovants..."
              className="resize-none h-40 w-full rounded-xl bg-slate-50 text-slate-900 border-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all text-base p-4"
              maxLength={INPUT_LIMITS.maxChars}
              data-testid="free-input"
            />
            <div className={`text-xs font-medium text-right flex justify-between ${freeInput.length > INPUT_LIMITS.maxChars * 0.9 ? "text-red-500" : "text-slate-400"}`}>
              <span>{freeInput.length < INPUT_LIMITS.minChars ? `Encore ${INPUT_LIMITS.minChars - freeInput.length} caractères min.` : "Parfait !"}</span>
              <span>{freeInput.length} / {INPUT_LIMITS.maxChars}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1.5 border-b border-slate-100 pb-6">
              <label className="block pl-1 text-sm font-bold text-slate-700 flex flex-row items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-500" /> Quel est ton métier actuel ?
              </label>
              <Input
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="ex: Product Designer, Dev Fullstack, Fondateur..."
                className="bg-slate-50 border-slate-200 focus:bg-white text-base py-6 rounded-xl hover:border-indigo-300 transition-colors"
                data-testid="job-input"
              />
            </div>

            <div className="space-y-1.5 border-b border-slate-100 pb-6">
              <label className="block pl-1 text-sm font-bold text-slate-700 flex flex-row items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Quelles sont tes compétences phares ?
              </label>
              <Input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="ex: React, Management, Stratégie SEO..."
                className="bg-slate-50 border-slate-200 focus:bg-white text-base py-6 rounded-xl hover:border-amber-300 transition-colors"
                data-testid="skills-input"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block pl-1 text-sm font-bold text-slate-700 flex flex-row items-center gap-2">
                <Target className="w-4 h-4 text-emerald-500" /> Ton objectif sur les réseaux ?
              </label>
              <Input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="ex: Trouver des clients, recruter, partager ma passion..."
                className="bg-slate-50 border-slate-200 focus:bg-white text-base py-6 rounded-xl hover:border-emerald-300 transition-colors"
                data-testid="goal-input"
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl mb-6 shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {retryAfter > 0 && (
        <div className="text-center p-3 text-sm font-medium text-amber-600 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
          Nouvelle tentative possible dans {retryAfter}s.
        </div>
      )}

      <Button
        type="submit"
        disabled={!isValid || disabled || isLoading}
        className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group"
      >
        {isLoading ? (
          <span className="flex items-center gap-3">
            <span className="animate-spin text-xl">✨</span> Création de la magie en cours...
          </span>
        ) : (
          <span className="flex items-center gap-3">
            <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Générer mes bios
          </span>
        )}
      </Button>
    </form>
  );
}

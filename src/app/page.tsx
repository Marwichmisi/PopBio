"use client";

import { BioForm } from "@/components/BioForm";
import { BioResults } from "@/components/BioResults";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { HistoryPanel } from "@/components/HistoryPanel";
import { useBioGenerator } from "@/hooks/useBioGenerator";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const {
    bios,
    hashtags,
    isLoading,
    error,
    retryAfter,
    sessionId,
    generate,
    loadSession,
    reset,
  } = useBioGenerator();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="mb-12 text-center">
             <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
               Créez la bio parfaite
             </h1>
             <p className="text-lg text-slate-600 max-w-xl mx-auto">
               Générez une biographie professionnelle, engageante et parfaitement adaptée pour Twitter et LinkedIn en quelques secondes.
             </p>
          </div>

          <main className="space-y-10">
            {!sessionId ? (
              <>
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden bg-white">
                  <CardContent className="p-8 sm:p-10">
                    <BioForm
                      onGenerate={generate}
                      isLoading={isLoading}
                      disabled={retryAfter > 0}
                      error={error}
                      retryAfter={retryAfter}
                    />
                  </CardContent>
                </Card>
                <div className="pt-6">
                  <HistoryPanel onReuse={loadSession} />
                </div>
              </>
            ) : (
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border-0">
                <BioResults bios={bios} hashtags={hashtags} onReset={reset} />
              </div>
            )}
          </main>

          <footer className="mt-20 text-center pb-8 border-t border-slate-200 pt-8">
             <p className="text-sm text-slate-500 font-medium">PopBio &copy; {new Date().getFullYear()} – L&apos;outil de génération de bios propulsé par l&apos;IA.</p>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

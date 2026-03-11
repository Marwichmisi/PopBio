"use client";

import { useState, useCallback, useEffect } from "react";
import { BioVariant, GenerateResponse, RateLimitError, StoredSession } from "@/types";
import { isValidInput } from "@/lib/utils";
import { addToHistory } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

interface UseBioGeneratorState {
  bios: BioVariant[];
  hashtags: string[];
  isLoading: boolean;
  error: string | null;
  sessionId: string | null;
  retryAfter: number;
}

export function useBioGenerator() {
  const [state, setState] = useState<UseBioGeneratorState>({
    bios: [],
    hashtags: [],
    isLoading: false,
    error: null,
    sessionId: null,
    retryAfter: 0,
  });

  useEffect(() => {
    if (state.retryAfter <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setState((prev) => ({
        ...prev,
        retryAfter: Math.max(0, prev.retryAfter - 1),
      }));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [state.retryAfter]);

  const generate = useCallback(async (input: string) => {
    const trimmedInput = input.trim();

    if (!isValidInput(trimmedInput)) {
      setState((prev) => ({
        ...prev,
        error: "Le texte doit contenir entre 10 et 2000 caractères",
        retryAfter: 0,
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: trimmedInput }),
      });

      const data: GenerateResponse | RateLimitError = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = "retryAfter" in data && data.retryAfter ? data.retryAfter : 60;
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: "Trop de requetes. Veuillez patienter.",
            retryAfter,
          }));
          return;
        }

        throw new Error("error" in data ? data.error : "Une erreur est survenue");
      }

      const result = data as GenerateResponse;
      const sessionId = result.sessionId || uuidv4();

      addToHistory({
        id: sessionId,
        input: trimmedInput,
        bios: result.bios,
        hashtags: result.hashtags,
        createdAt: new Date().toISOString(),
      });

      setState({
        bios: result.bios,
        hashtags: result.hashtags,
        isLoading: false,
        error: null,
        sessionId,
        retryAfter: 0,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Une erreur est survenue",
        retryAfter: 0,
      }));
    }
  }, []);

  const loadSession = useCallback((session: StoredSession) => {
    setState({
      bios: session.bios,
      hashtags: session.hashtags,
      isLoading: false,
      error: null,
      sessionId: session.id,
      retryAfter: 0,
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      bios: [],
      hashtags: [],
      isLoading: false,
      error: null,
      sessionId: null,
      retryAfter: 0,
    });
  }, []);

  return {
    ...state,
    generate,
    loadSession,
    reset,
  };
}

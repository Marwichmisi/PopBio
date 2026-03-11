import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { checkRateLimit } from "@/lib/rateLimiter";
import { generateBios } from "@/lib/gemini";
import { isValidInput, detectLanguage } from "@/lib/utils";
import { INPUT_LIMITS } from "@/lib/constants";

export const maxDuration = 60; // Set max duration for Vercel

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimitCheck = checkRateLimit(ip);

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: "Trop de requêtes. Veuillez patienter.",
          retryAfter: rateLimitCheck.retryAfter,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimitCheck.retryAfter || 60) },
        },
      );
    }

    const body = await request.json();
    const { input } = body;

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Le texte est requis", field: "input" },
        { status: 400 },
      );
    }

    const trimmedInput = input.trim();

    if (!isValidInput(trimmedInput)) {
      return NextResponse.json(
        {
          error: `Le texte doit contenir entre ${INPUT_LIMITS.minChars} et ${INPUT_LIMITS.maxChars} caractères`,
          field: "input",
        },
        { status: 400 },
      );
    }

    const language = detectLanguage(trimmedInput);

    const result = await generateBios(trimmedInput, language);

    return NextResponse.json({
      sessionId: uuidv4(),
      bios: result.bios,
      hashtags: result.hashtags,
    });
  } catch (error) {
    console.error("Generate API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Erreur serveur";

    if (errorMessage.includes("timeout")) {
      return NextResponse.json(
        { error: "La génération a pris trop de temps. Veuillez réessayer." },
        { status: 504 },
      );
    }

    if (
      errorMessage.includes("API key") ||
      errorMessage.includes("No API key")
    ) {
      return NextResponse.json(
        { error: "Erreur de configuration API" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de la génération des bios. Veuillez réessayer." },
      { status: 500 },
    );
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import { BioVariant, Language } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { API_CONFIG, BIO_LIMITS, HASHTAG_COUNT } from "@/lib/constants";

let keyIndex = 0;

interface ParsedGenerationResponse {
  twitter: string[];
  linkedin: string[];
  hashtags: string[];
}

function getApiKeys(): string[] {
  return process.env.GEMINI_API_KEYS?.split(",").filter((key) => key.trim()) || [];
}

function getNextKey(keys: string[]): string | null {
  if (keys.length === 0) return null;
  const key = keys[keyIndex % keys.length];
  keyIndex = (keyIndex + 1) % keys.length;
  return key;
}

interface GenerationResult {
  bios: BioVariant[];
  hashtags: string[];
}

export function getBilingualInstruction(language: Language): string {
  if (language === "fr") {
    return "Le texte source est en francais. Genere un resultat bilingue FR/EN avec 1 bio en francais et 1 bio en anglais pour Twitter/X, et 1 bio en francais et 1 bio en anglais pour LinkedIn.";
  }

  if (language === "en") {
    return "The source text is in English. Generate a bilingual FR/EN result with 2 bios in French then 2 bios in English for Twitter/X, and 2 bios in French then 2 bios in English for LinkedIn.";
  }

  return "Genere un resultat bilingue FR/EN equilibre avec 1 bio en francais et 1 bio en anglais pour Twitter/X, et 1 bio en francais et 1 bio en anglais pour LinkedIn.";
}

export async function generateBios(
  input: string,
  language: Language,
): Promise<GenerationResult> {
  const keys = getApiKeys();

  if (keys.length === 0) {
    throw new Error("No API key configured");
  }

  const attempts = Math.min(keys.length, API_CONFIG.maxRetries + 1);
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < attempts; attempt++) {
    const apiKey = getNextKey(keys);

    if (!apiKey) {
      break;
    }

    try {
      if (attempt > 0) {
        console.info(`Retry Gemini with rotated key (${attempt + 1}/${attempts})`);
      }

      return await generateWithKey(apiKey, input, language);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Failed to generate bios");
      if (!isRetryableGeminiError(lastError)) {
        throw lastError;
      }
    }
  }

  throw lastError || new Error("Failed to generate bios");
}

async function generateWithKey(
  apiKey: string,
  input: string,
  language: Language,
): Promise<GenerationResult> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: API_CONFIG.model });
  const result = await withTimeout(
    model.generateContent({
      contents: [{ role: "user", parts: [{ text: buildPrompt(input, language) }] }],
    }),
    API_CONFIG.timeoutMs,
  );

  const responseText = result.response.text();
  const parsed = parseModelResponse(responseText);

  return {
    bios: buildVariants(parsed),
    hashtags: parsed.hashtags,
  };
}

export function buildPrompt(input: string, language: Language): string {
  const bilingualInstruction = getBilingualInstruction(language);

  return `Tu es un expert en branding personnel et en redaction de bios professionnelles pour les reseaux sociaux.

MISSION: Creer des bios accrocheuses et optimisees pour Twitter/X et LinkedIn basees sur le profil de la personne.

PROFIL A ANALYSER: "${input}"

CONSigne BILINGUE: ${bilingualInstruction}

EXIGENCES STRICTES:

1. TWITTER/X (2 bios - moins de 280 caracteres chacune):
  - produire exactement 1 bio en francais et 1 bio en anglais
   - Bio 1 (courte): maximum 100 caracteres - accroche memorable + metier
   - Bio 2 (moyenne): 100-180 caracteres - metier + valeur ajoutee + emoji
   - Bio 3 (longue): 180-250 caracteres - presentation complete avec emojis
   - Bio 4 (creative): style unique qui se demarque

2. LINKEDIN (2 bios):
  - produire exactement 1 bio en francais et 1 bio en anglais
   - Bio 1 (courte): 100-150 caracteres - pitch professionnel
   - Bio 2 (moyenne): 150-250 caracteres - experience + competences cles
   - Bio 3 (longue): 250-400 caracteres - parcours complet + realisations
   - Bio 4 (creative): storytelling personnel engageant

3. HASHTAGS (5 tags seulement):
   - pertinents pour le metier ou l'industrie
  - varies, professionnels et thematiques
  - melanger le francais et l'anglais quand c'est pertinent

REGLES DE REDACTION:
- sois creatif mais professionnel
- utilise des emojis judicieusement
- sois concis et impactant
- mets en valeur les points forts du profil
- evite les cliches vides
- adapte le ton selon la plateforme

FORMAT JSON OBLIGATOIRE (sans texte supplementaire):
{
  "twitter": ["bio1_fr", "bio2_en"],
  "linkedin": ["bio1_fr", "bio2_en"],
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
}`;
}

function parseModelResponse(responseText: string): ParsedGenerationResponse {
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Invalid response format");
  }

  const parsed = JSON.parse(jsonMatch[0]) as Partial<ParsedGenerationResponse>;
  const twitter = normalizeStringArray(parsed.twitter);
  const linkedin = normalizeStringArray(parsed.linkedin);
  const hashtags = normalizeStringArray(parsed.hashtags);

  if (twitter.length !== 2 || linkedin.length !== 2 || hashtags.length !== HASHTAG_COUNT) {
    throw new Error("Invalid generation payload");
  }

  if (twitter.some((text) => text.length >= BIO_LIMITS.twitter.max)) {
    throw new Error("Twitter bio exceeds character limit");
  }

  return { twitter, linkedin, hashtags };
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildVariants(parsed: ParsedGenerationResponse): BioVariant[] {
  const now = new Date().toISOString();
  const bios: BioVariant[] = [];

  parsed.twitter.forEach((text, idx) => {
    bios.push({
      id: uuidv4(),
      text,
      platform: "twitter",
      length: idx < 2 ? "short" : "long",
      charCount: text.length,
      createdAt: now,
    });
  });

  parsed.linkedin.forEach((text, idx) => {
    bios.push({
      id: uuidv4(),
      text,
      platform: "linkedin",
      length: idx < 2 ? "short" : "long",
      charCount: text.length,
      createdAt: now,
    });
  });

  return bios;
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error("Generation timeout"));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

function isRetryableGeminiError(error: Error): boolean {
  const message = error.message.toLowerCase();

  if (message.includes("no api key")) {
    return false;
  }

  if (message.includes("timeout")) {
    return true;
  }

  return ["quota", "rate", "429", "503", "overloaded", "temporarily", "invalid generation payload", "invalid response format", "twitter bio exceeds character limit"].some((token) =>
    message.includes(token),
  );
}

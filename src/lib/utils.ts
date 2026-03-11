import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { INPUT_LIMITS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function countCharacters(text: string): number {
  return text.length;
}

export function isValidInput(text: string): boolean {
  const trimmed = text.trim();
  return (
    trimmed.length >= INPUT_LIMITS.minChars &&
    trimmed.length <= INPUT_LIMITS.maxChars
  );
}

export function detectLanguage(text: string): "fr" | "en" | "both" {
  const frenchWords =
    /\b(je|tu|il|elle|nous|vous|ils|elles|le|la|les|un|une|des|et|est|pas|que|qui|dans|pour|avec|sur|ce|ces|ceci|cela|mon|ton|son|ma|ta|sa|mes|tes|ses|votre|notre|leur|vous|être|avoir|faire|aller|voir|venir|savoir|pouvoir|vouloir|devoir|falloir|appeler|prendre|mettre|donner|recevoir|trouver|porter|parler|écrire|lire|comprendre|finir|vendre|acheter|changer|vivre|mourir|naitre|grandir|croire|espérer|douter|craindre|sentir|penser|souhaiter|aim|merci|bien|souvent|jamais|toujours|parfois|aussi|encore|déjà|très|plus|moins|trop|assez|bien|mal|mieux|pire|super|génial|super|formidable|parfait|bravo|encourage|allez|y|voici|voilà|donc|car|or|mais|ni|ou|si)\b/i;
  const englishWords =
    /\b(i|you|he|she|we|they|it|me|him|her|us|them|a|an|the|and|or|but|if|else|when|while|for|to|of|in|on|at|by|with|from|about|into|through|during|before|after|above|below|up|down|out|off|over|under|again|further|then|once|here|there|be|have|do|make|go|get|know|think|take|see|come|want|use|find|give|tell|try|call|keep|let|put|seem|help|show|hear|play|run|move|live|believe|bring|happen|write|provide|sit|stand|lose|pay|meet|include|continue|set|learn|change|lead|understand|watch|follow|stop|create|speak|read|spend|grow|open|walk|win|offer|remember|love|consider|appear|buy|wait|serve|die|send|expect|build|stay|fall|cut|reach|kill|remain|issue|hand|small|large|big|new|old|great|little|own|right|good|bad|best|worst|high|low|great|little|big|small|large|early|late|right|left|public|private|local|national|human|social|natural|economic|political|personal|clear|difficult|possible|strong|whole|public|certain|free|full|short|simple|recent|able|important|clear|much|just|also|back|well|very|still|almost|already|just|now|then|here|there|again|further|once)\b/i;

  const frenchCount = (text.match(frenchWords) || []).length;
  const englishCount = (text.match(englishWords) || []).length;

  if (frenchCount === 0 && englishCount === 0) return "both";
  if (frenchCount > 0 && englishCount > 0) return "both";
  if (frenchCount > englishCount) return "fr";
  if (englishCount > frenchCount) return "en";

  return "both";
}

export function formatHashtags(hashtags: string[]): string[] {
  return hashtags.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
}

export function removeHashtags(text: string): string {
  return text.replace(/#\w+/g, "").replace(/\s+/g, " ").trim();
}

export function addEmojis(text: string): string {
  const emojiMap: Record<string, string> = {
    developer: "💻",
    designer: "🎨",
    entrepreneur: "🚀",
    writer: "✍️",
    marketing: "📈",
    sales: "💼",
    manager: "👔",
    engineer: "⚙️",
    data: "📊",
    ai: "🤖",
    tech: "🔧",
    business: "💰",
    creative: "✨",
    leader: "🏆",
    innovator: "💡",
  };

  const lowerText = text.toLowerCase();
  let result = text;

  Object.entries(emojiMap).forEach(([key, emoji]) => {
    if (lowerText.includes(key) && !result.includes(emoji)) {
      result = `${emoji} ${result}`;
    }
  });

  return result;
}

export async function copyTextWithFallback(
  text: string,
): Promise<{ copied: boolean; usedFallback: boolean }> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return { copied: true, usedFallback: false };
    }
  } catch {
    // Fall back to manual copy below.
  }

  if (typeof window !== "undefined") {
    window.prompt("Copiez ce texte manuellement :", text);
    return { copied: false, usedFallback: true };
  }

  return { copied: false, usedFallback: false };
}

import { describe, expect, it, beforeEach } from "vitest";
import { isValidInput, removeHashtags, addEmojis, detectLanguage } from "@/lib/utils";
import { addToHistory, clearHistory, getHistory } from "@/lib/storage";
import { checkRateLimit, resetRateLimit } from "@/lib/rateLimiter";

describe("core utilities", () => {
  beforeEach(() => {
    clearHistory();
    resetRateLimit("127.0.0.1");
  });

  it("valide les longueurs d'entree attendues", () => {
    expect(isValidInput("court")).toBe(false);
    expect(isValidInput("Je suis developpeur full stack")).toBe(true);
    expect(isValidInput("x".repeat(2001))).toBe(false);
  });

  it("retire les hashtags pour l'adaptation X", () => {
    expect(removeHashtags("Dev React #web #frontend")).toBe("Dev React");
  });

  it("ajoute un emoji pertinent pour LinkedIn", () => {
    const result = addEmojis("Developer focused on AI");
    expect(result.includes("💻") || result.includes("🤖")).toBe(true);
  });

  it("retourne both pour un texte mixte fr/en", () => {
    expect(detectLanguage("Je build web apps with React")).toBe("both");
  });

  it("retourne both pour une langue non supportee", () => {
    expect(detectLanguage("Hola mundo desde Madrid")).toBe("both");
  });
});

describe("storage", () => {
  beforeEach(() => {
    clearHistory();
  });

  it("ajoute une session a l'historique", () => {
    addToHistory({
      id: "session-1",
      input: "Je suis product designer",
      bios: [],
      hashtags: ["#design"],
      createdAt: new Date().toISOString(),
    });

    expect(getHistory()).toHaveLength(1);
    expect(getHistory()[0]?.id).toBe("session-1");
  });
});

describe("rate limiter", () => {
  beforeEach(() => {
    resetRateLimit("127.0.0.1");
  });

  it("bloque a la quatrieme requete sur la fenetre courante", () => {
    expect(checkRateLimit("127.0.0.1").allowed).toBe(true);
    expect(checkRateLimit("127.0.0.1").allowed).toBe(true);
    expect(checkRateLimit("127.0.0.1").allowed).toBe(true);

    const blocked = checkRateLimit("127.0.0.1");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });
});
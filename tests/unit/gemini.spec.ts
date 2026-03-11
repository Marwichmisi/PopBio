import { describe, expect, it } from "vitest";
import { buildPrompt, getBilingualInstruction } from "@/lib/gemini";

describe("gemini prompt", () => {
  it("force un resultat bilingue pour une entree francaise", () => {
    const instruction = getBilingualInstruction("fr");
    expect(instruction).toContain("bilingue FR/EN");
    expect(instruction).toContain("1 bio en francais et 1 bio en anglais");
  });

  it("force un resultat bilingue pour une entree anglaise", () => {
    const instruction = getBilingualInstruction("en");
    expect(instruction).toContain("bilingual FR/EN");
    expect(instruction).toContain("2 bios in French then 2 bios in English");
  });

  it("inclut des consignes bilingues explicites dans le prompt complet", () => {
    const prompt = buildPrompt("Developpeur full stack", "both");
    expect(prompt).toContain("CONSigne BILINGUE");
    expect(prompt).toContain("1 bio en francais et 1 bio en anglais");
    expect(prompt).toContain("melanger le francais et l'anglais");
  });
});
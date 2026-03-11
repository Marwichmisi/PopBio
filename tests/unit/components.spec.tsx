import React from "react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BioForm } from "@/components/BioForm";
import { BioResults } from "@/components/BioResults";
import { BioCard } from "@/components/BioCard";
import type { BioVariant } from "@/types";

const twitterBio: BioVariant = {
  id: "twitter-1",
  text: "Developpeur React #frontend #web",
  platform: "twitter",
  length: "short",
  charCount: 33,
  createdAt: new Date().toISOString(),
};

const linkedinBio: BioVariant = {
  id: "linkedin-1",
  text: "Developer focused on AI products and product engineering.",
  platform: "linkedin",
  length: "long",
  charCount: 57,
  createdAt: new Date().toISOString(),
};

describe("BioForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("soumet une saisie libre valide", () => {
    const onGenerate = vi.fn();
    render(<BioForm onGenerate={onGenerate} isLoading={false} />);

    fireEvent.change(screen.getByLabelText("Parle-nous de toi"), {
      target: { value: "Je suis developpeur full stack React" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Générer mes bios" }));

    expect(onGenerate).toHaveBeenCalledWith("Je suis developpeur full stack React");
  });

  it("soumet le mode guide avec les trois parametres", () => {
    const onGenerate = vi.fn();
    render(<BioForm onGenerate={onGenerate} isLoading={false} />);

    fireEvent.click(screen.getByRole("button", { name: /Mode Guidé/i }));
    fireEvent.change(screen.getByTestId("job-input"), {
      target: { value: "Designer produit" },
    });
    fireEvent.change(screen.getByTestId("skills-input"), {
      target: { value: "Design system, Figma" },
    });
    fireEvent.change(screen.getByTestId("goal-input"), {
      target: { value: "Trouver des clients" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Générer mes bios/i }));

    expect(onGenerate).toHaveBeenCalledTimes(1);
    expect(onGenerate.mock.calls[0][0]).toContain("Designer produit");
    expect(onGenerate.mock.calls[0][0]).toContain("Design system");
    expect(onGenerate.mock.calls[0][0]).toContain("Trouver des clients");
  });

  it("affiche le countdown de rate limit", () => {
    render(
      <BioForm
        onGenerate={vi.fn()}
        isLoading={false}
        error="Trop de requetes. Veuillez patienter."
        retryAfter={23}
      />,
    );

    expect(screen.getByText("Nouvelle tentative possible dans 23s.")).toBeTruthy();
  });
});

describe("BioResults", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche les sections de resultats et permet un reset", () => {
    const onReset = vi.fn();

    render(
      <BioResults
        bios={[twitterBio, linkedinBio]}
        hashtags={["#dev", "#react", "#ai", "#design", "#product"]}
        onReset={onReset}
      />,
    );

    expect(screen.getAllByText("Twitter / X").length).toBeGreaterThan(0);
    expect(screen.getAllByText("LinkedIn").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /Nouvelle génération/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it("copie un hashtag et un statut", async () => {
    render(
      <BioResults
        bios={[twitterBio, linkedinBio]}
        hashtags={["#dev", "#react", "#ai", "#design", "#product"]}
        onReset={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "#dev" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Copié!/i })).toBeTruthy();
    });

    fireEvent.click(screen.getByRole("button", { name: /Partager l'outil/i }));

    await waitFor(() => {
      expect(screen.getByText("Statut copié !")).toBeTruthy();
    });
  });
});

describe("BioCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("copie une bio Twitter adaptee pour X", async () => {
    render(<BioCard bio={twitterBio} />);

    fireEvent.click(screen.getByRole("button", { name: /Copier cette bio/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Brio copié/i).length).toBeGreaterThan(0);
    });
  });

  it("affiche un fallback manuel si le clipboard echoue", async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(new Error("denied"));

    render(<BioCard bio={linkedinBio} />);
    fireEvent.click(screen.getByRole("button", { name: /Copier/i }));

    await waitFor(() => {
      expect(screen.getByText(/Copie auto indisponible/i)).toBeTruthy();
    });
    expect(globalThis.prompt).toHaveBeenCalled();
  });
});
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { NextRequest } from "next/server";

const { checkRateLimitMock, generateBiosMock } = vi.hoisted(() => {
  return {
    checkRateLimitMock: vi.fn(),
    generateBiosMock: vi.fn(),
  };
});

vi.mock("@/lib/rateLimiter", () => ({
  checkRateLimit: checkRateLimitMock,
}));

vi.mock("@/lib/gemini", () => ({
  generateBios: generateBiosMock,
}));

import { POST } from "@/app/api/generate/route";

function createRequest(body: unknown, headers?: HeadersInit) {
  return new NextRequest("http://localhost:3000/api/generate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(headers || {}),
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/generate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    checkRateLimitMock.mockReturnValue({ allowed: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("retourne 400 si le texte est invalide", async () => {
    const response = await POST(createRequest({ input: "court" }));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.field).toBe("input");
  });

  it("retourne 429 si le rate limit est atteint", async () => {
    checkRateLimitMock.mockReturnValue({ allowed: false, retryAfter: 42 });

    const response = await POST(
      createRequest(
        { input: "Je suis developpeur full stack React et Node.js" },
        { "x-forwarded-for": "127.0.0.1" },
      ),
    );
    const json = await response.json();

    expect(response.status).toBe(429);
    expect(json.retryAfter).toBe(42);
    expect(response.headers.get("Retry-After")).toBe("42");
  });

  it("retourne 200 avec les bios generes", async () => {
    generateBiosMock.mockResolvedValue({
      bios: [
        {
          id: "bio-1",
          text: "Dev full stack",
          platform: "twitter",
          length: "short",
          charCount: 14,
          createdAt: new Date().toISOString(),
        },
      ],
      hashtags: ["#dev", "#react", "#node", "#web", "#fullstack"],
    });

    const response = await POST(
      createRequest({ input: "Je suis developpeur full stack React et Node.js" }),
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.sessionId).toBeTypeOf("string");
    expect(json.hashtags).toHaveLength(5);
    expect(generateBiosMock).toHaveBeenCalled();
  });

  it("retourne 504 sur timeout Gemini", async () => {
    generateBiosMock.mockRejectedValue(new Error("Generation timeout"));

    const response = await POST(
      createRequest({ input: "Je suis developpeur full stack React et Node.js" }),
    );
    const json = await response.json();

    expect(response.status).toBe(504);
    expect(json.error).toContain("pris trop de temps");
  });

  it("retourne 500 sur erreur de configuration API", async () => {
    generateBiosMock.mockRejectedValue(new Error("No API key configured"));

    const response = await POST(
      createRequest({ input: "Je suis developpeur full stack React et Node.js" }),
    );
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toContain("configuration API");
  });
});
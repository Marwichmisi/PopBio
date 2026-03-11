export const RATE_LIMIT = {
  maxRequests: 1,
  windowMs: 60 * 1000,
} as const;

export const INPUT_LIMITS = {
  minChars: 10,
  maxChars: 2000,
} as const;

export const BIO_LIMITS = {
  twitter: {
    short: 100,
    long: 200,
    max: 280,
  },
  linkedin: {
    short: 150,
    long: 260,
    max: 3000,
  },
} as const;

export const HASHTAG_COUNT = 5;

export const API_CONFIG = {
  model: "gemini-2.5-flash",
  timeoutMs: 40000,
  maxRetries: 2,
} as const;

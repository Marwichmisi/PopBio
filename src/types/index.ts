export type Platform = "twitter" | "linkedin";
export type BioLength = "short" | "long";
export type Language = "fr" | "en" | "both";

export interface BioVariant {
  id: string;
  text: string;
  platform: Platform;
  length: BioLength;
  charCount: number;
  createdAt: string;
}

export interface UserInput {
  content: string;
  detectedLang: Language;
  timestamp: string;
}

export interface Hashtag {
  tag: string;
  relevance: number;
}

export interface GenerationSession {
  id: string;
  input: UserInput;
  bios: BioVariant[];
  hashtags: Hashtag[];
  createdAt: string;
}

export interface GenerateRequest {
  input: string;
}

export interface GenerateResponse {
  sessionId: string;
  bios: BioVariant[];
  hashtags: string[];
}

export interface ApiError {
  error: string;
  field?: string;
}

export interface RateLimitError extends ApiError {
  retryAfter?: number;
}

export interface StoredSession {
  id: string;
  input: string;
  bios: BioVariant[];
  hashtags: string[];
  createdAt: string;
}

export interface StorageData {
  history: StoredSession[];
  settings: {
    theme: "dark" | "light";
  };
}

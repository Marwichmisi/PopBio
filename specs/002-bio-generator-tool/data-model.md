# Data Model: Bio Generator Tool

## Entities

### BioVariant
Represents a generated bio for a specific platform.

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| id | string | UUID | Unique identifier |
| text | string | 1-2000 chars | The bio text content |
| platform | "twitter" \| "linkedin" | Required | Target platform |
| length | "short" \| "long" | Required | Length category |
| charCount | number | Read-only | Character count |
| createdAt | Date | Auto | Timestamp |

### UserInput
The raw input from the user.

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| content | string | 10-2000 chars | Raw user text |
| detectedLang | "fr" \| "en" \| "both" | Auto-detected | Language |
| timestamp | Date | Auto | When submitted |

### Hashtag
Suggested hashtag for the user.

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| tag | string | starts with # | Hashtag text |
| relevance | number | 0-1 | AI-assigned relevance |

### GenerationSession
Group of bios generated from one user input.

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| id | string | UUID | Session ID |
| input | UserInput | Required | Original input |
| bios | BioVariant[] | 6-8 items | Generated bios |
| hashtags | Hashtag[] | 5 items | Suggested hashtags |
| createdAt | Date | Auto | Timestamp |

---

## State Transitions

```
User Input → [Validate] → API Request → [Rate Limit Check] → [Gemini Call] → Display Results
                                  ↓ (if rate limited)
                              Return 429
```

---

## localStorage Schema

```typescript
interface StoredSession {
  id: string;
  input: string;
  bios: BioVariant[];
  hashtags: string[];
  createdAt: string; // ISO date
}

interface StorageData {
  history: StoredSession[];
  settings: {
    theme: 'dark' | 'light';
  };
}
```

---

## API Request/Response

### POST /api/generate

**Request Body:**
```typescript
{
  input: string; // 10-2000 chars
}
```

**Response (200):**
```typescript
{
  sessionId: string;
  bios: BioVariant[];
  hashtags: string[];
}
```

**Response (400):** Validation error
```typescript
{
  error: string;
  field?: string;
}
```

**Response (429):** Rate limited
```typescript
{
  error: string;
  retryAfter: number; // seconds
}
```

**Response (500):** Server error
```typescript
{
  error: string;
}
```

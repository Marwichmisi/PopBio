# API Contracts: Bio Generator Tool

## External Interface: REST API

This web application exposes a single API endpoint for bio generation.

### Endpoint: POST /api/generate

Generates optimized Twitter/X and LinkedIn bios from user input.

#### Request

```
POST /api/generate
Content-Type: application/json
```

**Body:**
```json
{
  "input": "Développeur full-stack passioné par React et Node.js"
}
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| input | string | Yes | 10-2000 characters |

#### Success Response (200)

```json
{
  "sessionId": "uuid-v4",
  "bios": [
    {
      "id": "uuid-v4",
      "text": "Développeur full-stack 🚀 | React & Node.js | Passionné par le code propre",
      "platform": "twitter",
      "length": "short",
      "charCount": 72
    },
    {
      "id": "uuid-v4",
      "text": "Développeur full-stack passionné par React et Node.js. Je crée des applications web performantes et accessibles.",
      "platform": "linkedin",
      "length": "long",
      "charCount": 108
    }
  ],
  "hashtags": [
    "#Développeur",
    "#ReactJS",
    "#NodeJS",
    "#WebDev",
    "#FullStack"
  ]
}
```

#### Error Responses

**400 - Validation Error:**
```json
{
  "error": "Input must be at least 10 characters",
  "field": "input"
}
```

**429 - Rate Limited:**
```json
{
  "error": "Rate limit exceeded. Try again in 45 seconds.",
  "retryAfter": 45
}
```

**500 - Server Error:**
```json
{
  "error": "Failed to generate bios. Please try again."
}
```

---

## Internal Interface: React Components

### BioForm Component

```typescript
interface BioFormProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
  error?: string;
}
```

### BioResults Component

```typescript
interface BioResultsProps {
  bios: BioVariant[];
  hashtags: string[];
  onCopy: (text: string, platform: 'twitter' | 'linkedin') => void;
}
```

### BioCard Component

```typescript
interface BioCardProps {
  bio: BioVariant;
  onCopy: (platform?: 'twitter' | 'linkedin') => void;
  copied: boolean;
}
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| GEMINI_API_KEYS | Yes | Comma-separated API keys for rotation |
| RATE_LIMIT_WINDOW | No | Rate limit window in seconds (default: 60) |
| RATE_LIMIT_MAX | No | Max requests per window (default: 3) |

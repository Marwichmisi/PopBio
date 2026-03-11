# Research: Bio Generator Tool

## Technology Decisions

### Decision: Next.js 14 App Router
**Rationale**: 
- Excellent Vercel integration for free hosting
- Server-side API routes for secure Gemini API calls (protects API keys)
- React Server Components for optimal performance
- Built-in TypeScript support

**Alternatives considered**:
- Vite + React: Simpler but requires separate API deployment
- Plain HTML/JS: Too basic for maintainability

---

### Decision: Google Gemini 2.5 Flash API
**Rationale**:
- Fast and cost-effective for text generation
- Supports multilingual output (FR/EN)
- Excellent for short-form content generation

**Alternatives considered**:
- OpenAI GPT-4: More expensive, slower
- Claude: Good but less focused on short-form

---

### Decision: shadcn/ui + Tailwind CSS
**Rationale**:
- Modern, accessible components
- Easy customization with design tokens
- Dark mode support built-in

**Alternatives considered**:
- MUI: Too heavy, complex theming
- DaisyUI: Good but less polished

---

### Decision: Vitest + React Testing Library
**Rationale**:
- Fast test execution
- Jest-compatible syntax
- Industry standard for React testing

**Alternatives considered**:
- Jest: Slightly slower, older
- Cypress: Better for e2e, overkill for unit

---

## Implementation Best Practices

### API Key Rotation
- Store multiple keys in `GEMINI_API_KEYS` env var (comma-separated)
- Implement retry logic with exponential backoff
- Rotate to next key on rate limit or quota error
- Log key rotation events for debugging

### Rate Limiting
- Implement in-memory rate limiter (Map<ip, timestamp[]>)
- 3 requests per minute per IP
- Return 429 status with retry-after header

### Security
- Never expose API keys in client-side code
- Use Next.js API routes (/app/api/generate/route.ts)
- Validate input on server side
- Sanitize output before display

### Performance
- Debounce input to prevent excessive API calls
- Cache successful responses in sessionStorage
- Lazy load result components

---

## Data Flow

```
User Input → Client (React) → Next.js API Route → Gemini API → Response → Client Display
                                    ↓
                            Rate Limiter (in-memory)
                                    ↓
                            API Key Rotator
```

---

## File Structure Rationale

- `/app` - Next.js App Router pages
- `/components` - React UI components
- `/lib` - Utility functions and API clients
- `/hooks` - Custom React hooks
- `/types` - TypeScript type definitions

This structure follows Next.js conventions and separates concerns cleanly.

# Quickstart: Bio Generator Tool

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key(s)

## Setup

1. **Clone and install:**
   ```bash
   cd PopBio
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```

3. **Add your API keys:**
   ```
   GEMINI_API_KEYS=your-gemini-key-1,your-gemini-key-2
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Navigate to http://localhost:3000

## Usage

1. Enter your bio text (minimum 10 characters)
2. Click "Générer"
3. View 6-8 generated bios (4 Twitter, 4 LinkedIn)
4. Copy any bio with one click
5. Use "Copier pour X" or "Copier pour LinkedIn" for platform-specific formatting

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx        # Main page
│   ├── layout.tsx      # Root layout
│   ├── globals.css     # Global styles
│   └── api/
│       └── generate/   # API route
├── components/         # React components
├── lib/               # Utilities
├── hooks/             # Custom hooks
└── types/             # TypeScript types
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEYS` | Yes | Comma-separated API keys |
| `RATE_LIMIT_WINDOW` | No | Rate limit window (default: 60s) |
| `RATE_LIMIT_MAX` | No | Max requests per window (default: 3) |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **API:** Google Gemini 2.5 Flash
- **Testing:** Vitest + React Testing Library

## Deployment

Deploy to Vercel with zero configuration:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

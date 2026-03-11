# Implementation Plan: Bio Generator Tool

**Branch**: `002-bio-generator-tool` | **Date**: 2026-03-10 | **Spec**: `/specs/002-bio-generator-tool/spec.md`
**Input**: Feature specification from `/specs/002-bio-generator-tool/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Web application for generating optimized Twitter/X and LinkedIn bios using Google Gemini 2.5 Flash API. Single-page app with dark mode, responsive design, localStorage history, and rate limiting (3 req/min). No authentication required.

**Design Tokens**: #1A535C (primary), #4ECDC4 (accent), #F7FFF7 (background)

## Technical Context

**Language/Version**: TypeScript / JavaScript (ESNext)  
**Primary Dependencies**: Next.js 14+, React 18, Tailwind CSS, Google Gemini API, shadcn/ui components  
**Storage**: localStorage (history), environment variables (API keys) - No database  
**Testing**: Vitest + React Testing Library  
**Target Platform**: Web (Vercel free plan), modern browsers (Chrome, Firefox, Safari, Edge)  
**Project Type**: Web application (single-page app)  
**Performance Goals**: Bio generation <8 seconds, responsive on mobile/desktop  
**Constraints**: Dark mode default, 3 requests/minute per IP, no auth, no database  
**Scale/Scope**: Single user, simple scope, free tier hosting

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: No constitution defined in `.specify/memory/constitution.md` - skipping gates.

---

## Project Structure

### Documentation (this feature)

```text
specs/002-bio-generator-tool/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Web application structure
src/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Root layout (dark mode default)
│   ├── globals.css           # Global styles + design tokens
│   └── api/
│       └── generate/
│           └── route.ts      # POST /api/generate
├── components/
│   ├── BioForm.tsx           # Input form component
│   ├── BioResults.tsx        # Results display
│   ├── BioCard.tsx           # Individual bio card
│   ├── Header.tsx            # App header
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── gemini.ts             # Gemini API client (multi-key rotation)
│   ├── rateLimiter.ts        # Rate limiter middleware
│   ├── storage.ts            # localStorage utilities
│   ├── utils.ts              # Utility functions
│   └── constants.ts          # App constants
├── hooks/
│   └── useBioGenerator.ts    # Bio generation hook
├── types/
│   └── index.ts              # TypeScript types
└── styles/
    └── design-tokens.ts       # Colors: #1A535C, #4ECDC4, #F7FFF7

public/
└── favicon.ico

tests/
├── unit/
├── integration/
└── e2e/

.env.example
.env.local                    # Your API keys
next.config.js
tailwind.config.ts
tsconfig.json
package.json
vitest.config.ts
```

**Structure Decision**: Next.js 14 App Router with TypeScript, Tailwind CSS for styling, shadcn/ui components, Vitest for testing. This is the modern standard for React web apps with excellent Vercel integration.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

# Tasks: Bio Generator Tool

**Feature**: 002-bio-generator-tool | **Generated**: 2026-03-10

---

## Implementation Strategy

**MVP Scope**: User Story 1 (P1) - Generate bios from text input. This is the core functionality that enables the application.

**Delivery Approach**: Incremental

- Phase 1-2: Setup & Foundation (blocking prerequisites)
- Phase 3: US1 (MVP - core bio generation)
- Phase 4-8: Additional user stories in priority order

---

## Phase 1: Setup

Project initialization and tooling.

- [x] T001 Initialize Next.js 14 project with TypeScript in project root
- [x] T002 Configure Tailwind CSS with dark mode support
- [x] T003 Set up shadcn/ui components (button, input, textarea, card, toast, dropdown-menu, scroll-area)
- [x] T004 Create .env.example with GEMINI_API_KEYS variable
- [x] T005 Install and configure Vitest + React Testing Library
- [x] T006 Set up ESLint and Prettier configuration
- [x] T007 Configure design tokens (#1A535C, #4ECDC4, #F7FFF7)

---

## Phase 2: Foundational

Core infrastructure tasks that block all user stories.

- [x] T007 Create design tokens in src/styles/design-tokens.ts (#1A535C, #4ECDC4, #F7FFF7)
- [x] T008 Create TypeScript types in src/types/index.ts (BioVariant, UserInput, Hashtag, GenerationSession, API types)
- [x] T009 Create constants in src/lib/constants.ts (rate limits, character limits)
- [x] T010 Create utility functions in src/lib/utils.ts (character counting, validation, formatting)
- [x] T011 Create Gemini API client in src/lib/gemini.ts (single key, multi-key rotation, error handling)
- [x] T012 Create rate limiter middleware in src/lib/rateLimiter.ts (in-memory, IP-based)
- [x] T013 Create useBioGenerator custom hook in src/hooks/useBioGenerator.ts
- [x] T014 Create localStorage utility in src/lib/storage.ts (history, settings)

---

## Phase 3: User Story 1 - Generate Bios (P1)

**Goal**: User can input text and generate 6-8 optimized bios for Twitter/X and LinkedIn

**Independent Test**: Enter text (10+ chars) → Click "Générer" → Verify 6-8 bios appear (4 Twitter <280 chars, 4 LinkedIn)

- [x] T015 [P] [US1] Create BioForm component in src/components/BioForm.tsx
- [x] T016 [P] [US1] Create BioCard component in src/components/BioCard.tsx
- [x] T017 [P] [US1] Create BioResults component in src/components/BioResults.tsx
- [x] T018 [US1] Create API route POST /api/generate in src/app/api/generate/route.ts
- [x] T019 [US1] Implement Gemini prompt generation for 4 Twitter + 4 LinkedIn bios
- [x] T020 [US1] Implement language detection (FR/EN) and bilingual generation
- [x] T021 [US1] Integrate BioForm with useBioGenerator hook
- [x] T022 [US1] Display loading state during generation
- [x] T023 [US1] Handle API errors (500, timeout >10s) with retry option

---

## Phase 4: User Story 2 - Copy Bio (P2)

**Goal**: User can copy any bio with character counter (green <280, orange >=280)

**Independent Test**: Generate bios → Verify character counter colors → Click copy → Verify clipboard + feedback

- [x] T024 [P] [US2] Implement clipboard copy with visual feedback in BioCard
- [x] T025 [US2] Add character counter with color coding (green/orange) to BioCard
- [x] T026 [US2] Handle clipboard permission denied error gracefully

---

## Phase 5: User Story 3 - Platform-Specific Copy (P2)

**Goal**: User can copy bio adapted for Twitter or LinkedIn (add/remove emojis/hashtags)

**Independent Test**: Generate bios → Click "Copier pour X" → Verify hashtags removed → Click "Copier pour LinkedIn" → Verify emojis added

- [x] T027 [US3] Add "Copier pour X" button that removes/reduces hashtags
- [x] T028 [US3] Add "Copier pour LinkedIn" button that adds relevant emojis

---

## Phase 6: User Story 4 - Responsive UI (P3)

**Goal**: Dark mode by default, works on mobile and desktop

**Independent Test**: Open on mobile → Verify all elements accessible → Open on desktop → Verify dark mode default

- [x] T029 [P] [US4] Apply dark mode as default theme in src/app/layout.tsx
- [x] T030 [P] [US4] Create responsive layout with Tailwind breakpoints
- [x] T031 [US4] Style BioForm and BioResults for mobile-first design
- [x] T032 [US4] Add "Partager sur statut" button with pre-filled message

---

## Phase 7: User Story 5 - Hashtag Suggestions (P3)

**Goal**: Display 5 relevant hashtags with generated bios

**Independent Test**: Generate bios → Verify 5 hashtags appear below results

- [x] T033 [P] [US5] Extract and display 5 hashtags from Gemini response
- [x] T034 [P] [US5] Add click-to-copy functionality for hashtags
- [x] T035 [US5] Style hashtags display with # prefix and visual distinction

---

## Phase 8: Polish & Cross-Cutting

Additional features and refinements.

- [x] T036 [P] Implement localStorage history (FR-016)
- [x] T037 [P] Add interactive mode with 3 predefined questions (FR-017)
- [x] T038 Add rate limit error handling with countdown (FR-015)
- [x] T039 Implement API key rotation logging
- [x] T040 Add error boundary and fallback UI
- [ ] T041 Verify all 20 functional requirements from spec.md

---

## Dependencies

```
Phase 1 (Setup: T001-T007)
  ↓
Phase 2 (Foundational: T008-T014) ← BLOCKS ALL USER STORIES
  ↓
Phase 3 (US1: T015-T023) ← MVP (core value)
  ↓
Phase 4 (US2: T024-T026) ← depends on Phase 3
  ↓
Phase 5 (US3: T027-T028) ← depends on Phase 4
  ↓
Phase 6 (US4: T029-T032) ← independent (can parallel with others)
  ↓
Phase 7 (US5: T033-T035) ← depends on Phase 3
  ↓
Phase 8 (Polish: T036-T041) ← final touches
```

---

## Parallel Execution Opportunities

The following tasks can run in parallel (marked with [P]):

- T007: Design tokens setup
- T008-T014: Foundational infrastructure (independent files)
- T015, T016, T017: Component creation (independent files)
- T024, T025, T026: US2 features (independent features)
- T027, T028: Platform-specific copy buttons
- T029, T030, T031: US4 responsive UI
- T033, T034, T035: US5 hashtag features
- T036, T037: Polish features

---

## Independent Test Criteria

| User Story | Test Criteria                                                                    |
| ---------- | -------------------------------------------------------------------------------- |
| US1 (P1)   | Enter 10+ chars → Click "Générer" → 6-8 bios appear (4 Twitter <280, 4 LinkedIn) |
| US2 (P2)   | Character counter shows green (<280) or orange (>=280), copy shows feedback      |
| US3 (P2)   | "Copier pour X" removes hashtags, "Copier pour LinkedIn" adds emojis             |
| US4 (P3)   | Dark mode default, mobile responsive without zoom                                |
| US5 (P3)   | 5 hashtags displayed after generation                                            |

---

## Summary

- **Total Tasks**: 41
- **User Stories**: 5 (1 P1, 2 P2, 2 P3)
- **MVP Tasks**: Phase 1-3 (22 tasks) - Core bio generation
- **Parallelizable Tasks**: 18
- **Phases**: 8

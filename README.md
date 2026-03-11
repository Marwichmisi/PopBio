# PopBio

PopBio est une application Next.js qui genere des bios optimisées pour Twitter/X et LinkedIn a partir d'un texte libre ou d'un mode guide a 3 questions.

## Fonctionnalites actuelles

- generation de 4 bios Twitter/X et 4 bios LinkedIn
- suggestions de 5 hashtags
- mode guide avec questions sur le metier, le ton et l'objectif
- historique local via `localStorage`
- rate limit a 3 requetes par minute avec countdown cote client
- copie simple, copie adaptee par plateforme et fallback manuel si le clipboard echoue
- partage de statut avec message pre-rempli

## Prerequis

- Node.js 18+
- npm
- une ou plusieurs cles Gemini

## Installation

```bash
npm install
cp .env.example .env.local
```

Ajoute ensuite tes cles API dans `.env.local` :

```bash
GEMINI_API_KEYS=cle1,cle2,cle3
```

## Commandes utiles

```bash
npm run dev
npm run lint
npm run build
npm test -- --run
```

## Stack technique

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Google Generative AI SDK
- Vitest

## Structure utile

```text
src/app/api/generate/route.ts   API de generation
src/components/                 composants UI
src/hooks/useBioGenerator.ts    orchestration client
src/lib/gemini.ts               integration Gemini + retries
src/lib/rateLimiter.ts          rate limiting memoire
src/lib/storage.ts              persistance locale
tests/unit/                     tests unitaires
```

## Etat qualite actuel

- `npm run lint` passe
- `npm run build` passe
- `npm test -- --run` passe

## Remediation en cours

Le plan de correction suivi dans le repo est disponible dans `specs/002-bio-generator-tool/remediation-tasks.md`.

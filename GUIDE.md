# Guide de démarrage - PopBio

## Prérequis

Assurez-vous d'avoir installé:

- Node.js 18+
- npm ou yarn

## Installation

```bash
cd ~/Bureau/Outils/challenge/PopBio
npm install
```

## Configuration

### 1. Ajouter votre clé API Gemini

Créez un fichier `.env.local` à la racine du projet:

```bash
echo "GEMINI_API_KEYS=votre_cle_api_gemini" > .env.local
```

Pour obtenir une clé API Gemini:

1. Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Créez une clé API
3. Copiez-la dans le fichier `.env.local`

### 2. (Optionnel) Multiple clés API

Pour utiliser la rotation de clés:

```bash
echo "GEMINI_API_KEYS=cle1,cle2,cle3" > .env.local
```

## Lancer l'application

Si `npm run dev` ne fonctionne pas:

```bash
# Option 1: Utiliser npx
npx next dev

# Option 2: Ou directement
./node_modules/.bin/next dev
```

L'application sera disponible sur: **http://localhost:3000**

## Commandes disponibles

| Commande        | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Lance le serveur de développement   |
| `npm run build` | Build l'application pour production |
| `npm run start` | Lance l'app en production           |
| `npm run lint`  | Vérifie le code ESLint              |
| `npm test`      | Lance les tests Vitest              |

## Structure du projet

```
src/
├── app/
│   ├── api/generate/route.ts  # API de génération
│   ├── layout.tsx             # Layout principal
│   ├── page.tsx               # Page d'accueil
│   └── globals.css            # Styles globaux
├── components/
│   ├── BioForm.tsx            # Formulaire de saisie
│   ├── BioCard.tsx            # Carte de bio
│   ├── BioResults.tsx         # Résultats
│   ├── Header.tsx             # En-tête
│   └── ui/                    # Composants UI
├── lib/
│   ├── gemini.ts              # Client API Gemini
│   ├── rateLimiter.ts         # Rate limiting
│   ├── storage.ts             # localStorage
│   ├── utils.ts              # Utilitaires
│   └── constants.ts          # Constantes
├── hooks/
│   └── useBioGenerator.ts    # Hook React
├── types/
│   └── index.ts              # Types TypeScript
└── styles/
    └── design-tokens.ts      # Design tokens
```

## Tests

### Lancer les tests

```bash
npm test
```

### Ajouter des tests

Créez des fichiers `.test.ts` ou `.spec.ts` dans:

- `tests/unit/` - Tests unitaires
- `tests/integration/` - Tests d'intégration

## Résolution de problèmes

### "next: not found"

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Erreur API Gemini

1. Vérifiez que `.env.local` existe
2. Vérifiez que la clé API est valide
3. Vérifiez les quotas Google AI

### Erreur de build

```bash
# Nettoyer le cache
rm -rf .next
npm run build
```

## Fonctionnalités implémentées

- ✅ Génération de 8 bios (4 Twitter + 4 LinkedIn)
- ✅ Détection de langue (FR/EN)
- ✅ Compteur de caractères avec code couleur
- ✅ Copier pour Twitter (sans hashtags)
- ✅ Copier pour LinkedIn (avec emojis)
- ✅ 5 hashtags suggérés
- ✅ Mode sombre par défaut
- ✅ Responsive (mobile/desktop)
- ✅ Rate limiting (3 requêtes/min)
- ✅ Historique localStorage
- ✅ Gestion d'erreurs

## API

### POST /api/generate

**Requête:**

```json
{
  "input": "Je suis développeur web..."
}
```

**Réponse:**

```json
{
  "sessionId": "uuid",
  "bios": [...],
  "hashtags": ["#dev", "#web", ...]
}
```

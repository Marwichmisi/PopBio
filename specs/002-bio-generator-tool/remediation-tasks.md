# Plan de remédiation PopBio

## Lot A - Stabilisation technique

- [x] Formaliser le plan de correction à partir de la spec et de l'audit
- [x] Corriger les design tokens Tailwind manquants
- [x] Corriger les erreurs ESLint bloquantes
- [x] Réaligner la documentation des variables d'environnement
- [x] Ajouter une base minimale de tests automatisés
- [x] Valider `npm run lint`
- [x] Valider `npm run build`
- [x] Valider `npm test -- --run`

## Lot B - Conformité API et Gemini

- [x] Aligner le modèle Gemini sur Gemini 2.5 Flash
- [x] Implémenter la rotation des clés avec retry réel
- [x] Valider strictement la forme de la réponse IA
- [x] Gérer proprement timeout, quota et erreurs de configuration
- [x] Rendre la détection de langue conforme au fallback bilingue FR/EN

## Lot C - Fonctionnalités manquantes côté produit

- [x] Brancher `ErrorBoundary` dans l'application
- [x] Ajouter l'historique visible basé sur `localStorage`
- [x] Implémenter le mode interactif à 3 questions
- [x] Ajouter la gestion UX du rate limit avec countdown
- [x] Ajouter un fallback utilisateur si le clipboard échoue
- [x] Aligner l'action de partage sur la spec produit

## Lot D - Vérification finale

- [x] Rejouer la matrice FR-001 à FR-020
- [x] Réaligner README, GUIDE et tâches du projet
- [x] Compléter les tests d'intégration et UI critiques
- [x] Refaire un audit qualité final
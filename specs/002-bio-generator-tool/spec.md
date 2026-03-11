# Feature Specification: PopBio - Générateur de bios optimisées pour Twitter/X et LinkedIn

**Feature Branch**: `002-bio-generator-tool`  
**Created**: 2026-03-10  
**Status**: Clarified  
**Input**: User description: "Feature: Générateur de bios optimisées pour Twitter/X et LinkedIn - Une application web simple et rapide qui permet à un utilisateur de générer des versions professionnelles et engageantes de sa bio pour Twitter/X (max 280 caractères) et LinkedIn (style plus long et formel)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Saisir du texte et générer des bios (Priority: P1)

En tant qu'utilisateur, je veux coller un texte libre (CV résumé, description personnelle ou idée brute) dans un champ de texte, puis cliquer sur un bouton "Générer" pour obtenir 6 à 8 variantes de bio optimisées pour Twitter/X et LinkedIn.

**Why this priority**: Cette fonctionnalité est le cœur de l'application. Sans elle, l'utilisateur ne peut pas utiliser l'outil du tout. Elle représente la proposition de valeur principale.

**Independent Test**: Peut être testé en saisissant un texte simple, en cliquant sur "Générer" et en vérifiant que 6-8 variantes apparaissent avec 4 optimisées Twitter (<280 caractères) et 4 optimisées LinkedIn.

**Acceptance Scenarios**:

1. **Given** l'utilisateur a saisi un texte d'au moins 10 caractères, **When** il clique sur "Générer", **Then** l'application affiche un chargement puis 6-8 variantes de bio
2. **Given** l'utilisateur a saisi un texte vide ou moins de 10 caractères, **When** il clique sur "Générer", **Then** un message d'erreur guide l'utilisateur pour saisir plus de texte
3. **Given** l'utilisateur a saisi un texte très long (plus de 2000 caractères), **When** il clique sur "Générer", **Then** l'application traite le texte et génère les variantes

---

### User Story 2 - Copier et utiliser une bio (Priority: P2)

En tant qu'utilisateur, je veux voir le texte complet de chaque bio générée avec un compteur de caractères (vert si <280, orange sinon), et pouvoir copier chaque bio en un clic.

**Why this priority**: L'objectif final est que l'utilisateur reparte avec des bios utilisables. Sans la fonctionnalité de copie, l'utilité de l'outil est fortement réduite.

**Independent Test**: Peut être testé en générant des bios, en vérifiant l'affichage du compteur de caractères avec les bonnes couleurs, et en cliquant sur "Copier" pour vérifier que le texte est copié.

**Acceptance Scenarios**:

1. **Given** une bio est affichée, **When** le texte fait moins de 280 caractères, **Then** le compteur affiche le nombre en vert
2. **Given** une bio est affichée, **When** le texte fait 280 caractères ou plus, **Then** le compteur affiche le nombre en orange
3. **Given** l'utilisateur clique sur "Copier", **Then** le texte est copié dans le presse-papiers et un feedback visuel confirme la copie

---

### User Story 3 - Copier pour une plateforme spécifique (Priority: P2)

En tant qu'utilisateur, je veux pouvoir copier une bio en adaptant son format pour Twitter ou LinkedIn (ajouter ou retirer emojis et hashtags selon la plateforme).

**Why this priority**: Les attentes sont différentes selon les plateformes. Twitter accepte les emojis mais pas les longs textes, LinkedIn supporte les hashtags et les textes plus longs. Cette fonctionnalité maximise l'utilité des bios générées.

**Independent Test**: Peut être testé en générant des bios, en utilisant "Copier pour X" ou "Copier pour LinkedIn" et en vérifiant que le format est adapté.

**Acceptance Scenarios**:

1. **Given** une bio LinkedIn avec hashtags, **When** l'utilisateur clique sur "Copier pour X", **Then** les hashtags sont retirés ou réduit
2. **Given** une bio Twitter sans emojis, **When** l'utilisateur clique sur "Copier pour LinkedIn", **Then** des emojis sont ajoutés si pertinent

---

### User Story 4 - Interface minimaliste et responsive (Priority: P3)

En tant qu'utilisateur, je veux une interface simple, en dark mode par défaut, qui fonctionne bien sur mobile et desktop.

**Why this priority**: L'outil doit être accessible et agréable à utiliser partout. Le dark mode est préféré par la cible (développeurs, créatifs).

**Independent Test**: Peut être testé en ouvrant l'application sur un téléphone mobile et un ordinateur, et en vérifiant l'affichage et la navigation.

**Acceptance Scenarios**:

1. **Given** l'utilisateur ouvre l'application, **When** il n'a pas de préférence de thème, **Then** le dark mode est appliqué par défaut
2. **Given** l'utilisateur ouvre sur mobile, **When** il visionne la page, **Then** tous les éléments sont accessibles et lisibles sans zoom

---

### User Story 5 - Suggestions de hashtags (Priority: P3)

En tant qu'utilisateur, je veux voir 5 hashtags suggérés qui correspondent à mon profil ou mon activité.

**Why this priority**: C'est un bonus nice-to-have qui ajoute de la valeur. Les hashtags pertinents aident à être trouvé.

**Independent Test**: Peut être testé en générant des bios et en vérifiant que des hashtags appropriés sont suggérés.

**Acceptance Scenarios**:

1. **Given** l'utilisateur génère des bios, **When** le processus est terminé, **Then** 5 hashtags pertinents sont affichés

---

### Edge Cases

- Que se passe-t-il si l'API de génération est indisponible ? → Afficher un message d'erreur clair avec suggestion de réessayer
- Que se passe-t-il si la génération prend plus de 10 secondes ? → Annuler la requête et afficher un timeout avec option de réessayer
- Que se passe-t-il si l'utilisateur refuse l'accès au presse-papiers ? → Afficher une alerte et permettre la sélection manuelle du texte
- Que se passe-t-il si l'utilisateur dépasse la limite de 3 requêtes/minute ? → Afficher un message informant de la limite et demander de patienter
- Que se passe-t-il si l'utilisateur saisit du texte dans une langue non supportée ? → Détecter la langue et générer les bios en bilingue FR/EN automatiquement

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: L'application DOIT permettre à l'utilisateur de saisir du texte libre dans un champ de texte (textarea)
- **FR-002**: L'application DOIT proposer un bouton "Générer" qui lance la création des variantes de bios
- **FR-003**: L'application DOIT générer exactement 4 variantes courtes (<280 caractères) optimisées pour Twitter/X
- **FR-004**: L'application DOIT générer exactement 4 variantes longues optimisées pour LinkedIn (style professionnel, storytelling, avec CTA)
- **FR-005**: Chaque bio affichée DOIT montrer le texte complet avec un compteur de caractères
- **FR-006**: Le compteur de caractères DOIT être vert quand le texte fait moins de 280 caractères, orange sinon
- **FR-007**: L'application DOIT proposer un bouton "Copier" pour chaque bio qui copie le texte dans le presse-papiers
- **FR-008**: L'application DOIT proposer des options "Copier pour X" et "Copier pour LinkedIn" qui adaptent le format
- **FR-009**: L'interface DOIT être en dark mode par défaut
- **FR-010**: L'application DOIT être responsive et fonctionner sur mobile et desktop
- **FR-011**: L'application NE DOIT PAS exiger d'inscription ou de création de compte
- **FR-012**: L'application NE DOIT PAS stocker de données utilisateur (session uniquement)
- **FR-013**: L'application DEVRAIT suggérer 5 hashtags pertinents en plus des bios (générés par l'IA en fonction du contenu)
- **FR-014**: L'application DEVRAIT détecter automatiquement la langue du texte saisi (FR/EN) et générer les bios en bilingue FR/EN
- **FR-015**: L'application DOIT limiter les requêtes à 3 par minute par adresse IP pour éviter les abus
- **FR-016**: L'application DEVRAIT sauvegarder l'historique des générations dans le localStorage pour améliorer l'expérience utilisateur
- **FR-017**: L'application DEVRAIT proposer un mode interactif avec 3 questions prédéfinies si l'utilisateur est indécis
- **FR-018**: L'application DOIT proposer un bouton "Partager sur statut" avec message pré-rempli
- **FR-019**: L'application DOIT utiliser des variables d'environnement pour stocker les clés API
- **FR-020**: L'application DOIT supporter plusieurs clés API séparées par virgule avec rotation automatique en cas d'échec

### Key Entities

- **BioVariant**: Représente une version générée de la bio utilisateur, avec attributs: texte, plateforme cible (Twitter/LinkedIn), longueur (courte/longue), compteur caractères
- **UserInput**: Représente le texte brut saisi par l'utilisateur, avec attributs: contenu texte, langue détectée, timestamp

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Les utilisateurs peuvent générer des bios en moins de 8 secondes (du clic à l'affichage complet)
- **SC-002**: Les utilisateurs repartent avec au moins 2-3 bios qu'ils souhaitent utiliser (mesurable via test utilisateur)
- **SC-003**: Aucune anomalie bloquante n'est détectée sur mobile et desktop (0 bug bloquant en test)
- **SC-004**: 90% des utilisateurs saisissent leur texte et obtiennent des résultats sans erreur
- **SC-005**: Les bios générées sont perçues comme meilleures qu'une bio générique ChatGPT (test de comparaison utilisateur)

---

## Assumptions

- L'API d'IA utilisée est Google Gemini 2.5 Flash avec rotation des clés API en cas de limite atteinte
- Format .env : `GEMINI_API_KEYS=key1,key2,key3` (plusieurs clés séparées par virgule)
- Pas de base de données - tout en variables d'environnement ou localStorage
- L'utilisateur dispose d'une connexion internet stable
- Les navigateurs supportés incluent Chrome, Firefox, Safari, Edge (versions récentes)

---

## Clarifications

### Session 2026-03-10

- Q: Comment fonctionne l'assistant interactif ? → A: Questions prédéfinies (métier, ton, objectifs)
- Q: Comment fonctionne le partage viral ? → A: Bouton "Copier pour statut" avec message "Ma nouvelle bio générée par PopBio 🎉"
- Q: Gestion des API keys ? → A: Variables d'environnement (.env), pas de base de données, pas d'interface admin - rotation automatique via plusieurs clés séparées par virgule
- Q: Les hashtags sont-ils générés par l'IA ou via une liste prédéfinie ? → A: Générés par l'IA en fonction du contenu
- Q: Quelle action si la langue n'est ni français ni anglais ? → A: Génération bilingue FR/EN automatique
- Q: Quelle limite d'utilisation pour éviter les abus ? → A: 3 requêtes/minute par IP
- Q: Sauvegarder l'historique des générations ? → A: localStorage pour historique des générations
- Q: Modèle économique ? → A: Gratuit (pas de monétisation)
- Q: Qui fournit les API keys ? → A: Vous (le propriétaire de l'outil)
- Q: Hébergement ? → A: Vercel plan gratuit
- Q: Comment encourager le viral ? → A: Bouton "Partager sur statut" si satisfait
- Q: Couleurs du design ? → A: shadcn/ui style avec #1A535C #4ECDC4 #F7FFF7

---

## Vision & Objectifs

### Assistant interactif

Si l'utilisateur n'est pas sûr de ce qu'il veut dans sa bio, l'application pose 3 questions pour mieux le comprendre et générer une bio qui lui correspond vraiment.

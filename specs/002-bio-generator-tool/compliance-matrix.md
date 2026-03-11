# Matrice de conformité PopBio

Etat vérifié après remédiation technique et ajout de tests.

| Exigence | Statut | Notes |
| --- | --- | --- |
| FR-001 | Conforme | Saisie libre présente dans `BioForm`. |
| FR-002 | Conforme | Bouton de génération fonctionnel. |
| FR-003 | Conforme | Validation stricte de 4 bios Twitter côté serveur. |
| FR-004 | Conforme | Validation stricte de 4 bios LinkedIn côté serveur. |
| FR-005 | Conforme | Texte complet et compteur visibles dans `BioCard`. |
| FR-006 | Conforme | Couleur verte sous 280, orange sinon. |
| FR-007 | Conforme | Copie simple avec feedback et fallback manuel. |
| FR-008 | Conforme | Adaptation X et LinkedIn disponible sur chaque carte. |
| FR-009 | Conforme | Dark mode imposé au layout. |
| FR-010 | Conforme | UI responsive mobile/desktop. |
| FR-011 | Conforme | Aucune inscription ni authentification. |
| FR-012 | Decision produit | L'historique local est conservé suite à l'arbitrage produit validé pendant la remédiation. |
| FR-013 | Conforme | 5 hashtags exigés et validés côté serveur. |
| FR-014 | Conforme | Détection FR/EN conservée et prompt Gemini désormais explicitement bilingue FR/EN avec répartition demandée 2 FR puis 2 EN par plateforme. |
| FR-015 | Conforme | 3 requêtes/minute avec header `Retry-After` et countdown UI. |
| FR-016 | Conforme | Historique localStorage visible et réutilisable. |
| FR-017 | Conforme | Mode guidé à 3 questions livré dans `BioForm`. |
| FR-018 | Conforme | Bouton de partage de statut avec message prérempli copiable. |
| FR-019 | Conforme | Clés API lues depuis les variables d'environnement. |
| FR-020 | Conforme | Rotation de clés et retry automatique sur erreurs retryables. |

## Validation technique

- `npm run lint` : OK
- `npm run build` : OK
- `npm test -- --run` : OK

## Risques résiduels

- Les vulnérabilités de dépendances signalées par `npm audit` n'ont pas encore été traitées dans cette remédiation.
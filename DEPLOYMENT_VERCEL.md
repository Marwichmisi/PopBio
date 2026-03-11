# 🚀 Guide de Déploiement : PopBio sur Vercel

Ce guide détaille les étapes pas-à-pas pour mettre PopBio en ligne sur Vercel, l'hébergeur recommandé pour les applications Next.js.

## 📋 Prérequis
1. Avoir un compte [GitHub](https://github.com/), [GitLab](https://gitlab.com/) ou [Bitbucket](https://bitbucket.org/).
2. Avoir un compte [Vercel](https://vercel.com/) (le plan gratuit *Hobby* est parfait).
3. Avoir ton code PopBio versionné sur un dépôt distant (Repository).

---

## 🛠️ Étape 1 : Pousser ton code sur GitHub
Si ton code est seulement en local, tu dois le mettre sur GitHub pour que Vercel puisse le lire.
1. Ouvre ton terminal dans le dossier **PopBio**.
2. Tape les commandes suivantes :
   \`\`\`bash
   git add .
   git commit -m "Version finale PopBio prête pour production"
   git branch -M main
   \`\`\`
3. Va sur GitHub, crée un **nouveau repository** (privé ou public).
4. Relie ton terminal à GitHub et pousse ton code :
   \`\`\`bash
   git remote add origin https://github.com/TON_PROFIL/PopBio.git
   git push -u origin main
   \`\`\`

---

## 🌐 Étape 2 : Connecter Vercel au Repository
1. Connecte-toi à ton Dashboard [Vercel](https://vercel.com/dashboard).
2. Clique sur le bouton noir **"Add New..."** en haut à droite, puis sur **"Project"**.
3. Dans la section *Import Git Repository*, trouve ton dépôt **PopBio** et clique sur **"Import"**.

---

## ⚙️ Étape 3 : Configuration du Projet (Crucial)
Une vue de configuration s'ouvre. Configure-la exactement comme suit :

*   **Project Name** : `popbio` (ou le nom que tu veux voir dans l'URL).
*   **Framework Preset** : Confirme que `Next.js` est détecté automatiquement.
*   **Root Directory** : Laisse tel quel (`./`).

**🔐 Environnement Variables (Très important)**
C'est ici qu'on va mettre ta clé API secrète (ne jamais la mettre sur GitHub !).
1. Ouvre la section **"Environment Variables"**.
2. Dans **Name**, tape : `GEMINI_API_KEYS`
3. Dans **Value**, colle les clés API séparées par des virgules (celles de ton fichier `.env.local`).
4. Clique sur le bouton **"Add"**.

---

## 🚀 Étape 4 : Déploiement
1. Clique sur le gros bouton noir **"Deploy"**.
2. Vercel va maintenant exécuter `npm run build`. Cette étape prend environ 1 à 2 minutes. La magie opère en coulisse (optimisation, minification, edge functions).
3. Une fois terminé, une pluie de confettis virtuels s'affichera à l'écran 🎉 !

---

## 🔧 Étape 5 : Réglages Post-Déploiement (Optionnel mais recommandé)

### 1. Activer Vercel Analytics
Pour savoir combien de personnes visitent PopBio sans ajouter des scripts lourds (comme Google Analytics) :
* Va dans l'onglet **"Analytics"** de ton projet sur Vercel et clique sur **"Enable"**. C'est gratuit et ça compte les visites web.

### 2. Ajouter un nom de domaine personnalisé
Si tu as acheté un domaine (ex: `popbio.app` sur Hostinger, OVH ou GoDaddy) :
* Va dans les **"Settings"** du projet Vercel > **"Domains"**.
* Entre ton nom de domaine et suis leurs instructions (ajouter des enregistrements CNAME/A chez ton fournisseur).

### 3. Edge Network Execution Time (Timeout 504)
Par défaut, le plan Hobby de Vercel a un timeout d'API de 10 à 15 secondes. Nous avons déjà ajouté `export const maxDuration = 60;` dans le fichier de l'API. Sur un plan Vercel gratuit, cela ne posera aucun souci.

---
**Félicitations, ton application est maintenant vivante et partagée au monde entier ! 🌍**

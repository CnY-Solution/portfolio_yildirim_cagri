# Veille technologique Astral

Collecteur Python 3.11+ sans dépendance. Il consulte trois flux officiels en français et produit un petit instantané JSON consommé par la section `#/veille`.

```powershell
python -B tools/veille/update.py
python -B -m unittest discover -s tools/veille -v
```

Le chemin de sortie local est `public/data/veille.json`. L'option `--output` permet de choisir un autre fichier ; `--now 2026-11-13T12:00:00Z` réserve une horloge explicite aux vérifications reproductibles, pas aux publications courantes.

## Sélection et dates

Les sources sont définies dans `sources.json` : alertes du CERT-FR, actualités de la CNIL et blog technique francophone de Cloudflare. Les flux sont vérifiés directement ; aucune API de résumé ni proxy tiers n'intervient.

La sélection retient les publications datées des trente derniers jours, avec une tolérance d'un jour pour les fuseaux des éditeurs. Elle conserve au plus six informations et deux par source, classées de la plus récente à la plus ancienne. Des mots-clés écartent les publications sans lien apparent avec la veille sur les sources généralistes. Il s'agit d'un choix automatique de sources et de thèmes, pas d'un classement universel des informations les plus importantes.

`publishedAt` reste la date donnée par l'éditeur. `collectedAt` est l'heure de collecte. `lastSuccessAt` suit chaque source séparément. Les titres restent ceux des sources ; `context` est un repère de lecture général, pas un résumé de l'article ni une analyse personnelle de Cagri. Les titres de plus de 280 caractères sont écartés afin de respecter le contrat du lecteur.

## Pannes et validation

Chaque requête est limitée à quinze secondes et deux Mio, avec trois requêtes concurrentes au maximum. Les URL et redirections sont limitées à HTTPS et aux domaines explicites de chaque source. Les déclarations XML DTD et ENTITY sont refusées avant analyse. Aucun HTML du flux n'est injecté dans le site.

En cas d'échec partiel, la source porte `status: error`. Ses informations précédentes restent disponibles jusqu'à leur limite de trente jours, avec leurs dates d'origine. Sa date `lastSuccessAt` n'avance pas. Une source valide sans actualité récente est un succès vide, pas une panne. Si toutes les sources échouent, la commande échoue et conserve le fichier précédent octet pour octet. L'écriture du JSON est atomique.

## Activation dans le dépôt public

Le dépôt `CnY-Solution/portfolio_yildirim_cagri` contient le build servi depuis `main` à la racine. Y installer :

- `tools/veille/update.py`, `sources.json` et `test_update.py` ;
- le contenu initial dans `data/veille.json` ;
- le modèle `deploy/veille.yml` sous `.github/workflows/veille.yml`.

Le workflow utilise les permissions `contents: write` et `pages: write` du jeton éphémère `GITHUB_TOKEN`, sans secret supplémentaire. Le déclenchement quotidien est fixé à **06:23 UTC** (07:23 à Paris en hiver, 08:23 en été). Les tâches planifiées GitHub peuvent démarrer en retard. Un lancement manuel est prévu, ainsi qu'un lancement lors des changements du collecteur, de son workflow ou du JSON.

Après collecte et tests, le workflow commite uniquement `data/veille.json`, puis demande explicitement un build Pages. Ce dernier appel est nécessaire : un commit poussé par `GITHUB_TOKEN` ne lance pas spontanément un build Pages. Le réglage Pages reste `main / (root)` ; aucun passage à une source « GitHub Actions » n'est requis. Le job attend ensuite jusqu'à quatre minutes la confirmation `built` sur le SHA publié ; un simple accusé de mise en file n'est pas considéré comme un succès de publication. Aucun push forcé n'est effectué. Une publication concurrente peut faire échouer le job, à relancer après vérification.

Références officielles : [demander un build Pages](https://docs.github.com/en/rest/pages/pages#request-a-github-pages-build) et [déclenchement des publications depuis une branche](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#troubleshooting-publishing-from-a-branch).

Préserver ces outils, le workflow et `data/veille.json` lors des publications ultérieures du build. Une fois le workflow activé, contrôler un lancement réel et le JSON servi publiquement avant d'annoncer l'actualisation automatique opérationnelle.

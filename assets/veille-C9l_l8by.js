var e=`veille`,t=`Veille`,n=`Veille technologique et autoformation`,r=`**Sujet suivi\xA0: sécurité du cloud et gestion des identités (Microsoft Entra ID, Azure Key Vault, Zero Trust)**

Pourquoi ce sujet\xA0? Migrer vers le cloud sans maîtriser les risques liés aux identités et aux secrets (identifiants mal protégés, jetons expirés, permissions trop larges) expose à des fuites de données. Ce sujet recoupe mon travail quotidien (Azure AD Connect, MFA) et les enjeux réglementaires (RGPD, conformité cloud).

**Méthode et sources**
1. Flux RSS\xA0: Microsoft Tech Community (Azure Security), blogs de sécurité (Krebs on Security), sources françaises (CNIL, ANSSI).
2. Newsletters\xA0: Azure Updates (officielle), The Security Briefing (hebdomadaire).
3. Documentation\xA0: modules Microsoft Learn (gratuits, à jour).
4. Conférences\xA0: Microsoft Ignite en replay, France Cybersecurity Forum.

**Enseignements récents (depuis janvier 2025)**

1. **Zero Trust n'est pas un produit, c'est une stratégie.** C'est un changement de posture appliqué à chaque couche\xA0: identité, réseau, données. Dans Azure, il passe par l'accès conditionnel (MFA, conformité de l'appareil, localisation) et les groupes de sécurité réseau (NSG). Conséquence pour mon poste\xA0: revoir les GPO et les flux Power Automate pour exiger la MFA avant l'approbation des demandes sensibles.
2. **Les identités managées réduisent fortement le risque de fuite de secrets.** Une identité managée obtient automatiquement un jeton auprès de Microsoft Entra ID (ex-Azure AD)\xA0: aucun mot de passe stocké en clair. Cas concret\xA0: un script PowerShell de sauvegarde s'authentifie par identité managée au lieu d'un compte de service et de son mot de passe.
3. **Les équipements réseau sont eux aussi ciblés.** En 2025, des portes dérobées ont été découvertes sur des routeurs Juniper et des failles zero-day exploitées sur des pare-feu Cisco ASA. Les mises à jour et les images système ne sont pas neutres. Pour mon poste\xA0: télécharger les images IOS des commutateurs depuis une source fiable, versionner les binaires importants, vérifier leur empreinte SHA-256.

**À creuser prochainement**
- Infrastructure as Code sécurisée avec Terraform (limiter les permissions du principal de service Terraform).
- Conformité Azure (benchmarks CIS, piste d'audit SOC\xA02).`,i=[`Sujet suivi sur la durée`,`Méthode de veille`,`Sources et flux d'information`,`Enseignements récents`],a={order:5},o={slug:e,title:t,subtitle:n,description:r,keyPoints:i,metadata:a};export{o as default,r as description,i as keyPoints,a as metadata,e as slug,n as subtitle,t as title};
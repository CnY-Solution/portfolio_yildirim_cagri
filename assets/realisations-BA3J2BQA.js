var e=`realisations`,t=`Réalisations`,n=`Projets présentés pour l'épreuve E5`,r=`**Réalisation 1\xA0: migration Active Directory**
- **Contexte\xA0:** passage d'une forêt AD mono-domaine (Windows Server 2012 R2) à une architecture multi-domaines avec Azure AD Connect. 250 utilisateurs, plus de 50 serveurs applicatifs, aucune interruption tolérée.
- **Environnement technique\xA0:** Windows Server 2012 R2, Active Directory, Azure AD Connect.
- **Compétences mobilisées\xA0:** infrastructure système, sécurité AD, cloud hybride (Azure AD), documentation technique.
- **Résultat\xA0:** migration livrée dans les délais, sans interruption de la production.
- **Bilan\xA0:** gestion d'un cycle de projet réel (planning, pilote, déploiement).

---

**Réalisation 2\xA0: automatisation Power Automate (flux RH)**
- **Contexte\xA0:** le service RH traite les demandes de congés et d'attribution de matériel par e-mail et sous Excel. Suivi désorganisé, délais de 5 à 7\xA0jours.
- **Démarche\xA0:** deux flux Power Automate. Circuit des congés\xA0: demande, validation du manager, validation de la DRH, puis réponse automatique (accord ou refus).
- **Environnement technique\xA0:** Power Automate, SharePoint, SQL, Teams, Outlook.
- **Compétences mobilisées\xA0:** automatisation de processus, services cloud (SharePoint, SQL, Teams), analyse fonctionnelle.
- **Résultat\xA0:** 6 mois de production sans panne, gain estimé à 30\xA0h par mois pour le service RH.
- **Bilan\xA0:** rigueur dans la manipulation du JSON et gestion des cas limites (congés fractionnés, dépassement de budget).

---

**Réalisation 3\xA0: audit de sécurité et durcissement réseau**
- **Contexte\xA0:** un audit interne relève des règles de pare-feu trop permissives et des serveurs sans analyse antimalware.
- **Démarche\xA0:** captures réseau (Wireshark) pendant deux semaines, analyse des flux métier, proposition d'ACL selon le principe du moindre privilège, déploiement sur un domaine de test, puis validation après changement.
- **Environnement technique\xA0:** Wireshark, pare-feu, ACL, VLAN.
- **Compétences mobilisées\xA0:** sécurité réseau (pare-feu, ACL, VLAN), analyse technique (Wireshark, journaux), gestion du changement.
- **Résultat\xA0:** ACL déployées, audit conforme, aucun incident après le déploiement.
- **Bilan\xA0:** j'ai mesuré le poids politique des décisions de sécurité.`,i=[`Projets menés en entreprise`,`Système, automatisation et sécurité réseau`,`Contexte, démarche, résultat et bilan`],a={order:4},o={slug:e,title:t,subtitle:n,description:r,keyPoints:i,metadata:a};export{o as default,r as description,i as keyPoints,a as metadata,e as slug,n as subtitle,t as title};
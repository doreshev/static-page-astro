export const locales = ["en", "de", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
};

// NOTE: "Ronesans Trading" is the short/brand name used site-wide (header,
// footer, marketing copy). The full legal name, "Ronesans Trading Lux", is
// used only in legal contexts (imprint, privacy notice) -- kept separate
// from "Galkynysh Plastik", the manufacturer.
export const ui = {
  en: {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.certificates": "Certificates",
    "nav.catalogue": "Catalogue",
    "nav.contact": "Contact",
    "brand.tagline": "EU representative of Galkynysh Plastik",
    "home.eyebrow": "Official EU representative of Galkynysh Plastik",
    "home.title": "Plastic and polymer solutions built for the long term",
    "home.lead":
      "Ronesans Trading supplies HDPE pipes, geomembranes, drainage systems, and rubber products across the EU -- manufactured by Galkynysh Plastik to demanding technical standards.",
    "home.cta": "Browse the product range",
    "home.about.title": "About us",
    "home.about.body":
      "Ronesans Trading is the official European Union representative of Galkynysh Plastik, a modern manufacturing company specializing in high-quality plastic and polymer products for construction, infrastructure, agriculture, and industrial applications.\n\nGalkynysh Plastik's product range includes HDPE pipes, corrugated drainage pipes, geomembranes, geogrids, drainage membranes, irrigation systems, and rubber products such as paving tiles and curbstones. All products are designed to meet contemporary technical standards, ensuring durability, reliability, and a long service life across a wide range of climatic and operational conditions.\n\nCombining advanced production technology, strict quality control, and carefully selected raw materials, Galkynysh Plastik delivers products that comply with international norms -- with particular attention to environmental responsibility, offering solutions that are safe, efficient, and sustainable.",
    "home.products.title": "Featured products",
    "home.products.viewAll": "View all products",
    "products.title": "Products",
    "products.lead": "Every product listed here links to a full spec sheet.",
    "product.specs": "Specifications",
    "product.back": "Back to all products",
    "product.requestQuote": "Request a quote for this product",
    "certificates.title": "Certificates",
    "certificates.lead":
      "Compliance documentation for the manufacturer's processes and materials.",
    "certificates.issuedBy": "Issued by",
    "certificates.validUntil": "Valid until",
    "certificates.viewLarger": "View larger",
    "certificates.close": "Close",
    "catalogue.title": "Catalogue",
    "catalogue.lead": "Download the full product catalogue as a PDF.",
    "catalogue.englishOnly":
      "The catalogue is currently available in English only. A translated version will be added later.",
    "catalogue.download": "Download PDF",
    "catalogue.fileSize": "File size",
    "contact.title": "Contact",
    "contact.lead":
      "Questions about a product, a quote, or becoming a distributor? Send us a message.",
    "contact.name": "Full name",
    "contact.email": "Email address",
    "contact.company": "Company (optional)",
    "contact.message": "Message",
    "contact.consent":
      "I agree that my message and contact details will be stored and used to respond to my enquiry. See the",
    "contact.consentLinkText": "privacy notice",
    "contact.submit": "Send message",
    "footer.rights": "All rights reserved.",
    "footer.imprint": "Imprint",
    "footer.privacy": "Privacy notice",
    "imprint.title": "Imprint",
    "privacy.title": "Privacy notice",
  },
  de: {
    "nav.home": "Startseite",
    "nav.products": "Produkte",
    "nav.certificates": "Zertifikate",
    "nav.catalogue": "Katalog",
    "nav.contact": "Kontakt",
    "brand.tagline": "EU-Vertreter von Galkynysh Plastik",
    "home.eyebrow": "Offizieller EU-Vertreter von Galkynysh Plastik",
    "home.title": "Kunststoff- und Polymerlösungen für den langfristigen Einsatz",
    "home.lead":
      "Ronesans Trading liefert HDPE-Rohre, Geomembranen, Drainagesysteme und Gummiprodukte in der gesamten EU -- hergestellt von Galkynysh Plastik nach anspruchsvollen technischen Standards.",
    "home.cta": "Produktsortiment ansehen",
    "home.about.title": "Über uns",
    "home.about.body":
      "Ronesans Trading ist der offizielle Vertreter von Galkynysh Plastik in der Europäischen Union. Galkynysh Plastik ist ein modernes Fertigungsunternehmen, das sich auf die Herstellung hochwertiger Kunststoff- und Polymerprodukte für Bau, Infrastruktur, Landwirtschaft und industrielle Anwendungen spezialisiert hat.\n\nDas Produktsortiment von Galkynysh Plastik umfasst HDPE-Rohre, gewellte Drainagerohre, Geomembranen, Geogitter, Drainagematten, Bewässerungssysteme sowie Gummiprodukte wie Pflastersteine und Bordsteine. Alle Produkte erfüllen aktuelle technische Standards und gewährleisten Langlebigkeit, Zuverlässigkeit und eine lange Nutzungsdauer unter verschiedenen klimatischen und betrieblichen Bedingungen.\n\nDurch die Kombination aus fortschrittlicher Fertigungstechnologie, strenger Qualitätskontrolle und sorgfältig ausgewählten Rohstoffen liefert Galkynysh Plastik Produkte, die internationalen Normen entsprechen. Besonderer Wert wird auf ökologische Verantwortung gelegt -- mit sicheren, effizienten und nachhaltigen Lösungen.",
    "home.products.title": "Ausgewählte Produkte",
    "home.products.viewAll": "Alle Produkte ansehen",
    "products.title": "Produkte",
    "products.lead": "Jedes hier aufgeführte Produkt verlinkt zu einem vollständigen Datenblatt.",
    "product.specs": "Spezifikationen",
    "product.back": "Zurück zu allen Produkten",
    "product.requestQuote": "Angebot für dieses Produkt anfragen",
    "certificates.title": "Zertifikate",
    "certificates.lead":
      "Konformitätsnachweise für die Fertigungsprozesse und Materialien des Herstellers.",
    "certificates.issuedBy": "Ausgestellt von",
    "certificates.validUntil": "Gültig bis",
    "certificates.viewLarger": "Vergrößern",
    "certificates.close": "Schließen",
    "catalogue.title": "Katalog",
    "catalogue.lead": "Laden Sie den vollständigen Produktkatalog als PDF herunter.",
    "catalogue.englishOnly":
      "Der Katalog liegt derzeit nur auf Englisch vor. Eine übersetzte Version folgt zu einem späteren Zeitpunkt.",
    "catalogue.download": "PDF herunterladen",
    "catalogue.fileSize": "Dateigröße",
    "contact.title": "Kontakt",
    "contact.lead":
      "Fragen zu einem Produkt, einem Angebot oder zur Vertriebspartnerschaft? Schreiben Sie uns.",
    "contact.name": "Vollständiger Name",
    "contact.email": "E-Mail-Adresse",
    "contact.company": "Unternehmen (optional)",
    "contact.message": "Nachricht",
    "contact.consent":
      "Ich bin damit einverstanden, dass meine Nachricht und Kontaktdaten gespeichert und zur Bearbeitung meiner Anfrage verwendet werden. Siehe",
    "contact.consentLinkText": "Datenschutzerklärung",
    "contact.submit": "Nachricht senden",
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.imprint": "Impressum",
    "footer.privacy": "Datenschutzerklärung",
    "imprint.title": "Impressum",
    "privacy.title": "Datenschutzerklärung",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.products": "Produits",
    "nav.certificates": "Certificats",
    "nav.catalogue": "Catalogue",
    "nav.contact": "Contact",
    "brand.tagline": "Représentant UE de Galkynysh Plastik",
    "home.eyebrow": "Représentant officiel de Galkynysh Plastik dans l'UE",
    "home.title": "Des solutions plastiques et polymères conçues pour durer",
    "home.lead":
      "Ronesans Trading fournit des tuyaux en PEHD, des géomembranes, des systèmes de drainage et des produits en caoutchouc dans toute l'UE -- fabriqués par Galkynysh Plastik selon des normes techniques exigeantes.",
    "home.cta": "Voir la gamme de produits",
    "home.about.title": "À propos",
    "home.about.body":
      "Ronesans Trading est le représentant officiel de Galkynysh Plastik au sein de l'Union européenne. Galkynysh Plastik est une entreprise de fabrication moderne, spécialisée dans la production de produits plastiques et polymères de haute qualité pour la construction, les infrastructures, l'agriculture et les applications industrielles.\n\nLa gamme de produits de Galkynysh Plastik comprend des tuyaux en PEHD, des tuyaux de drainage annelés, des géomembranes, des géogrilles, des nappes de drainage, des systèmes d'irrigation, ainsi que des produits en caoutchouc tels que des dalles de pavage et des bordures. Tous les produits sont conçus pour répondre aux normes techniques actuelles, garantissant durabilité, fiabilité et longévité dans diverses conditions climatiques et opérationnelles.\n\nEn combinant des technologies de production avancées, un contrôle qualité strict et une sélection rigoureuse des matières premières, Galkynysh Plastik propose des produits conformes aux normes internationales, avec une attention particulière portée à la responsabilité environnementale à travers des solutions sûres, efficaces et durables.",
    "home.products.title": "Produits phares",
    "home.products.viewAll": "Voir tous les produits",
    "products.title": "Produits",
    "products.lead": "Chaque produit listé ici renvoie vers une fiche technique complète.",
    "product.specs": "Spécifications",
    "product.back": "Retour à tous les produits",
    "product.requestQuote": "Demander un devis pour ce produit",
    "certificates.title": "Certificats",
    "certificates.lead":
      "Documentation de conformité pour les processus de fabrication et les matériaux du fabricant.",
    "certificates.issuedBy": "Délivré par",
    "certificates.validUntil": "Valable jusqu'au",
    "certificates.viewLarger": "Agrandir",
    "certificates.close": "Fermer",
    "catalogue.title": "Catalogue",
    "catalogue.lead": "Téléchargez le catalogue complet des produits au format PDF.",
    "catalogue.englishOnly":
      "Le catalogue est actuellement disponible uniquement en anglais. Une version traduite sera ajoutée ultérieurement.",
    "catalogue.download": "Télécharger le PDF",
    "catalogue.fileSize": "Taille du fichier",
    "contact.title": "Contact",
    "contact.lead":
      "Des questions sur un produit, un devis, ou souhaitez devenir distributeur ? Envoyez-nous un message.",
    "contact.name": "Nom complet",
    "contact.email": "Adresse e-mail",
    "contact.company": "Entreprise (facultatif)",
    "contact.message": "Message",
    "contact.consent":
      "J'accepte que mon message et mes coordonnées soient conservés et utilisés pour répondre à ma demande. Voir la",
    "contact.consentLinkText": "politique de confidentialité",
    "contact.submit": "Envoyer le message",
    "footer.rights": "Tous droits réservés.",
    "footer.imprint": "Mentions légales",
    "footer.privacy": "Politique de confidentialité",
    "imprint.title": "Mentions légales",
    "privacy.title": "Politique de confidentialité",
  },
} as const;

export type UiKey = keyof (typeof ui)["en"];

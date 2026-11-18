import SmartGastroText from './components/SmartGastroText';

export const BRAND = {
  name: 'SmartGastro.ai',
  email: 'hello@smartgastro.ai',
  location: 'Volksbadstrasse 17a, 9000 St. Gallen',
  iban: 'CH78 8080 8008 6231 9985 7',
  bank: 'Raiffeisenbank Oberes Rheintal'
};

/** Academy und Shop sind ausgeblendet, bis Bezahlung (Stripe) und Video-Zugang eingerichtet sind. */
export const ACADEMY_ENABLED = false;

const ALL_NAV_LINKS = [
  { name: 'Leistungen', href: '/leistungen' },
  { name: 'Preise', href: '/preise' },
  { name: 'Referenzen', href: '/referenzen' },
  { name: 'So arbeiten wir', href: '/so-arbeiten-wir' },
  { name: 'Academy', href: '/schulung' },
  { name: 'Über mich', href: '/ueber' },
];

export const NAV_LINKS = ALL_NAV_LINKS.filter((l) => ACADEMY_ENABLED || l.href !== '/schulung');

export const CONTACT_HREF = '/#kontakt';

/** Demo der SmartGastro Engine (auf Wunsch von Thomas sichtbar gelassen). */
export const ENGINE_DEMO = {
  url: 'https://gemini.google.com/share/bcf2f6bba4e2',
  password: 'admin-123',
};

/** Rundum-Service: alle Leistungsbausteine von der Beratung bis zur KI. */
export const SERVICES = [
  {
    id: 'beratung',
    title: 'Beratung & Analyse',
    short: 'Wir schauen uns Service, Küche, Abläufe und Zahlen an und zeigen Ihnen, wo Digitalisierung am meisten bringt.',
    points: ['Analyse der Service-Abläufe', 'Digitaler Check Ihres Betriebs', 'Klare Roadmap mit Prioritäten'],
  },
  {
    id: 'kassenwahl',
    title: 'Kassensystem-Auswahl',
    short: 'Gemeinsam finden wir die passende Kasse für Ihren Betrieb. Wir vergleichen Funktionen, Kosten und Schnittstellen.',
    points: ['Anforderungen definieren', 'Anbieter vergleichen', 'Empfehlung, die zu Ihnen passt'],
  },
  {
    id: 'kasse',
    title: 'Kassensystem-Einrichtung',
    short: 'Ich richte Ihre Kasse komplett ein: Artikel, Tasten, Menüs, Drucker, Tische und Datenübernahme.',
    points: ['Artikel- und Menüstruktur', 'Bon- und Küchendrucker', 'Übernahme bestehender Daten'],
  },
  {
    id: 'website',
    title: 'Website & Design',
    short: 'Eine moderne Restaurant-Website mit Speisekarte, Fotos und Kontakt, die auch auf dem Handy gut aussieht.',
    points: ['Design im Look Ihres Betriebs', 'Optimiert für Handy und Google', 'Speisekarte direkt eingebunden'],
  },
  {
    id: 'speisekarte',
    title: 'Digitale Speisekarte & Order & Pay',
    short: 'QR-Speisekarte am Tisch, auf Wunsch mit Bestellen und Bezahlen. Alles ist direkt mit Ihrer Kasse verbunden.',
    points: ['QR-Speisekarte, mehrsprachig', 'Bestellen und Bezahlen am Tisch', 'Preise in Echtzeit ändern'],
  },
  {
    id: 'schnittstellen',
    title: 'Schnittstellen & Verbindungen',
    short: 'Kasse, Website, Speisekarte und Daten sind verbunden. Nichts muss doppelt erfasst werden.',
    points: ['Kasse, Speisekarte und Website verbunden', 'Datenexporte und Berichte', 'Weniger Handarbeit im Büro'],
  },
  {
    id: 'engine',
    title: 'KI-Lösungen',
    short: 'Die SmartGastro Engine prognostiziert Gäste und Umsatz und hilft bei Einkauf, Mise en place und Kalkulation.',
    points: ['Nachfrage-Prognosen', 'Weniger Food Waste', 'Rezept- und Preiskalkulation'],
  },
  {
    id: 'schulung',
    title: 'Schulung & Betreuung',
    short: 'Ich schule Ihr Team vor Ort und bleibe nach dem Go-Live Ihr persönlicher Ansprechpartner.',
    points: ['Schulung vor Ort oder online', 'Go-Live ohne Betriebsunterbruch', 'Persönlicher Support'],
  },
];

/** Referenzkunden: nur belegte Fakten, keine erfundenen Kennzahlen. */
export const REFERENCES = [
  {
    id: 'loewenburg',
    name: 'Restaurant Löwenburg',
    place: 'Lienz SG',
    type: 'Landgasthof',
    project: 'Kassendaten, Speisekarte & KI-Prognosen',
    text: 'Mehrjährige Kassendaten aus dem WaiterOne-System bereinigt und strukturiert, die Speisekarte neu aufgebaut. Die Daten bilden die Grundlage für die Prognosen der SmartGastro Engine.',
    tags: ['WaiterOne', 'Datenbereinigung', 'Speisekarte', 'KI-Prognosen'],
    img: '/assets/img/v2/ref-loewenburg.webp' as string | null,
    logo: '/assets/img/v2/logo-loewenburg.webp' as string | null,
    initials: 'LB',
  },
  {
    id: 'digrano',
    name: 'Pizzeria Di Grano',
    place: 'St. Gallen',
    type: 'Pizzeria',
    project: 'Digitale QR-Speisekarte',
    text: 'Digitale Speisekarte im Look der Pizzeria, erreichbar über QR-Codes am Tisch. Änderungen an Gerichten und Preisen sind sofort für alle Gäste sichtbar, ein Neudruck ist nicht nötig.',
    tags: ['QR-Speisekarte', 'Design im Corporate Look', 'Tisch-QR'],
    img: '/assets/img/v2/ref-digrano-raum.webp',
    logo: '/assets/img/v2/logo-digrano.webp',
    initials: 'DG',
  },
  {
    id: 'park',
    name: 'Restaurant Café Park',
    place: 'St. Gallen',
    type: 'Restaurant & Café',
    project: 'Kassen- und Bestelllösung (Pilot)',
    text: 'Pilotprojekt für eine schlanke, browserbasierte Kassen- und Bestelllösung, zugeschnitten auf die Abläufe im Café Park, vom Tisch bis zur Abrechnung.',
    tags: ['Kassensystem', 'Bestellung am Tisch', 'Tablet'],
    img: null as string | null,
    logo: '/assets/img/v2/logo-park.webp' as string | null,
    initials: 'CP',
  },
];

export const COURSES = [
  {
    id: 'masterclass-qr',
    title: 'Digitale Speisekarte Masterclass',
    img: 'v2/academy-qr-masterclass.webp',
    duration: '2 Std.',
    status: 'available' as const,
    lessons: [
      'Die Psychologie der digitalen Karte',
      'QR-Code Technik & Sicherheit',
      'Design-Grundlagen für Mobile',
      'Kategorisierung & Menü-Struktur',
      'Upselling-Tricks & Platzierung',
      'Food-Fotografie mit dem Smartphone',
      'Dynamische Preisgestaltung',
      'Allergen-Management & Rechtliches',
      'Mehrsprachigkeit effizient nutzen',
      'Schnittstellen zu Kassensystemen',
      'Marketing am Tisch & Kundenbindung',
      'Analyse & Optimierung der Daten'
    ],
    pricePerLesson: 9,
    desc: 'Von der QR-Code-Erstellung bis zur psychologischen Menü-Optimierung für mehr Umsatz.',
    level: 'Einsteiger'
  },
  {
    id: 'ki-management',
    title: 'KI im Gastro-Management',
    img: 'v2/academy-ki-management.webp',
    duration: '3 Std.',
    status: 'soon' as const,
    lessons: [
      'Einführung in Gastro-KI',
      'SmartGastro Engine Setup',
      'Datenimport & Vorbereitung',
      'KI-Bedarfsprognosen verstehen',
      'Personalplanung mit Algorithmen',
      'Food Waste Analyse & Monitoring',
      'Automatisierter Einkaufsprozess',
      'KI-Marketing & Social Media',
      'Chatbots für Reservierungen',
      'Rezept-Kalkulation mit KI',
      'Inventur-Automatisierung',
      'Predictive Maintenance für Geräte',
      'KI-Tools für den Service-Alltag',
      'Datenschutz & Ethik in der KI',
      'Mitarbeitende für KI begeistern',
      'Case Study: Food Waste senken',
      'Integration in bestehende Workflows',
      'Roadmap für Ihren KI-Betrieb'
    ],
    pricePerLesson: 12,
    desc: (
      <>
        Wie Sie die <SmartGastroText withEngine className="text-sm" /> nutzen, um Food Waste zu reduzieren und Personal effizient zu planen.
      </>
    ),
    level: 'Fortgeschritten'
  },
  {
    id: 'digital-process',
    title: 'Digitaler Projektablauf',
    img: 'v2/academy-digital-process.webp',
    duration: '1 Std. 20 Min.',
    status: 'soon' as const,
    lessons: [
      'Projekt-Vision & Ziele',
      'Technologie-Audit im Betrieb',
      'Stakeholder-Management',
      'Der 8-Wochen-Implementierungsplan',
      'Schulungskonzepte für das Team',
      'Go-Live ohne Betriebsunterbruch',
      'Monitoring & Feedback-Schleifen',
      'Skalierung & Zukunftsfähigkeit'
    ],
    pricePerLesson: 12,
    desc: 'Schritt-für-Schritt-Anleitung zur Einführung neuer Technologien ohne Betriebsunterbruch.',
    level: 'Alle Levels'
  }
];

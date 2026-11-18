import SmartGastroText from './components/SmartGastroText';

export const BRAND = {
  name: 'SmartGastro.ai',
  email: 'hello@smartgastro.ai',
  location: 'CH-9000 St. Gallen',
  iban: 'CH78 8080 8008 6231 9985 7',
  bank: 'Raiffeisenbank Oberes Rheintal'
};

export const NAV_LINKS = [
  { name: 'Lösungen', href: '/loesungen' },
  { name: 'Preise', href: '/preise' },
  { name: 'Referenzen', href: '/referenzen' },
  { name: 'So arbeiten wir', href: '/so-arbeiten-wir' },
  { name: 'Academy', href: '/schulung' },
  { name: 'Über mich', href: '/ueber' },
];

export const CONTACT_HREF = '/#kontakt';

/** Referenzkunden – nur belegte Fakten, keine erfundenen Kennzahlen. */
export const REFERENCES = [
  {
    id: 'loewenburg',
    name: 'Restaurant Löwenburg',
    place: 'Lienz SG',
    type: 'Landgasthof',
    project: 'Kassendaten & Menü-Engineering',
    text: 'Mehrjährige Kassendaten aus dem WaiterOne-System bereinigt und strukturiert, die Speisekarte neu aufgebaut. Die Daten bilden die Grundlage für die Prognosen der SmartGastro Engine.',
    tags: ['WaiterOne', 'Datenbereinigung', 'Speisekarte'],
    img: null as string | null,
    logo: null as string | null,
    initials: 'LB',
  },
  {
    id: 'digrano',
    name: 'Pizzeria Di Grano',
    place: 'St. Gallen',
    type: 'Pizzeria',
    project: 'Digitale QR-Speisekarte',
    text: 'Digitale Speisekarte im Look der Pizzeria, erreichbar über QR-Codes am Tisch. Änderungen an Gerichten und Preisen sind sofort für alle Gäste sichtbar – ohne Neudruck.',
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
    text: 'Pilotprojekt für eine schlanke, browserbasierte Kassen- und Bestelllösung, zugeschnitten auf die Abläufe im Café Park – vom Tisch bis zur Abrechnung.',
    tags: ['Kassensystem', 'Bestellung am Tisch', 'Tablet'],
    img: null as string | null,
    logo: null as string | null,
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

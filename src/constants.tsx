import React from 'react';
import SmartGastroText from './components/SmartGastroText';

export const BRAND = {
  name: 'SmartGastro.ai',
  email: 'hello@smartgastro.ai',
  location: 'CH-9000 St. Gallen',
  iban: 'CH78 8080 8008 6231 9985 7',
  bank: 'Raiffeisenbank Oberes Rheintal'
};

export const NAV_LINKS = [
  { name: 'Über', href: '/ueber' },
  { name: 'Preise', href: '/preise' },
  { name: 'Leistungen', href: '/leistungen' },
  { name: 'Implementierung', href: '/implementierung' },
  { name: 'Projektablauf', href: '/projektablauf' },
  { name: 'Konditionen', href: '/konditionen' },
  { name: 'Nächste Schritte', href: '/naechste-schritte' },
  { name: 'Schulung', href: '/schulung' }
];

export const COURSES = [
  {
    id: 'masterclass-qr',
    title: 'Digitale Speisekarte Masterclass',
    img: 'Academy_QR_Masterclass.jpg',
    duration: '2H',
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
    desc: 'Von der QR-Code Erstellung bis zur psychologischen Menü-Optimierung für mehr Umsatz.',
    level: 'Einsteiger'
  },
  {
    id: 'ki-management',
    title: 'KI im Gastro-Management',
    img: 'Academy_KI_Management.jpg',
    duration: '3H',
    lessons: [
      'Einführung in Gastro-KI',
      'SmartGastroEngine Setup',
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
      'Mitarbeiter für KI begeistern',
      'Case Study: 20% weniger Food Waste',
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
    img: 'Academy_Digital_Process.jpg',
    duration: '1H 20 M',
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
    desc: 'Schritt-für-Schritt Anleitung zur Implementierung neuer Technologien ohne Betriebsunterbruch.',
    level: 'Alle Levels'
  }
];

/**
 * Strukturierte Daten (schema.org, JSON-LD) für Google.
 * Wird nur beim Vorrendern verwendet (scripts/prerender.mjs) und pro Seite in den <head> geschrieben.
 * Inhalte stammen aus denselben Daten wie die Seiten selbst, damit Text und Daten übereinstimmen.
 */
import { BRAND, SERVICES } from './constants';
import { FAQ } from './pages/Pricing';

const BASE = 'https://smartgastro.ai';
const ID = {
  business: `${BASE}/#business`,
  website: `${BASE}/#website`,
  thomas: `${BASE}/ueber#thomas`,
};

/** Namen der Seiten für die Brotkrümel-Navigation in den Suchergebnissen. */
const CRUMB: Record<string, string> = {
  '/leistungen': 'Leistungen',
  '/preise': 'Preise',
  '/referenzen': 'Referenzen',
  '/so-arbeiten-wir': 'Ablauf und Konditionen',
  '/ueber': 'Über mich',
  '/impressum': 'Impressum',
  '/datenschutz': 'Datenschutz',
  '/sicherheit': 'Sicherheit',
};

const [street, city] = BRAND.location.split(',').map((s) => s.trim());
const [postalCode, ...locality] = city.split(' ');

const business = {
  '@type': 'ProfessionalService',
  '@id': ID.business,
  name: 'SmartGastro.ai',
  alternateName: 'SmartGastro',
  url: `${BASE}/`,
  logo: { '@type': 'ImageObject', url: `${BASE}/assets/img/logo-512.png`, width: 512, height: 512 },
  image: `${BASE}/assets/img/og-smartgastro-v3.jpg`,
  description:
    'Kassensystem, Restaurant-Website, digitale Speisekarte, Bestellen am Tisch und KI für die Gastronomie aus einer Hand. Eingerichtet von Thomas Ballinari, gelerntem Koch, ohne Betriebsunterbruch.',
  email: BRAND.email,
  address: { '@type': 'PostalAddress', streetAddress: street, postalCode, addressLocality: locality.join(' '), addressRegion: 'SG', addressCountry: 'CH' },
  areaServed: [
    { '@type': 'City', name: 'St. Gallen' },
    { '@type': 'AdministrativeArea', name: 'Ostschweiz' },
    { '@type': 'Country', name: 'Schweiz' },
  ],
  founder: { '@id': ID.thomas },
  priceRange: 'ab CHF 490',
  currenciesAccepted: 'CHF',
  paymentAccepted: 'Kreditkarte, TWINT, Banküberweisung',
  knowsAbout: [
    'Kassensystem für Restaurants', 'Kassensystem-Einrichtung', 'Digitale Speisekarte', 'QR-Speisekarte', 'Restaurant-Website',
    'Bestellen und Bezahlen am Tisch', 'Order & Pay', 'Schnittstellen zur Kasse', 'KI in der Gastronomie', 'Food Waste reduzieren', 'Gastronomie-Beratung',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Leistungen für die Gastronomie',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.short, url: `${BASE}/leistungen#${s.id}` },
    })),
  },
};

const website = {
  '@type': 'WebSite',
  '@id': ID.website,
  url: `${BASE}/`,
  name: 'SmartGastro.ai',
  inLanguage: 'de-CH',
  publisher: { '@id': ID.business },
};

const thomas = {
  '@type': 'Person',
  '@id': ID.thomas,
  name: 'Thomas Ballinari',
  jobTitle: 'Gründer von SmartGastro.ai',
  description: 'Gelernter Koch, Küchenchef und langjähriger Pächter eines grossen Landgasthofs. Bringt heute Kassensysteme, digitale Speisekarten und KI in Schweizer Gastrobetriebe.',
  image: `${BASE}/assets/img/v2/thomas.webp`,
  worksFor: { '@id': ID.business },
  knowsAbout: ['Gastronomie', 'Küchenführung', 'Kalkulation', 'Kassensysteme', 'Digitale Speisekarte', 'Künstliche Intelligenz'],
};

function breadcrumb(path: string) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${BASE}${path}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: CRUMB[path], item: `${BASE}${path}` },
    ],
  };
}

/** Alle strukturierten Daten einer Seite als ein JSON-LD-Graph. */
export function schemaFor(path: string, title: string, description: string): object | null {
  if (path !== '/' && !CRUMB[path]) return null; // z. B. Danke-Seite, Demo-Karte, 404
  const url = path === '/' ? `${BASE}/` : `${BASE}${path}`;
  const page: Record<string, unknown> = {
    '@type': path === '/ueber' ? 'ProfilePage' : path === '/preise' ? ['WebPage', 'FAQPage'] : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'de-CH',
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.business },
  };
  const graph: object[] = [business, website, page];

  if (path !== '/') {
    graph.push(breadcrumb(path));
    page.breadcrumb = { '@id': `${url}#breadcrumb` };
  }
  if (path === '/' || path === '/ueber') graph.push(thomas);
  if (path === '/ueber') page.mainEntity = { '@id': ID.thomas };
  if (path === '/preise') {
    page.mainEntity = FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

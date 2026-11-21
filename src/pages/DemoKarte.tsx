import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Leaf, RefreshCw, Sparkles, WheatOff, MilkOff } from 'lucide-react';
import PageMeta from '../components/PageMeta';

/**
 * Demo-Speisekarte, erreichbar per QR-Code auf der Startseite (/demo-karte).
 * Zeigt, was eine digitale Karte kann: Sprachen, Allergen-Filter, Tagesangebot, Details.
 * Alle Inhalte sind Beispiele, es gibt keine Verbindung zu einer echten Kasse.
 */

type Lang = 'de' | 'fr' | 'en';
type Tag = 'veg' | 'vegan' | 'gf' | 'lf';
type Item = {
  id: string;
  cat: 'speisen' | 'desserts' | 'getraenke';
  price: number;
  tags: Tag[];
  allergens: string[];
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
};

const UI: Record<Lang, Record<string, string>> = {
  de: { table: 'Tisch 12', speisen: 'Speisen', desserts: 'Desserts', getraenke: 'Getränke', today: 'Heute empfohlen', filter: 'Filter', veg: 'Vegetarisch', gf: 'Ohne Gluten', lf: 'Ohne Laktose', none: 'Keine Gerichte für diesen Filter.', allergens: 'Allergene', noAllergens: 'Keine deklarationspflichtigen Allergene', live: 'Preise aus der Kasse, aktualisiert heute', order: 'Bestellen am Tisch', orderNote: 'In dieser Demo deaktiviert. Auf Wunsch mit Bestellen und Bezahlen.', vegan: 'vegan', vegShort: 'vegetarisch' },
  fr: { table: 'Table 12', speisen: 'Plats', desserts: 'Desserts', getraenke: 'Boissons', today: 'Recommandé aujourd’hui', filter: 'Filtre', veg: 'Végétarien', gf: 'Sans gluten', lf: 'Sans lactose', none: 'Aucun plat pour ce filtre.', allergens: 'Allergènes', noAllergens: 'Aucun allergène à déclarer', live: 'Prix issus de la caisse, mis à jour aujourd’hui', order: 'Commander à table', orderNote: 'Désactivé dans cette démo. Commande et paiement possibles sur demande.', vegan: 'végane', vegShort: 'végétarien' },
  en: { table: 'Table 12', speisen: 'Food', desserts: 'Desserts', getraenke: 'Drinks', today: 'Today’s recommendation', filter: 'Filter', veg: 'Vegetarian', gf: 'Gluten-free', lf: 'Lactose-free', none: 'No dishes match this filter.', allergens: 'Allergens', noAllergens: 'No allergens to declare', live: 'Prices from the POS, updated today', order: 'Order at the table', orderNote: 'Disabled in this demo. Ordering and payment available on request.', vegan: 'vegan', vegShort: 'vegetarian' },
};

const ALLERGEN: Record<string, Record<Lang, string>> = {
  gluten: { de: 'Gluten', fr: 'Gluten', en: 'Gluten' },
  milch: { de: 'Milch', fr: 'Lait', en: 'Milk' },
  ei: { de: 'Ei', fr: 'Œuf', en: 'Egg' },
  sellerie: { de: 'Sellerie', fr: 'Céleri', en: 'Celery' },
  senf: { de: 'Senf', fr: 'Moutarde', en: 'Mustard' },
  sulfite: { de: 'Sulfite', fr: 'Sulfites', en: 'Sulphites' },
  nuesse: { de: 'Nüsse', fr: 'Fruits à coque', en: 'Nuts' },
};

const ITEMS: Item[] = [
  { id: 'suppe', cat: 'speisen', price: 9.5, tags: ['vegan', 'veg', 'gf', 'lf'], allergens: ['sellerie'],
    name: { de: 'Kürbissuppe', fr: 'Soupe de courge', en: 'Pumpkin soup' },
    desc: { de: 'Mit Ingwer und gerösteten Kernen', fr: 'Au gingembre et graines grillées', en: 'With ginger and roasted seeds' } },
  { id: 'salat', cat: 'speisen', price: 12.5, tags: ['veg', 'gf'], allergens: ['senf', 'milch'],
    name: { de: 'Saisonsalat', fr: 'Salade de saison', en: 'Seasonal salad' },
    desc: { de: 'Blattsalate, Hausdressing, Bergkäse', fr: 'Salades, sauce maison, fromage d’alpage', en: 'Leaf salads, house dressing, mountain cheese' } },
  { id: 'geschnetzeltes', cat: 'speisen', price: 38, tags: [], allergens: ['milch', 'gluten'],
    name: { de: 'Zürcher Geschnetzeltes mit Rösti', fr: 'Émincé zurichois et rösti', en: 'Zurich-style veal with rösti' },
    desc: { de: 'Kalbfleisch an Rahmsauce mit Champignons', fr: 'Veau à la crème et champignons', en: 'Veal in cream sauce with mushrooms' } },
  { id: 'pizza', cat: 'speisen', price: 18.5, tags: ['veg'], allergens: ['gluten', 'milch'],
    name: { de: 'Pizza Margherita', fr: 'Pizza Margherita', en: 'Pizza Margherita' },
    desc: { de: 'Tomaten, Mozzarella, Basilikum', fr: 'Tomates, mozzarella, basilic', en: 'Tomato, mozzarella, basil' } },
  { id: 'filet', cat: 'speisen', price: 46, tags: ['gf'], allergens: ['milch'],
    name: { de: 'Rindsfilet', fr: 'Filet de bœuf', en: 'Beef fillet' },
    desc: { de: 'Kartoffelgratin, Marktgemüse', fr: 'Gratin de pommes de terre, légumes du marché', en: 'Potato gratin, market vegetables' } },
  { id: 'risotto', cat: 'speisen', price: 26, tags: ['veg', 'gf'], allergens: ['milch', 'sulfite'],
    name: { de: 'Steinpilz-Risotto', fr: 'Risotto aux cèpes', en: 'Porcini risotto' },
    desc: { de: 'Mit Parmesan und Kräutern', fr: 'Au parmesan et aux herbes', en: 'With parmesan and herbs' } },
  { id: 'tiramisu', cat: 'desserts', price: 9.5, tags: ['veg'], allergens: ['gluten', 'milch', 'ei'],
    name: { de: 'Tiramisu', fr: 'Tiramisu', en: 'Tiramisu' },
    desc: { de: 'Hausgemacht', fr: 'Fait maison', en: 'Homemade' } },
  { id: 'meringue', cat: 'desserts', price: 11, tags: ['veg', 'gf'], allergens: ['ei', 'milch'],
    name: { de: 'Meringue mit Doppelrahm', fr: 'Meringue à la double crème', en: 'Meringue with double cream' },
    desc: { de: 'Mit Beeren', fr: 'Aux baies', en: 'With berries' } },
  { id: 'sorbet', cat: 'desserts', price: 7.5, tags: ['vegan', 'veg', 'gf', 'lf'], allergens: [],
    name: { de: 'Zitronensorbet', fr: 'Sorbet citron', en: 'Lemon sorbet' },
    desc: { de: 'Zwei Kugeln', fr: 'Deux boules', en: 'Two scoops' } },
  { id: 'mineral', cat: 'getraenke', price: 5, tags: ['vegan', 'veg', 'gf', 'lf'], allergens: [],
    name: { de: 'Mineralwasser 5 dl', fr: 'Eau minérale 5 dl', en: 'Mineral water 5 dl' },
    desc: { de: 'Mit oder ohne Kohlensäure', fr: 'Gazeuse ou plate', en: 'Sparkling or still' } },
  { id: 'apfel', cat: 'getraenke', price: 5.5, tags: ['vegan', 'veg', 'gf', 'lf'], allergens: [],
    name: { de: 'Apfelschorle 3 dl', fr: 'Jus de pomme pétillant 3 dl', en: 'Apple spritzer 3 dl' },
    desc: { de: 'Aus der Region', fr: 'De la région', en: 'Locally sourced' } },
  { id: 'wein', cat: 'getraenke', price: 6.5, tags: ['vegan', 'veg', 'gf', 'lf'], allergens: ['sulfite'],
    name: { de: 'Hauswein rot 1 dl', fr: 'Vin rouge maison 1 dl', en: 'House red wine 1 dl' },
    desc: { de: 'Blauburgunder, Ostschweiz', fr: 'Pinot noir, Suisse orientale', en: 'Pinot noir, Eastern Switzerland' } },
  { id: 'kaffee', cat: 'getraenke', price: 4.8, tags: ['vegan', 'veg', 'gf', 'lf'], allergens: [],
    name: { de: 'Kaffee Crème', fr: 'Café crème', en: 'Coffee' },
    desc: { de: 'Mit Rahm auf Wunsch', fr: 'Crème sur demande', en: 'Cream on request' } },
];

const TODAY_ID = 'geschnetzeltes';
const CATS = ['speisen', 'desserts', 'getraenke'] as const;

function chf(n: number) {
  return n.toFixed(2);
}

export default function DemoKarte() {
  const [lang, setLang] = useState<Lang>('de');
  const [cat, setCat] = useState<(typeof CATS)[number]>('speisen');
  const [filters, setFilters] = useState<Tag[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const t = UI[lang];
  const today = ITEMS.find((i) => i.id === TODAY_ID)!;
  const time = useMemo(() => new Date().toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' }), []);

  const list = ITEMS.filter((i) => i.cat === cat && filters.every((f) => i.tags.includes(f)));
  const toggle = (f: Tag) => setFilters((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]));

  return (
    <div className="min-h-screen bg-[#0a2e1d] sm:py-8">
      <PageMeta title="Demo-Speisekarte" description="So sieht eine digitale Speisekarte von SmartGastro.ai aus: mehrsprachig, mit Allergenen und Preisen direkt aus der Kasse." />

      <div className="mx-auto max-w-md min-h-screen sm:min-h-0 bg-creme sm:rounded-[2rem] sm:overflow-hidden sm:shadow-2xl" lang={lang}>
        {/* Demo-Hinweis */}
        <div className="flex items-center justify-between gap-3 bg-accent px-4 py-2 text-xs font-semibold text-anthrazit">
          <span className="inline-flex items-center gap-1.5"><Sparkles size={14} /> Demo von SmartGastro.ai</span>
          <Link to="/" className="inline-flex items-center gap-1 underline underline-offset-2"><ArrowLeft size={13} /> Website</Link>
        </div>

        {/* Kopf des Restaurants */}
        <header className="bg-forest-deep text-white px-5 pt-6 pb-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-bold">Restaurant</p>
              <h1 className="font-display text-3xl font-extrabold leading-tight">Beispiel</h1>
              <p className="text-sm text-white/70 mt-1">{t.table}</p>
            </div>
            <div role="group" aria-label="Sprache" className="flex rounded-full bg-white/10 p-1">
              {(['de', 'fr', 'en'] as Lang[]).map((l) => (
                <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase transition-colors ${lang === l ? 'bg-white text-forest-deep' : 'text-white/80'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-white/70"><RefreshCw size={12} /> {t.live} {time}</p>
        </header>

        {/* Tagesempfehlung */}
        <div className="px-4 pt-4">
          <button type="button" onClick={() => { setCat('speisen'); setFilters([]); setOpen(today.id); }}
            className="w-full text-left rounded-2xl overflow-hidden bg-white border border-linie shadow-sm flex">
            <img src="/assets/img/v2/ambiente-teller.webp" alt="" className="w-28 object-cover" />
            <div className="p-3.5">
              <p className="text-[11px] uppercase tracking-[0.14em] font-bold text-primary">{t.today}</p>
              <p className="font-display font-bold leading-snug mt-0.5">{today.name[lang]}</p>
              <p className="text-sm font-semibold text-forest mt-1">CHF {chf(today.price)}</p>
            </div>
          </button>
        </div>

        {/* Kategorien */}
        <nav aria-label="Kategorien" className="sticky top-0 z-10 bg-creme/95 backdrop-blur px-4 pt-4 pb-3 border-b border-linie">
          <div className="flex gap-2">
            {CATS.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${cat === c ? 'bg-forest text-white' : 'bg-white border border-linie text-anthrazit'}`}>
                {t[c]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3" role="group" aria-label={t.filter}>
            {([['veg', Leaf], ['gf', WheatOff], ['lf', MilkOff]] as const).map(([f, Icon]) => (
              <button key={f} type="button" onClick={() => toggle(f)} aria-pressed={filters.includes(f)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${filters.includes(f) ? 'bg-accent border-accent text-anthrazit' : 'bg-white border-linie text-anthrazit/75'}`}>
                <Icon size={14} /> {t[f]}
              </button>
            ))}
          </div>
        </nav>

        {/* Liste */}
        <ul className="px-4 py-3 divide-y divide-linie">
          {list.length === 0 && <li className="py-8 text-center text-anthrazit/60 text-sm">{t.none}</li>}
          {list.map((i) => {
            const isOpen = open === i.id;
            return (
              <li key={i.id}>
                <button type="button" onClick={() => setOpen(isOpen ? null : i.id)} aria-expanded={isOpen}
                  className="w-full text-left py-3.5 flex gap-3 items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold leading-snug">
                      {i.name[lang]}
                      {i.tags.includes('vegan') ? <span className="ml-2 align-middle text-[10px] font-bold uppercase text-primary">{t.vegan}</span>
                        : i.tags.includes('veg') ? <span className="ml-2 align-middle text-[10px] font-bold uppercase text-primary">{t.vegShort}</span> : null}
                    </p>
                    <p className="text-sm text-anthrazit/60 mt-0.5">{i.desc[lang]}</p>
                  </div>
                  <span className="font-semibold whitespace-nowrap">CHF {chf(i.price)}</span>
                  <ChevronDown size={18} className={`mt-0.5 text-anthrazit/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="pb-4 -mt-1 text-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-anthrazit/50">{t.allergens}</p>
                    <p className="mt-1 flex flex-wrap gap-1.5">
                      {i.allergens.length === 0
                        ? <span className="text-anthrazit/60">{t.noAllergens}</span>
                        : i.allergens.map((a) => <span key={a} className="rounded-full bg-hellgrau px-2.5 py-1 text-xs font-semibold">{ALLERGEN[a][lang]}</span>)}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Bestellen (deaktiviert) */}
        <div className="px-4 pb-4">
          <button type="button" disabled className="w-full rounded-full bg-forest/40 text-white font-semibold py-3.5 cursor-not-allowed">{t.order}</button>
          <p className="text-xs text-anthrazit/55 text-center mt-2">{t.orderNote}</p>
        </div>

        {/* Hinweis SmartGastro */}
        <div className="m-4 mt-2 rounded-2xl bg-forest text-white p-5">
          <p className="font-display text-lg font-bold leading-snug">So könnte Ihre Karte aussehen.</p>
          <p className="text-sm text-white/75 mt-1.5">Im Look Ihres Betriebs, mehrsprachig, mit Allergenen. Preise ändern Sie einmal in der Kasse, am Tisch sind sie sofort aktuell.</p>
          <Link to="/#kontakt" className="btn-accent mt-4 !py-2.5 text-sm w-full">Kostenloses Erstgespräch <ArrowRight size={16} /></Link>
          <Link to="/#check" className="block text-center text-sm text-white/80 underline underline-offset-2 mt-3">Oder zuerst den Digital-Check machen</Link>
        </div>
        <p className="text-center text-[11px] text-anthrazit/45 pb-6">Beispielinhalte. Keine Verbindung zu einer echten Kasse.</p>
      </div>
    </div>
  );
}

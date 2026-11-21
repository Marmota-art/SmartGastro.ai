import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Digital-Check «Wie digital ist Ihr Betrieb?»
 * 6 Fragen à 0–3 Punkte plus Betriebsart. Alles läuft im Browser, es wird nichts gesendet oder gespeichert.
 * Am Ende kann das Ergebnis ins Erstgespräch-Formular (#kontakt) übernommen werden.
 */

type Area = 'kasse' | 'karte' | 'website' | 'service' | 'planung' | 'zeit';

type Question = { area: Area; label: string; q: string; options: { text: string; pts: number }[] };

const BETRIEBE = ['Café, Bistro, Bar', 'Restaurant', 'Landgasthof', 'Gruppe, Hotel'] as const;
type Betrieb = (typeof BETRIEBE)[number];

const QUESTIONS: Question[] = [
  {
    area: 'kasse', label: 'Kasse', q: 'Wie arbeiten Sie heute an der Kasse?',
    options: [
      { text: 'Registrierkasse oder von Hand', pts: 0 },
      { text: 'Ältere Kasse, ohne Verbindung zu anderen Systemen', pts: 1 },
      { text: 'Moderne Kasse, aber nicht mit Karte oder Website verbunden', pts: 2 },
      { text: 'Moderne Kasse, mit Karte und Website verbunden', pts: 3 },
    ],
  },
  {
    area: 'karte', label: 'Speisekarte', q: 'Wie sehen Ihre Gäste die Speisekarte?',
    options: [
      { text: 'Gedruckt, bei Änderungen wird neu gedruckt', pts: 0 },
      { text: 'Als PDF hinter einem QR-Code', pts: 1 },
      { text: 'Digitale Karte, aber separat gepflegt', pts: 2 },
      { text: 'Digitale Karte, Preise kommen direkt aus der Kasse', pts: 3 },
    ],
  },
  {
    area: 'website', label: 'Website', q: 'Wie steht es um Ihre Website?',
    options: [
      { text: 'Keine oder stark veraltet', pts: 0 },
      { text: 'Vorhanden, aber Karte und Öffnungszeiten selten aktuell', pts: 1 },
      { text: 'Aktuell, aber ohne Reservation', pts: 2 },
      { text: 'Aktuell, mit Karte und Online-Reservation', pts: 3 },
    ],
  },
  {
    area: 'service', label: 'Bestellung & Service', q: 'Wie kommt eine Bestellung in die Küche?',
    options: [
      { text: 'Auf dem Zettel, mündlich an den Pass', pts: 0 },
      { text: 'Der Service tippt sie an der Kasse ein', pts: 1 },
      { text: 'Mit Handgeräten direkt am Tisch', pts: 2 },
      { text: 'Gäste können selbst am Tisch bestellen und bezahlen', pts: 3 },
    ],
  },
  {
    area: 'planung', label: 'Zahlen & Planung', q: 'Wie planen Sie Einkauf und Personal?',
    options: [
      { text: 'Aus dem Bauch, mit Erfahrung', pts: 0 },
      { text: 'Mit eigenen Excel-Listen', pts: 1 },
      { text: 'Mit Auswertungen aus der Kasse', pts: 2 },
      { text: 'Mit Prognosen aus Kassendaten, Wetter und Anlässen', pts: 3 },
    ],
  },
  {
    area: 'zeit', label: 'Büro & Admin', q: 'Wie viel Zeit geht pro Woche für Karte, Preise und Listen drauf?',
    options: [
      { text: 'Mehr als 5 Stunden', pts: 0 },
      { text: '3 bis 5 Stunden', pts: 1 },
      { text: '1 bis 3 Stunden', pts: 2 },
      { text: 'Weniger als 1 Stunde', pts: 3 },
    ],
  },
];

/** Empfehlung je Bereich. Preise sind Beispiele, wie auf der Preisseite. */
function recommendation(area: Area, betrieb: Betrieb | null): { title: string; text: string; price: string; anliegen: string } {
  switch (area) {
    case 'kasse':
      return { title: 'Kasse prüfen und anbinden', text: 'Wir prüfen, ob Ihre Kasse angebunden werden kann, oder finden mit Ihnen eine passende neue und richten sie ein.', price: 'nach Analyse', anliegen: 'Kassensystem: Auswahl & Einrichtung' };
    case 'karte':
      return {
        title: 'Digitale Speisekarte mit Kassenanbindung',
        text: 'Einmal in der Kasse ändern, am Tisch sofort aktuell. Kein Neudruck mehr.',
        price: betrieb === 'Café, Bistro, Bar' ? 'Beispiel: ab CHF 490' : betrieb === 'Gruppe, Hotel' ? 'Beispiel: ab CHF 18’000 für mehrere Standorte' : 'Beispiel: ab CHF 2’900',
        anliegen: 'Digitale Speisekarte',
      };
    case 'website':
      return { title: 'Website mit Karte und Reservation', text: 'Eine Website im Look Ihres Betriebs, die auf dem Handy und bei Google gut funktioniert.', price: 'nach Analyse', anliegen: 'Website & Design' };
    case 'service':
      return { title: 'Bestellen und bezahlen am Tisch', text: 'Bestellungen gehen ohne Umweg in Küche und Kasse. Der Service hat wieder Zeit für die Gäste.', price: 'Beispiel: rund CHF 9’800', anliegen: 'Bestellen & bezahlen am Tisch' };
    case 'planung':
      return { title: 'KI-Prognosen mit der SmartGastro Engine', text: 'Wissen, wie viele Gäste kommen: für Einkauf, Mise en place und Personalplanung.', price: 'nach Analyse', anliegen: 'KI-Lösungen (Engine)' };
    case 'zeit':
    default:
      return { title: 'Systeme verbinden', text: 'Kasse, Karte und Website hängen zusammen. Nichts mehr doppelt erfassen, weniger Abende im Büro.', price: 'im Angebot inbegriffen', anliegen: 'Komplettpaket (alles aus einer Hand)' };
  }
}

function level(score: number) {
  if (score <= 6) return { name: 'Am Anfang', text: 'Hier liegt viel Potenzial. Schon ein, zwei Schritte bringen spürbar mehr Ruhe in den Betrieb.' };
  if (score <= 12) return { name: 'Auf dem Weg', text: 'Die Basis ist da. Jetzt geht es darum, die Systeme zu verbinden, damit nichts doppelt gemacht wird.' };
  return { name: 'Gut aufgestellt', text: 'Ihr Betrieb ist schon weit. Der nächste Schritt sind Daten und Prognosen, die Ihnen Entscheidungen erleichtern.' };
}

export default function DigitalCheck() {
  const [betrieb, setBetrieb] = useState<Betrieb | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(() => QUESTIONS.map(() => null));
  // Schritt 0 = Betriebsart, 1..6 = Fragen, 7 = Ergebnis
  const [step, setStep] = useState(0);
  const headRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    headRef.current?.focus({ preventScroll: true });
    const box = headRef.current?.closest('.dc');
    if (box && box.getBoundingClientRect().top < 80) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const total = QUESTIONS.length;
  const done = step > total;
  const score = answers.reduce<number>((s, a) => s + (a ?? 0), 0);
  const lv = level(score);

  const weakest = useMemo(() => {
    return QUESTIONS.map((q, i) => ({ area: q.area, label: q.label, pts: answers[i] ?? 0 }))
      .filter((x) => x.pts < 3)
      .sort((a, b) => a.pts - b.pts)
      .slice(0, 3);
  }, [answers]);

  const pick = (idx: number) => {
    const qi = step - 1;
    setAnswers((prev) => prev.map((v, i) => (i === qi ? QUESTIONS[qi].options[idx].pts : v)));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const restart = () => { setAnswers(QUESTIONS.map(() => null)); setBetrieb(null); setStep(0); };

  const toForm = () => {
    const form = document.querySelector<HTMLFormElement>('form.book');
    if (!form) return;
    const recs = weakest.map((w) => recommendation(w.area, betrieb));
    const msg = form.querySelector<HTMLTextAreaElement>('textarea[name="nachricht"]');
    const anliegen = form.querySelector<HTMLSelectElement>('select[name="anliegen"]');
    if (msg) {
      msg.value =
        `Digital-Check: ${score} von ${total * 3} Punkten («${lv.name}»)` +
        (betrieb ? `\nBetrieb: ${betrieb}` : '') +
        (recs.length ? `\nSchwerpunkte: ${weakest.map((w) => w.label).join(', ')}` : '') +
        '\n\nIch möchte das Ergebnis gerne im Erstgespräch besprechen.';
    }
    if (anliegen && recs[0]) {
      const opt = Array.from(anliegen.options).find((o) => o.text === recs[0].anliegen);
      if (opt) anliegen.value = opt.value;
    }
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => form.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true }), 700);
  };

  const q = step >= 1 && step <= total ? QUESTIONS[step - 1] : null;
  const progress = Math.min(step, total) / total;

  return (
    <div className="dc">
      <div className="dc-top">
        <div className="dc-bar" role="progressbar" aria-label="Fortschritt" aria-valuemin={0} aria-valuemax={total} aria-valuenow={Math.min(step, total)}>
          <i style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="dc-count" aria-hidden="true">{done ? 'Fertig' : step === 0 ? 'Start' : `Frage ${step} von ${total}`}</span>
      </div>

      {step === 0 && (
        <div className="dc-step" key="start">
          <h3 ref={headRef} tabIndex={-1}>Was für einen Betrieb führen Sie?</h3>
          <div className="dc-opts dc-opts-4">
            {BETRIEBE.map((b) => (
              <button key={b} type="button" className={`dc-opt${betrieb === b ? ' on' : ''}`} aria-pressed={betrieb === b} onClick={() => { setBetrieb(b); setTimeout(() => setStep(1), 180); }}>
                {b}
              </button>
            ))}
          </div>
          <p className="dc-note">6 kurze Fragen, etwa 1 Minute. Ihre Antworten bleiben auf Ihrem Gerät.</p>
        </div>
      )}

      {q && (
        <div className="dc-step" key={step}>
          <p className="dc-area">{q.label}</p>
          <h3 ref={headRef} tabIndex={-1}>{q.q}</h3>
          <div className="dc-opts">
            {q.options.map((o, i) => {
              const on = answers[step - 1] === o.pts;
              return (
                <button key={o.text} type="button" className={`dc-opt${on ? ' on' : ''}`} aria-pressed={on} onClick={() => pick(i)}>
                  <span className="dc-dot" aria-hidden="true" />{o.text}
                </button>
              );
            })}
          </div>
          <button type="button" className="dc-back" onClick={() => setStep((s) => s - 1)}>← Zurück</button>
        </div>
      )}

      {done && (
        <div className="dc-step dc-result" key="result">
          <div className="dc-res-head">
            <div className="dc-score" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" className="bg" />
                <circle cx="60" cy="60" r="52" className="fg" pathLength={100} style={{ strokeDasharray: `${(score / (total * 3)) * 100} 100` }} />
              </svg>
              <b>{score}<small>/{total * 3}</small></b>
            </div>
            <div>
              <p className="dc-area">Ihr Ergebnis{betrieb ? ` · ${betrieb}` : ''}</p>
              <h3 ref={headRef} tabIndex={-1}>{lv.name}</h3>
              <p className="dc-lvtext">{lv.text}</p>
            </div>
          </div>

          <ul className="dc-areas" aria-label="Ergebnis nach Bereich">
            {QUESTIONS.map((qq, i) => (
              <li key={qq.area}>
                <span>{qq.label}</span>
                <span className="dc-mini" aria-hidden="true"><i style={{ width: `${((answers[i] ?? 0) / 3) * 100}%` }} /></span>
                <span className="dc-pts">{answers[i] ?? 0}/3</span>
              </li>
            ))}
          </ul>

          {weakest.length > 0 && (
            <>
              <p className="dc-recs-h">Damit würden wir bei Ihnen anfangen:</p>
              <ol className="dc-recs">
                {weakest.map((w) => {
                  const r = recommendation(w.area, betrieb);
                  return (
                    <li key={w.area}>
                      <b>{r.title}</b>
                      <span>{r.text}</span>
                      <em>{r.price}</em>
                    </li>
                  );
                })}
              </ol>
            </>
          )}

          <div className="dc-actions">
            <button type="button" className="btn btn-primary" onClick={toForm}>
              Ergebnis im Erstgespräch besprechen
              <svg className="ic" aria-hidden="true"><use href="#i-arrow" /></svg>
            </button>
            <button type="button" className="dc-back" onClick={restart}>Check neu starten</button>
          </div>
          <p className="dc-note">Beispielpreise exkl. MwSt. Den verbindlichen Preis erhalten Sie nach der kostenlosen Analyse.</p>
        </div>
      )}
    </div>
  );
}

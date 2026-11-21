import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import markup from './home-v2.html?raw';
import '../styles/home-v2.css';

/**
 * Startseite V2 nach dem Entwurf von schnellstart.ai.
 * Inhalt und Gestaltung stehen in home-v2.html und styles/home-v2.css,
 * die kleinen Animationen und die Preis-Demo im Effekt unten.
 */
export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];
    const timers: number[] = [];
    const on = <K extends keyof WindowEventMap>(t: Window, ev: K, fn: (e: WindowEventMap[K]) => void, opt?: AddEventListenerOptions) => {
      t.addEventListener(ev, fn as EventListener, opt);
      cleanups.push(() => t.removeEventListener(ev, fn as EventListener));
    };
    const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = root) => c.querySelector(s) as T | null;
    const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = root) => Array.from(c.querySelectorAll(s)) as T[];
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const hasIO = 'IntersectionObserver' in window;
    root.classList.add('js');

    // Interne Links (/impressum usw.) über den Router öffnen, Anker (#…) sanft ansteuern
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        const el = document.getElementById(href.slice(1));
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
          history.replaceState(null, '', href);
        }
      } else if (href.startsWith('/')) {
        e.preventDefault();
        navigate(href);
      }
    };
    root.addEventListener('click', onClick);
    cleanups.push(() => root.removeEventListener('click', onClick));

    // Navigation: beim Scrollen dunkel hinterlegt
    const nav = $('#nav');
    const onScroll = () => nav?.classList.toggle('solid', window.scrollY > 30);
    on(window, 'scroll', onScroll, { passive: true });
    onScroll();

    const observers: IntersectionObserver[] = [];
    // Einblenden (nur Verschiebung, Inhalt bleibt sichtbar)
    const seen = hasIO && !reduce
      ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); seen!.unobserve(e.target); } }), { threshold: 0.15 })
      : null;
    if (seen) observers.push(seen);
    $$('[data-reveal]').forEach((el) => (seen ? seen.observe(el) : el.classList.add('in')));

    // Linke Leiste: aktiven Abschnitt markieren
    if (hasIO) {
      const links: Record<string, HTMLElement> = {};
      $$('.rail a').forEach((a) => { links[a.getAttribute('data-sec') || ''] = a; });
      const spy = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) {
          Object.values(links).forEach((l) => l.classList.remove('on'));
          links[e.target.id]?.classList.add('on');
        }
      }), { rootMargin: '-45% 0px -50% 0px' });
      observers.push(spy);
      Object.keys(links).forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
    }

    // Übersicht: Zahlen hochzählen
    const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '’');
    const dash = $('#dash');
    if (dash && hasIO && !reduce) {
      const dio = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        dash.classList.add('in');
        $$('.cnt').forEach((el) => {
          const to = Number(el.getAttribute('data-to'));
          let t0: number | null = null;
          const step = (t: number) => {
            if (t0 === null) t0 = t;
            const p = Math.min(1, (t - t0) / 1200);
            el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(to);
          };
          el.textContent = fmt(0);
          requestAnimationFrame(step);
        });
        dio.disconnect();
      }), { threshold: 0.4 });
      observers.push(dio);
      dio.observe(dash);
    }

    // Preis-Demo: einmal ändern, überall aktuell
    const base = 18.5;
    let changed = false, busy = false;
    const demo = $('#demo');
    const devs = demo ? $$('.dev', demo) : [];
    const btn = $<HTMLButtonElement>('#priceBtn');
    const note = $('#priceNote');
    const apply = (i: number, v: number) => {
      const d = devs[i]; if (!d) return;
      $$('[data-px]', d).forEach((el) => { el.textContent = v.toFixed(2); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); });
      $$('[data-total]', d).forEach((el) => { el.textContent = (v + 46 + 9.5).toFixed(2); });
      const pill = $('[data-pill]', d); if (pill) { pill.textContent = '✓ aktuell'; pill.classList.remove('busy'); }
    };
    const setBusy = (i: number) => { const p = $('[data-pill]', devs[i]); if (p) { p.textContent = 'wird aktualisiert …'; p.classList.add('busy'); } };
    const run = (toNew: boolean) => {
      if (busy) return; busy = true; changed = toNew;
      const v = toNew ? base + 1 : base, gap = reduce ? 0 : 520;
      devs.forEach((_, i) => {
        timers.push(window.setTimeout(() => setBusy(i), i * gap));
        timers.push(window.setTimeout(() => apply(i, v), i * gap + (reduce ? 0 : 420)));
      });
      timers.push(window.setTimeout(() => {
        busy = false;
        if (changed) $('#einmalCta')?.classList.add('nudge');
        const lbl = btn?.querySelector('span'); if (lbl) lbl.textContent = changed ? 'Preis zurücksetzen' : 'Preis in der Kasse ändern';
        if (note) note.textContent = changed ? 'Geändert: Pizza Margherita kostet jetzt 19.50 Franken, überall.' : 'Beispiel: Pizza Margherita von 18.50 auf 19.50 Franken.';
      }, devs.length * gap + (reduce ? 0 : 520)));
    };
    const onPrice = () => run(!changed);
    btn?.addEventListener('click', onPrice);
    cleanups.push(() => btn?.removeEventListener('click', onPrice));
    if (demo && hasIO && !reduce) {
      const auto = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { auto.disconnect(); timers.push(window.setTimeout(() => { if (!changed) run(true); }, 900)); }
      }), { threshold: 0.55 });
      observers.push(auto);
      auto.observe(demo);
    }

    // E-Mail-Adresse kopieren
    const cb = $('#copyBtn');
    const onCopy = () => {
      const mail = $('#mailTxt'); if (!mail) return;
      const lab = cb!.querySelector('span')!;
      const done = (ok: boolean) => { lab.textContent = ok ? 'Kopiert' : 'Markiert'; timers.push(window.setTimeout(() => { lab.textContent = 'Kopieren'; }, 1800)); };
      const sel = () => { const r = document.createRange(); r.selectNodeContents(mail); const s = getSelection(); s?.removeAllRanges(); s?.addRange(r); done(false); };
      try { navigator.clipboard?.writeText ? navigator.clipboard.writeText(mail.textContent || '').then(() => done(true), sel) : sel(); } catch { sel(); }
    };
    cb?.addEventListener('click', onCopy);
    cleanups.push(() => cb?.removeEventListener('click', onCopy));

    // Preise: «Was passt zu Ihrem Betrieb?»
    const chips = $$('.pick-chip'), prs = $$('.pr'), pout = $('#pickOut'), prow = $('.prices');
    chips.forEach((c) => {
      const onPick = () => {
        const card = prs[Number(c.getAttribute('data-pick'))]; if (!card) return;
        chips.forEach((o) => o.setAttribute('aria-pressed', o === c ? 'true' : 'false'));
        prs.forEach((p) => p.classList.toggle('sel', p === card));
        const amount = (card.querySelector('.price')?.firstChild?.nodeValue || '').trim();
        if (pout) pout.textContent = `Für ${c.textContent} passt: ${card.querySelector('h3')?.textContent}, ${amount}.`;
        if (prow && prow.scrollWidth > prow.clientWidth + 2) {
          const pad = parseFloat(getComputedStyle(prow).paddingLeft) || 0;
          const x = card.getBoundingClientRect().left - prow.getBoundingClientRect().left + prow.scrollLeft - pad;
          prow.scrollTo({ left: x, behavior: reduce ? 'auto' : 'smooth' });
        }
      };
      c.addEventListener('click', onPick);
      cleanups.push(() => c.removeEventListener('click', onPick));
    });

    // Wischreihen nur dann per Tastatur erreichbar, wenn sie wirklich scrollen
    const syncSwipe = () => $$('.swipe').forEach((el) => {
      if (el.scrollWidth > el.clientWidth + 2) { el.tabIndex = 0; el.setAttribute('role', 'region'); el.setAttribute('aria-label', el.getAttribute('data-label') || ''); }
      else { el.removeAttribute('tabindex'); el.removeAttribute('role'); el.removeAttribute('aria-label'); }
    });
    syncSwipe();
    on(window, 'resize', syncSwipe);

    // Leistungen: nur eine Detailansicht gleichzeitig offen
    const sd = $$<HTMLDetailsElement>('.svc-d');
    sd.forEach((d) => {
      const onToggle = () => { if (d.open) sd.forEach((o) => { if (o !== d) o.open = false; }); };
      d.addEventListener('toggle', onToggle);
      cleanups.push(() => d.removeEventListener('toggle', onToggle));
    });

    // Direkt auf einen Abschnitt verlinkt (z. B. /#kontakt)
    if (window.location.hash) timers.push(window.setTimeout(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView(), 60));

    return () => {
      cleanups.forEach((f) => f());
      observers.forEach((o) => o.disconnect());
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [navigate]);

  return (
    <>
      <PageMeta
        title="SmartGastro.ai | Kassensystem, Website und KI für Restaurants aus einer Hand"
        description="Kasse, Website, digitale Speisekarte und KI aus einer Hand. Eingerichtet von Thomas Ballinari, gelerntem Koch und zertifiziertem KI-Spezialisten, ohne Betriebsunterbruch."
      />
      <div ref={ref} className="sg2" dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}

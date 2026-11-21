import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { BRAND } from '../constants';

/**
 * Datenschutzerklärung nach Schweizer Datenschutzgesetz (DSG, seit 1.9.2023), ergänzend DSGVO.
 * Stand der beschriebenen Dienste: Netlify (Hosting, Formulare), Make (Automationen), E-Mail.
 * Bei neuen Diensten (Analyse, Videos, Zahlungen) diese Seite anpassen.
 */
const STAND = '21. November 2026';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-3 text-anthrazit">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="py-24 bg-white">
      <PageMeta title="Datenschutz" description="Datenschutzerklärung von SmartGastro.ai nach Schweizer Datenschutzgesetz: welche Daten wir bearbeiten, wofür und welche Rechte Sie haben." />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-4">Datenschutzerklärung</h1>
        <p className="text-sm text-anthrazit/55 mb-12">Stand: {STAND}</p>

        <div className="text-anthrazit/80 leading-relaxed space-y-10">
          <Section title="1. Verantwortlich">
            <p>Verantwortlich für die Bearbeitung Ihrer Personendaten auf dieser Website ist:</p>
            <p>
              Thomas Ballinari, SmartGastro.ai<br />
              {BRAND.location}, Schweiz<br />
              E-Mail: <a href={`mailto:${BRAND.email}`} className="text-forest underline underline-offset-2">{BRAND.email}</a>
            </p>
            <p>Für alle Fragen zum Datenschutz und für die Ausübung Ihrer Rechte erreichen Sie uns unter dieser Adresse.</p>
          </Section>

          <Section title="2. Worum es geht">
            <p>
              Diese Erklärung beschreibt, welche Personendaten wir beim Besuch von smartgastro.ai und bei einer Anfrage bearbeiten, zu welchem Zweck und an wen sie weitergegeben werden.
              Massgebend ist das Schweizer Bundesgesetz über den Datenschutz (DSG). Soweit die Datenschutz-Grundverordnung der EU (DSGVO) anwendbar ist, gilt diese Erklärung auch in deren Sinne.
            </p>
            <p>Wir verwenden keine Werbe- oder Analyse-Cookies und betreiben kein Tracking.</p>
          </Section>

          <Section title="3. Besuch der Website und Hosting">
            <p>
              Die Website wird bei Netlify, Inc. (San Francisco, USA) betrieben. Beim Aufruf einer Seite werden technisch notwendige Angaben in Server-Protokollen erfasst:
              IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, zuvor besuchte Seite (Referrer) sowie Browser und Betriebssystem.
            </p>
            <p>
              Zweck: Auslieferung der Website, Stabilität und Schutz vor Missbrauch. Die Protokolle werden von Netlify nach kurzer Zeit automatisch gelöscht.
            </p>
          </Section>

          <Section title="4. Erstgespräch und Kontaktformular">
            <p>
              Wenn Sie über das Formular ein Erstgespräch anfragen, bearbeiten wir die Angaben, die Sie eintragen: Name, E-Mail-Adresse, Betrieb, Telefonnummer, Interesse,
              Wunschtermin, bevorzugte Gesprächsart und Ihre Nachricht. Pflichtfelder sind markiert, alle anderen Angaben sind freiwillig.
            </p>
            <p>Zweck: Beantwortung Ihrer Anfrage, Terminvereinbarung und gegebenenfalls Erstellung eines Angebots.</p>
            <p>Dabei sind folgende Dienstleister beteiligt:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Netlify Forms</strong> (Netlify, Inc., USA): Entgegennahme und Speicherung der Formulardaten.</li>
              <li><strong>E-Mail</strong>: Die Anfrage wird als E-Mail an unsere Postfächer weitergeleitet.</li>
              <li><strong>Make</strong> (Celonis Automation s.r.o., Prag, Tschechien): Automatische Weiterverarbeitung der Anfrage, zum Beispiel zur Ablage in unserer Kundenverwaltung.</li>
            </ul>
            <p>
              Wir bewahren Anfragen so lange auf, wie es für die Bearbeitung und eine allfällige Zusammenarbeit nötig ist, und löschen sie spätestens zwei Jahre nach dem letzten Kontakt,
              sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>
          </Section>

          <Section title="5. Kontakt per E-Mail">
            <p>
              Wenn Sie uns direkt per E-Mail schreiben, bearbeiten wir Ihre Adresse und den Inhalt Ihrer Nachricht, um Ihre Anfrage zu beantworten. Für die Aufbewahrung gilt dasselbe wie beim Formular.
            </p>
          </Section>

          <Section title="6. Bekanntgabe ins Ausland">
            <p>
              Netlify hat seinen Sitz in den USA. Für die USA hat die Schweiz kein generell angemessenes Datenschutzniveau festgestellt, ausser für Unternehmen, die unter dem
              Swiss-U.S. Data Privacy Framework zertifiziert sind. Wo das nicht der Fall ist, stützen wir uns auf die vom Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB)
              anerkannten Standardvertragsklauseln des Anbieters. Make bearbeitet Daten in der EU, deren Datenschutzniveau die Schweiz als angemessen anerkennt.
            </p>
          </Section>

          <Section title="7. Cookies und Speicherung im Browser">
            <p>
              Diese Website setzt keine Cookies und speichert keine Daten im Browser. Auch der Digital-Check und die Demo-Speisekarte laufen nur auf Ihrem Gerät;
              Ihre Antworten werden weder übertragen noch gespeichert, solange Sie sie nicht selbst über das Kontaktformular senden.
            </p>
          </Section>

          <Section title="8. Schriften und Bilder">
            <p>
              Schriften und Bilder werden direkt von unserer Website geladen. Es besteht dabei keine Verbindung zu Google Fonts oder anderen Drittanbietern.
            </p>
          </Section>

          <Section title="9. Links auf andere Websites">
            <p>
              Unsere Website enthält Links auf Angebote Dritter, zum Beispiel die Demo der SmartGastro Engine (Google Gemini) oder die Fotografen auf Unsplash.
              Erst wenn Sie einen solchen Link anklicken, werden Daten an den jeweiligen Anbieter übermittelt. Für deren Datenbearbeitung ist der jeweilige Anbieter verantwortlich.
            </p>
          </Section>

          <Section title="10. Ihre Rechte">
            <p>Sie haben im Rahmen des Datenschutzrechts insbesondere das Recht,</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Auskunft darüber zu verlangen, ob und welche Personendaten wir über Sie bearbeiten,</li>
              <li>unrichtige Daten berichtigen zu lassen,</li>
              <li>die Löschung Ihrer Daten zu verlangen, soweit keine Aufbewahrungspflicht besteht,</li>
              <li>einer Bearbeitung zu widersprechen,</li>
              <li>die Herausgabe Ihrer Daten in einem gängigen elektronischen Format zu verlangen.</li>
            </ul>
            <p>
              Schreiben Sie dazu an <a href={`mailto:${BRAND.email}`} className="text-forest underline underline-offset-2">{BRAND.email}</a>. Wir können einen Identitätsnachweis verlangen.
              Sie können sich ausserdem beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB, <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener" className="text-forest underline underline-offset-2">edoeb.admin.ch</a>) beschweren.
            </p>
          </Section>

          <Section title="11. Datensicherheit">
            <p>
              Die Website wird ausschliesslich verschlüsselt (HTTPS) ausgeliefert und mit Sicherheitsvorgaben für den Browser geschützt.
              Mehr dazu auf der Seite <Link to="/sicherheit" className="text-forest underline underline-offset-2">Sicherheit</Link>.
            </p>
          </Section>

          <Section title="12. Änderungen">
            <p>Wir passen diese Erklärung an, wenn sich unsere Website oder die eingesetzten Dienste ändern. Es gilt die jeweils hier veröffentlichte Fassung.</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

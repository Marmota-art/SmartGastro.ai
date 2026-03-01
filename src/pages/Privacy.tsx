import SmartGastroText from '../components/SmartGastroText';

export default function Privacy() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-12">Datenschutzerklärung</h1>
        <div className="prose prose-lg text-anthrazit/80 space-y-8">
          <p>
            Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:
          </p>
          <p>
            <SmartGastroText /><br />
            Thomas Ballinari<br />
            CH–St. Gallen
          </p>
          
          <section>
            <h2 className="text-xl font-bold mb-4">Ihre Betroffenenrechte</h2>
            <p>
              Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte ausüben:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung,</li>
              <li>Berichtigung unrichtiger personenbezogener Daten,</li>
              <li>Löschung Ihrer bei uns gespeicherten Daten,</li>
              <li>Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Erfassung allgemeiner Informationen beim Besuch unserer Website</h2>
            <p>
              Wenn Sie auf unsere Website zugreifen, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und Ähnliches.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import PageMeta from '../components/PageMeta';
import { Link } from 'react-router-dom';
import SmartGastroText from '../components/SmartGastroText';

export default function Security() {
  return (
    <div className="py-24 bg-white">
      <PageMeta title="Sicherheit" description="Wie SmartGastro.ai die Website und Ihre Daten schützt: Verschlüsselung, Hosting, Sicherheitsvorgaben und der Umgang mit Ihren Betriebsdaten." />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-12">Sicherheit</h1>
        <div className="prose prose-lg text-anthrazit/80 space-y-8">
          <p>
            Die Sicherheit Ihrer Daten und die Zuverlässigkeit unserer Systeme haben bei <SmartGastroText /> höchste Priorität.
          </p>
          
          <section>
            <h2 className="text-xl font-bold mb-4">Verschlüsselung</h2>
            <p>
              Die Website wird ausschliesslich verschlüsselt über HTTPS (TLS) ausgeliefert. Auch Anfragen über das Kontaktformular werden verschlüsselt übertragen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Hosting</h2>
            <p>
              Die Website läuft bei Netlify, Inc. (USA) und wird über deren weltweites Netz von Servern ausgeliefert. Netlify schützt die Plattform unter anderem vor Überlastungsangriffen (DDoS)
              und hält die Server-Software aktuell. Welche Daten dabei bearbeitet werden, steht in der <Link to="/datenschutz" className="text-forest underline underline-offset-2">Datenschutzerklärung</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Schutz im Browser</h2>
            <p>
              Die Website gibt dem Browser strenge Sicherheitsvorgaben mit: Sie lädt Programme, Schriften und Bilder nur von der eigenen Adresse, lässt sich nicht in fremde Seiten einbetten
              und setzt weder Werbe- noch Analyse-Cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Ihre Betriebsdaten</h2>
            <p>
              Wenn ich für Sie Kassendaten, Speisekarten oder Artikel bearbeite, bespreche ich vorher mit Ihnen, wo die Daten liegen, wer Zugriff hat und wann sie gelöscht werden.
              Daten Ihrer Gäste bearbeite ich nur, soweit es für den Auftrag nötig ist.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

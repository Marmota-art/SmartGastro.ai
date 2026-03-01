import SmartGastroText from '../components/SmartGastroText';

export default function Security() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-12">Sicherheit</h1>
        <div className="prose prose-lg text-anthrazit/80 space-y-8">
          <p>
            Die Sicherheit Ihrer Daten und die Zuverlässigkeit unserer Systeme haben bei <SmartGastroText /> höchste Priorität.
          </p>
          
          <section>
            <h2 className="text-xl font-bold mb-4">Verschlüsselung</h2>
            <p>
              Unsere Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Infrastruktur</h2>
            <p>
              Wir nutzen moderne Cloud-Infrastrukturen mit Standorten in Europa, die höchste Sicherheitsstandards erfüllen. Regelmäßige Backups und Sicherheitsupdates sind Teil unseres Standardprozesses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Netlify Security</h2>
            <p>
              Durch das Hosting auf Netlify profitieren wir von deren globalem CDN, DDoS-Schutz und automatisierten Sicherheitsfeatures auf Plattformebene.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import PageMeta from '../components/PageMeta';
import SmartGastroText from '../components/SmartGastroText';

export default function Impressum() {
  return (
    <div className="py-24 bg-white">
      <PageMeta title="Impressum" description="Impressum von SmartGastro.ai, Thomas Ballinari, St. Gallen." />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-12">Impressum</h1>
        <div className="prose prose-lg text-anthrazit/80 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">Kontaktadresse</h2>
            <p>
              <SmartGastroText /><br />
              Thomas Ballinari<br />
              Volksbadstrasse 17a<br />
              9000 St. Gallen<br />
              Schweiz
            </p>
            <p className="mt-4">
              E-Mail: hello@smartgastro.ai
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Vertretungsberechtigte Personen</h2>
            <p>Thomas Ballinari, Inhaber</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Haftungsausschluss</h2>
            <p>
              Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

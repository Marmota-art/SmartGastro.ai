import PageMeta from '../components/PageMeta';
import { PageHero, ReferenceGrid, CtaBand } from '../components/Sections';

export default function References() {
  return (
    <>
      <PageMeta
        title="Referenzen: Restaurant Löwenburg, Pizzeria Di Grano, Café Park"
        description="SmartGastro.ai im Einsatz: Restaurant Löwenburg in Lienz, Pizzeria Di Grano und Restaurant Café Park in St. Gallen."
      />
      <PageHero
        eyebrow="Referenzen"
        title={<>Echte Betriebe. <span className="text-forest">Echte Projekte.</span></>}
        lead="Vom Landgasthof im Rheintal bis zur Stadtpizzeria in St. Gallen – diese Betriebe arbeiten mit SmartGastro."
      />
      <section className="pb-12">
        <div className="container-x">
          <ReferenceGrid />
        </div>
      </section>
      <CtaBand title="Ihr Betrieb als nächste Referenz?" text="Ob Café, Pizzeria oder Landgasthof: Im Erstgespräch finden wir heraus, welche Lösung zu Ihnen passt." />
    </>
  );
}

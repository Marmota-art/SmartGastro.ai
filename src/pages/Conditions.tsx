import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Clock, UserCheck, CreditCard } from 'lucide-react';

const CONDITIONS = [
  { title: 'Transparente Preise', icon: <CheckCircle2 size={28} />, desc: 'Keine versteckten Kosten. Alle Preise verstehen sich exkl. MwSt.' },
  { title: 'Zahlungsarten', icon: <CreditCard size={28} />, desc: 'Wir akzeptieren alle gängigen Kreditkarten, TWINT und Banküberweisung.' },
  { title: 'Datenschutz & Sicherheit', icon: <ShieldCheck size={28} />, desc: 'Ihre Daten sind bei uns sicher. Wir halten uns an Schweizer Standards.' },
  { title: 'Flexibilität', icon: <Clock size={28} />, desc: 'Wir passen unsere Lösungen an Ihre individuellen Bedürfnisse an.' },
  { title: 'Persönlicher Support', icon: <UserCheck size={28} />, desc: 'Wir sind für Sie da, wenn Sie uns brauchen – vor Ort oder digital.' },
];

export default function Conditions() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Konditionen</h1>
          <p className="text-xl text-anthrazit/70 max-w-3xl mx-auto">
            Fairness und Transparenz sind die Basis unserer Zusammenarbeit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {CONDITIONS.map((condition, idx) => (
            <motion.div
              key={condition.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start space-x-6 p-10 bg-hellgrau rounded-3xl"
            >
              <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0">
                {condition.icon}
              </div>
              <div>
                <h3 className="text-xl font-display font-bold mb-4">{condition.title}</h3>
                <p className="text-anthrazit/70 leading-relaxed">{condition.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-primary rounded-[3rem] text-white text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Stundensatz KI-Spezialist</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Für individuelle KI-Entwicklungen und Beratungen berechnen wir einen professionellen Stundensatz von CHF 180.– (exkl. MwSt.).
          </p>
        </div>
      </div>
    </div>
  );
}

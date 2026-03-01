import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Thanks() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-hellgrau py-24">
      <div className="max-w-md w-full mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-3xl font-display font-bold mb-4">Vielen Dank!</h1>
        <p className="text-lg text-anthrazit/70 mb-10 leading-relaxed">
          Vielen Dank für Ihr Vertrauen. Wir haben Ihre Anfrage bzw. Bestellung erhalten und werden uns so schnell wie möglich bei Ihnen melden.
        </p>
        <Link
          to="/"
          className="btn-xl bg-primary text-white font-bold hover:bg-accent hover:text-anthrazit inline-block"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}

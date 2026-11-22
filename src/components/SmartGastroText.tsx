import React from 'react';

interface SmartGastroTextProps {
  className?: string;
  withAcademy?: boolean;
  withEngine?: boolean;
  dark?: boolean;
}

export default function SmartGastroText({ className = "", withAcademy = false, withEngine = false, dark = false }: SmartGastroTextProps) {
  // Markenfarben: Smart = St. Galler Grün, Gastro = Gelb, .ai = Weiss (auf dunklem Grund).
  // Auf hellem Grund (Fliesstext) werden Grün und .ai dunkler gesetzt, damit sie lesbar bleiben.
  const dotAiColor = dark ? "text-white" : "text-anthrazit";
  const suffixColor = dark ? "text-white" : "text-anthrazit";

  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      <span className={dark ? "text-sgreen" : "text-primary"}>Smart</span>
      <span className="text-accent">Gastro</span>
      {!withAcademy && !withEngine && <span className={dotAiColor}>.ai</span>}
      {withAcademy && <span className={` ml-2 ${suffixColor}`}>Academy</span>}
      {withEngine && <span className={` ml-2 ${suffixColor}`}>Engine</span>}
    </span>
  );
}

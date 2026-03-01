import React from 'react';

interface SmartGastroTextProps {
  className?: string;
  withAcademy?: boolean;
  withEngine?: boolean;
  dark?: boolean;
}

export default function SmartGastroText({ className = "", withAcademy = false, withEngine = false, dark = false }: SmartGastroTextProps) {
  const dotAiColor = dark ? "text-white/90" : "text-anthrazit";
  const suffixColor = dark ? "text-white/90" : "text-anthrazit";

  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      <span className="text-primary">Smart</span>
      <span className="text-accent">Gastro</span>
      {!withAcademy && !withEngine && <span className={dotAiColor}>.ai</span>}
      {withAcademy && <span className={` ml-2 ${suffixColor}`}>Academy</span>}
      {withEngine && <span className={` ml-2 ${suffixColor}`}>Engine</span>}
    </span>
  );
}

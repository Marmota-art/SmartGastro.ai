import { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMetaProps {
  title: string;
  description: string;
}

/** Beim Vorrendern (scripts/prerender.mjs) sammelt dieses Objekt Titel und Beschreibung der Seite. */
export type HeadData = { title?: string; description?: string };
export const HeadContext = createContext<HeadData | null>(null);

export function fullTitle(title: string) {
  return title.includes('SmartGastro') ? title : `${title} | SmartGastro.ai`;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Setzt Seitentitel, Beschreibung, Canonical und Vorschau-Tags pro Seite. */
export default function PageMeta({ title, description }: PageMetaProps) {
  const pathname = useLocation().pathname.replace(/\/+$/, '') || '/';
  const head = useContext(HeadContext);
  if (head) {
    head.title = fullTitle(title);
    head.description = description;
  }

  useEffect(() => {
    const t = fullTitle(title);
    const url = `https://smartgastro.ai${pathname === '/' ? '/' : pathname}`;
    document.title = t;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', t);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [title, description, pathname]);

  return null;
}

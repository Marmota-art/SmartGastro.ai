import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMetaProps {
  title: string;
  description: string;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Setzt Seitentitel, Beschreibung, Canonical und Vorschau-Tags pro Seite. */
export default function PageMeta({ title, description }: PageMetaProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title.includes('SmartGastro') ? title : `${title} | SmartGastro.ai`;
    const url = `https://smartgastro.ai${pathname === '/' ? '/' : pathname}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [title, description, pathname]);

  return null;
}

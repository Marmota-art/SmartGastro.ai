/**
 * Vorrendern für Google: rendert eine Seite der App zu fertigem HTML.
 * Wird nur beim Build verwendet (scripts/prerender.mjs), nie im Browser.
 */
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { HeadContext, type HeadData } from './components/PageMeta';

export { schemaFor } from './seo';

export async function render(url: string): Promise<{ html: string; head: HeadData }> {
  const head: HeadData = {};
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <HeadContext.Provider value={head}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  );
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return { html: Buffer.concat(chunks).toString('utf8'), head };
}

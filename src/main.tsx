import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
// Schriften lokal ausgeliefert (kein Abruf bei Google, schneller und datenschutzfreundlich)
import '@fontsource-variable/inter';
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Vorgerenderte Seiten (für Google) übernehmen, sonst neu aufbauen (z. B. im Entwicklungsmodus)
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);

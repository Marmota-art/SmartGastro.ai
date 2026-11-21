import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
// Schriften lokal ausgeliefert (kein Abruf bei Google, schneller und datenschutzfreundlich)
import '@fontsource-variable/inter';
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

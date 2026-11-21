import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

/**
 * Lädt die zwei Hauptschriften (lateinischer Zeichensatz) früh vor.
 * Sonst erscheinen sie erst nach dem ersten Bild und die Überschrift springt (Layout-Verschiebung).
 */
function preloadFonts(): Plugin {
  const wanted = [/inter-latin-wght-normal-[\w-]+\.woff2$/, /bricolage-grotesque-latin-opsz-normal-[\w-]+\.woff2$/];
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      const files = Object.keys(ctx.bundle ?? {}).filter((f) => wanted.some((re) => re.test(f)));
      return files.map((f) => ({
        tag: 'link',
        attrs: { rel: 'preload', href: `/${f}`, as: 'font', type: 'font/woff2', crossorigin: '' },
        injectTo: 'head-prepend' as const,
      }));
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    plugins: [react(), tailwindcss(), preloadFonts()],
    // Gehashte Build-Dateien in eigenem Ordner, damit sie lange im Browser zwischengespeichert werden dürfen
    build: { assetsDir: 'assets/build' },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

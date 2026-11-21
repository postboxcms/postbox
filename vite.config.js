import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themesDirectory = path.resolve(__dirname, 'resources/js/framework/themes');

const themes = fs.readdirSync(themesDirectory, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map(({ name }) => {
    const manifestPath = path.join(themesDirectory, name, 'manifest.json');
    let theme;
    try {
      theme = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (error) {
      throw new Error(`Unable to load theme manifest at ${manifestPath}: ${error.message}`);
    }
    return { ...theme, dbval: name };
  });

const themeStyles = Object.fromEntries(
  themes.map(({ dbval }) => [
    `theme-${dbval}`,
    `resources/js/framework/themes/${dbval}/assets/theme.scss`,
  ])
);

const input = {
  app: 'resources/js/app.js',
  website: 'resources/js/framework/website/client.js',
  styles: 'resources/sass/app.scss',
  ...themeStyles,
};

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const publicEnv = Object.fromEntries(
    Object.entries(env).filter(([key]) => key === 'APP_ENV' || key.startsWith('MIX_'))
  );
  const publicDefines = Object.fromEntries(
    Object.entries(publicEnv).map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
  );

  return {
    define: {
      ...publicDefines,
      __PBX_THEMES_DATA__: JSON.stringify(themes),
    },
    plugins: [
      laravel({
        input: Object.values(input),
        refresh: true,
      }),
      react({
        jsxRuntime: 'automatic',
        include: /resources\/js\/.*\.js?x?$/,
        exclude: [],
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 5173,
      origin: 'http://localhost:5173',
      cors: {
        origin: env.APP_URL || 'http://localhost',
      },
      strictPort: true,
      watch: {
        usePolling: process.env.VITE_WATCH_USE_POLLING === 'true',
      },
    },
    build: {
      outDir: path.resolve(__dirname, 'public/build'),
      emptyOutDir: true,
      ssrManifest: true,
      rollupOptions: {
        input,
        output: {
          entryFileNames: isSsrBuild ? '[name].mjs' : '[name].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /resources\/js\/.*\.js$/,
      exclude: [],
    },
    resolve: {
      alias: {
        '@root': path.resolve(__dirname),
        '@resources': path.resolve(__dirname, 'resources'),
        '@framework': path.resolve(__dirname, 'resources/js/framework'),
        '@app': path.resolve(__dirname, 'resources/js/framework/app'),
        '@modules': path.resolve(__dirname, 'resources/js/framework/app/modules'),
        '@providers': path.resolve(__dirname, 'resources/js/framework/app/providers'),
        '@ui': path.resolve(__dirname, 'resources/js/framework/app/modules/ui'),
        '@website': path.resolve(__dirname, 'resources/js/framework/app/modules/website'),
        '@themes': path.resolve(__dirname, 'resources/js/framework/themes'),
        'redux-persist/integration/react': 'redux-persist/lib/integration/react.js',
      },
    },
    ssr: {
      noExternal: true,
    },
  };
});

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const hashedFilename = (ext) => {
    const hash = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    return `${ext}/${hash}`;
  };

  return {
    define: {
      'process.env': env,
    },
    plugins: [
      laravel([
        'resources/js/website/server.js',
        'resources/js/app.js',
        'resources/css/app.css',
        'resources/css/theme.css',
      ]),
      react({
        jsxRuntime: 'automatic',
        include: /resources\/js\/.*\.js?x?$/,
        exclude: [],
      }),
    ],
    build: {
      outDir: path.resolve(__dirname, 'public/build'),
      port: 5172,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          client: 'resources/js/website/client.js',
          server: 'resources/js/website/server.js',
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: hashedFilename('js') + '.js',
          assetFileNames: hashedFilename('[ext]') + '.[ext]',
        },
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /resources\/js\/.*\.js?$/,
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
        '@themes': path.resolve(__dirname, 'resources/js/themes'),
        'redux-persist/integration/react': 'redux-persist/lib/integration/react.js',
      },
    },
    ssr: {
      noExternal: true,
    },
  };
});

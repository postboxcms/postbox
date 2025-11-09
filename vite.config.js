import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react({
        jsxRuntime: 'automatic',
        include: /resources\/js\/.*\.js?x?$/,
        exclude: [],
    })],
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        manifest: true,
        rollupOptions: {
            input: {
                client: 'resources/js/website/client.js',
                server: 'resources/js/website/server.js',
            },
        },
    },
    esbuild: {
        loader: 'jsx',
        include: /resources\/js\/.*\.js?x?$/,
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
            '@ui': path.resolve(__dirname, 'resources/js/framework/app/ui'),
            '@website': path.resolve(__dirname, 'resources/js/framework/website'),
            'redux-persist/integration/react': 'redux-persist/lib/integration/react.js'
        }
    },
    ssr: {
        noExternal: true,
    },
})

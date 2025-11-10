import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel([
            'resources/js/website/client.js',
            'resources/js/website/server.js',
        ]),
        react({
            jsxRuntime: 'automatic',
            include: /resources\/js\/.*\.js?x?$/,
            exclude: [],
        })
    ],
    build: {
        outDir: path.resolve(__dirname, 'public/build'),
        port: 5172,
        rollupOptions: {
            input: {
                client: 'resources/js/website/client.js',
                server: 'resources/js/website/server.js',
            },
            output: {
                entryFileNames: '[name]/[name].js',
                chunkFileNames: '[name]/[name].js',
                assetFileNames: '[name]/[name].[ext]',
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
            '@ui': path.resolve(__dirname, 'resources/js/framework/app/ui'),
            '@website': path.resolve(__dirname, 'resources/js/framework/website'),
            'redux-persist/integration/react': 'redux-persist/lib/integration/react.js'
        }
    },
    ssr: {
        noExternal: true,
    },
})

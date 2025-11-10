import path from 'path';
import { fileURLToPath } from 'url';
import mix from 'laravel-mix';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
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
      }
   }
})

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css', {
      sassOptions: {
         quietDeps: true,
      }
   })
   .sass('resources/sass/theme.scss', 'public/css', {
      sassOptions: {
         quietDeps: true,
      }
   })
   .react();

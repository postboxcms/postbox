const mix = require('laravel-mix');
const path = require('path');

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
         '@app': path.resolve(__dirname, 'resources/js/framework/app'),
         '@ui': path.resolve(__dirname, 'resources/js/framework/app/ui'),
         '@modules': path.resolve(__dirname, 'resources/js/framework/app/modules'),
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

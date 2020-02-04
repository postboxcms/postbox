const mix = require('laravel-mix');

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
mix.config.publicPath = 'assets';
mix.js('resources/js/app.js', 'assets/js')
   .copy('resources/js/box.js','assets/js')
   .sass('resources/sass/frontend/theme.scss', 'assets/css/')
   .sass('resources/sass/admin/theme.scss', 'assets/css/admin')
   .copyDirectory('resources/js/push-router', 'assets/js/push-router')
   .copyDirectory('resources/images','assets/images')
   .copyDirectory('resources/js/admin','assets/js/admin')
   .copyDirectory('resources/vendor', 'assets/vendor')
   .copyDirectory('assets/js','welcome/js')
   .copyDirectory('assets/css','welcome/css')
   .copyDirectory('assets/images','welcome/images')
   .copyDirectory('assets/vendor','welcome/vendor');

import path from 'path';
import fs from 'fs';
import mix from 'laravel-mix';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getThemeConfigurations = () => {
  try {
    const folderPath = './resources/js/themes/';
    const content = fs.readdirSync(folderPath);
    const folders = content.filter((folder) => {
      const fullPath = path.join(folderPath, folder);
      return fs.statSync(fullPath).isDirectory();
    });
    return folders
      .map((theme) => {
        try {
          const parsedConfig = JSON.parse(
            fs.readFileSync(`${folderPath}/${theme}/manifest.json`, 'utf8')
          );
          parsedConfig.dbval = theme;
          return parsedConfig;
        } catch (e) {
          return;
        }
      })
      .filter(Boolean);
  } catch (e) {
    throw new Error('ThemeRenderException:', e);
  }
};
const themes = getThemeConfigurations();

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
    fallback: {
      fs: false,
    },
    alias: {
      '@root': path.resolve(__dirname),
      '@resources': path.resolve(__dirname, 'resources'),
      '@framework': path.resolve(__dirname, 'resources/js/framework'),
      '@app': path.resolve(__dirname, 'resources/js/framework/app'),
      '@modules': path.resolve(__dirname, 'resources/js/framework/app/modules'),
      '@providers': path.resolve(__dirname, 'resources/js/framework/app/providers'),
      '@ui': path.resolve(__dirname, 'resources/js/framework/app/ui'),
      '@website': path.resolve(__dirname, 'resources/js/framework/website'),
      '@themes': path.resolve(__dirname, 'resources/js/themes'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __PBX_THEMES_DATA__: JSON.stringify(themes) || [],
    }),
  ],
});

mix
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css', {
    sassOptions: {
      quietDeps: true,
    },
  })
  .react();

themes.forEach((theme) => {
  mix
    .sass(
      `resources/js/themes/${theme.dbval}/assets/theme.scss`,
      `public/themes/${theme.dbval}/css/theme.css`,
      {
        sassOptions: {
          quietDeps: true,
        },
      }
    )
    .options({
      processCssUrls: false,
    });
});

if (mix.inProduction()) {
  mix.version();
} else {
  mix.sourceMaps();
}
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import process from 'node:process';
import ora from 'ora';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

/** PostboxCMS server requirements (PHP modules); pcre is bundled in modern PHP. */
const POSTBOXCMS_PHP_EXTENSIONS = [
  'bcmath',
  'ctype',
  'curl',
  'dom',
  'fileinfo',
  'json',
  'mbstring',
  'openssl',
  'pdo',
  'tokenizer',
  'xml',
];

function run(cmd, options = {}) {
  execSync(cmd, {
    stdio: 'inherit',
    cwd: projectRoot,
    shell: true,
    ...options,
  });
}

function getPhpVersionString() {
  try {
    return execSync('php -r "echo PHP_VERSION;"', {
      encoding: 'utf8',
      cwd: projectRoot,
    }).trim();
  } catch {
    return null;
  }
}

function isPhp8OrNewer(versionString) {
  if (!versionString) return false;
  const major = Number.parseInt(versionString.split('.')[0], 10);
  return !Number.isNaN(major) && major >= 8;
}

function getLoadedPhpExtensions() {
  try {
    const raw = execSync('php -m', {
      encoding: 'utf8',
      cwd: projectRoot,
    });
    return new Set(
      raw
        .split(/\r?\n/)
        .map((line) => line.trim().toLowerCase())
        .filter(Boolean),
    );
  } catch {
    return null;
  }
}

function missingPostboxCMSExtensions(loaded) {
  if (!loaded) return POSTBOXCMS_PHP_EXTENSIONS;
  return POSTBOXCMS_PHP_EXTENSIONS.filter((ext) => !loaded.has(ext));
}

process.chdir(projectRoot);

const phpSpinner = ora('Checking PHP (8+)…').start();
const phpVersion = getPhpVersionString();

if (!phpVersion) {
  phpSpinner.fail('PHP is not installed or not on PATH.');
  console.log(
    '\nInstall PHP 8 or newer, then run this script again.\n',
  );
  console.log(
    'Please proceed with the next steps by installing php and node dependencies now.\n',
  );
  process.exit(1);
}

if (!isPhp8OrNewer(phpVersion)) {
  phpSpinner.fail(`PHP ${phpVersion} is below 8. PostboxCMS requires PHP 8+.`);
  console.log(
    '\nPlease proceed with the next steps by installing php and node dependencies now.\n',
  );
  process.exit(1);
}

phpSpinner.succeed(`PHP ${phpVersion} is available (8+).`);

const extSpinner = ora('Verifying PHP extensions for PostboxCMS…').start();
const loaded = getLoadedPhpExtensions();
const missing = missingPostboxCMSExtensions(loaded);

if (missing.length > 0) {
  extSpinner.warn(
    `Some recommended extensions are missing: ${missing.join(', ')}. Install them via your OS package manager before running the app.`,
  );
} else {
  extSpinner.succeed('Required PHP extensions for PostboxCMS look present.');
}

const composerSpinner = ora('Installing PHP dependencies (composer install)…').start();
try {
  run('composer install --no-interaction --prefer-dist');
  composerSpinner.succeed('Composer dependencies installed.');
} catch {
  composerSpinner.fail('composer install failed. Ensure Composer is installed and on PATH.');
  console.log(
    '\nPlease proceed with Desk installation. "php artisan desk:install"\n',
  );
  process.exit(1);
}

const npmSpinner = ora('Installing Node dependencies (npm install)…').start();
try {
  run('npm install');
  npmSpinner.succeed('Node dependencies installed.');
} catch {
  npmSpinner.fail('npm install failed.');
  console.log(
    '\nPlease proceed with the next steps by installing php and node dependencies now.\n',
  );
  process.exit(1);
}

console.log(
  '\nPlease proceed with the next steps by installing php and node dependencies now.\n',
);

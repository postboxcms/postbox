import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import process from 'node:process';
import chalk from 'chalk';
import ora from 'ora';
import { platform } from 'node:os';

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
    stdio: 'pipe',
    cwd: projectRoot,
    shell: true,
    ...options,
  });
}

function runSilent(cmd, options = {}) {
  return execSync(cmd, {
    encoding: 'utf8',
    cwd: projectRoot,
    shell: true,
    ...options,
  }).trim();
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

function getPhpVersion() {
  try {
    const majorVersion = runSilent('php -r "echo PHP_MAJOR_VERSION;"');
    const minorVersion = runSilent('php -r "echo PHP_MINOR_VERSION;"');
    return `${majorVersion}.${minorVersion}`;
  } catch {
    return null;
  }
}

function installPhpExtensions(extensions) {
  const osType = platform();
  const phpVersion = getPhpVersion();
  
  if (!phpVersion) {
    throw new Error('Could not determine PHP version');
  }

  if (osType === 'linux') {
    // For Linux, use apt-get
    try {
      runSilent('sudo apt-get update');
      const extensionPackages = extensions.map(ext => `php${phpVersion}-${ext}`).join(' ');
      run(`sudo apt-get install -y ${extensionPackages}`);
    } catch (error) {
      throw new Error(`Failed to install PHP extensions on Linux: ${error.message}`);
    }
  } else if (osType === 'darwin') {
    // For macOS, use brew
    try {
      const extensionPackages = extensions.map(ext => `php${phpVersion}-${ext}`).join(' ');
      run(`brew install ${extensionPackages}`);
    } catch (error) {
      throw new Error(`Failed to install PHP extensions on macOS: ${error.message}`);
    }
  } else {
    throw new Error(`Unsupported operating system: ${osType}`);
  }
}

process.chdir(projectRoot);

// Step 1: Setting up composer
console.log(chalk.bold.cyan('\n📋 Running PostboxCMS Setup\n'));
let step1Passed = false;

const composerCheckSpinner = ora('Setting up composer').start();
try {
  const phpVersion = getPhpVersionString();
  
  if (!phpVersion) {
    composerCheckSpinner.fail('PHP is not installed or not on PATH.');
    console.log(chalk.red('\nInstall PHP 8 or newer, then run this script again.\n'));
    process.exit(1);
  }

  if (!isPhp8OrNewer(phpVersion)) {
    composerCheckSpinner.fail(`PHP ${phpVersion} is below 8. PostboxCMS requires PHP 8+.`);
    process.exit(1);
  }

  composerCheckSpinner.succeed(chalk.green('Setting up composer') + chalk.bold('........DONE'));
  step1Passed = true;
} catch (error) {
  composerCheckSpinner.fail(chalk.red('Setting up composer failed.'));
  console.log(chalk.red('\n❌ Setup failed.\n'));
  process.exit(1);
}

// Step 2: Setting up PHP extensions
let step2Passed = false;
const extSpinner = ora('Setting up PHP extensions').start();
try {
  const loaded = getLoadedPhpExtensions();
  const missing = missingPostboxCMSExtensions(loaded);

  if (missing.length > 0) {
    extSpinner.text = chalk.yellow(`Installing missing PHP extensions: ${missing.join(', ')}`);
    installPhpExtensions(missing);
    extSpinner.succeed(chalk.green('Setting up PHP extensions') + chalk.bold('......DONE'));
  } else {
    extSpinner.succeed(chalk.green('Setting up PHP extensions') + chalk.bold('......DONE'));
  }
  step2Passed = true;
} catch (error) {
  extSpinner.fail(chalk.red(`Setting up PHP extensions failed: ${error.message}`));
  console.log(chalk.red('\n❌ Setup failed.\n'));
  process.exit(1);
}

// Step 3: Installing composer dependencies
let step3Passed = false;
const composerInstallSpinner = ora('Installing composer dependencies').start();
try {
  run('composer install --no-interaction --prefer-dist');
  composerInstallSpinner.succeed(chalk.green('Installing composer dependencies') + chalk.bold('.....DONE'));
  step3Passed = true;
} catch (error) {
  composerInstallSpinner.fail(chalk.red('composer install failed.'));
  console.log(chalk.red('\nEnsure Composer is installed and on PATH.\n'));
  console.log(chalk.red('\n❌ Setup failed.\n'));
  process.exit(1);
}

// Step 4: Installing node dependencies
let step4Passed = false;
const npmSpinner = ora('Installing node dependencies').start();
try {
  run('npm install');
  npmSpinner.succeed(chalk.green('Installing node dependencies') + chalk.bold('....DONE'));
  step4Passed = true;
} catch (error) {
  npmSpinner.fail(chalk.red('npm install failed.'));
  console.log(chalk.red('\n❌ Setup failed.\n'));
  process.exit(1);
}

// Final success message
if (step1Passed && step2Passed && step3Passed && step4Passed) {
  console.log(chalk.green.bold('\n✅ Setup completed successfully!\n'));
  console.log(chalk.cyan('Please proceed with the next steps by installing "Desk" now. (php artisan desk:install)\n'));
} else {
  console.log(chalk.red.bold('\n❌ Setup failed.\n'));
  process.exit(1);
}

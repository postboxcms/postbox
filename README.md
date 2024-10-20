## Postbox

### Clone and initialize the repository
* `composer install`
* `npm install`
* `npm run setup:local`
* `sail build --no-cache`
* `sail up -d`
* `sail artisan key:generate` (Optional step)
* `sail artisan migrate`

### Refresh the data
* `sail artisan migrate:refresh`
* `sail artisan db:seed`
* `sail artisan passport:install`

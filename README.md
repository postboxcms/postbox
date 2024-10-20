## Postbox

### Install dependencies
* `composer install`
* `npm install`

### Build application environment
* `npm run setup:local`
* `sail build --no-cache`

### Start the server
* `sail up -d`

### Perform database operations
* `sail artisan migrate`
* `sail artisan passport:install`
* `sail artisan db:seed`

### Generate javascript scaffolding
* `sail npm run dev`

### Optional steps
If the above steps don't work you may perform the steps mentioned below to get the app up and running.
* `sail artisan key:generate`
* `sail artisan storage:link`

### Refresh the data
* `sail artisan migrate:refresh`
* `sail artisan db:seed`
* `sail artisan passport:install`

<p align="center"><img height="39" src="/art/logo-full.svg" alt="Logo PostboxCMS"></p>

### Install dependencies
* `composer install`
* `npm install`

### Install Desk
* `php artisan desk:install`

### Start the server
* `desk up -d`

### Setup the platform
* `desk artisan cms:setup`

### Add user
* `desk artisan cms:adduser`

### Optional steps
If the above steps don't work you may perform the steps mentioned below to get the app up and running.
* `desk artisan key:generate`
* `desk artisan storage:link`

### Refresh the data
* `desk artisan migrate:refresh`
* `desk artisan db:seed`
* `desk artisan passport:install`

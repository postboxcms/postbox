<p align="center"><img height="39" src="/art/logo-full.svg" alt="Logo PostboxCMS"></p>

> PostboxCMS is a simple content management system to build beautiful blogs and websites. Built on top of Laravel framework, powered with React and a customised package developed using Laravel Sail to spin up the CMS easily on your system, PostboxCMS tries to provide an easy to use end to end solution for hobbyists and content creators.

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

<p align="center"><img height="39" src="/art/logo-full.svg" alt="Logo PostboxCMS"></p>

PostboxCMS is a simple content management system to build beautiful blogs and websites. Built on top of Laravel framework, powered with React and a customised package developed using Laravel Sail to spin up the CMS easily on your system, PostboxCMS tries to provide an easy to use end to end solution for hobbyists and content creators.

> Please note, if you are using Windows then you will need to enable and install WSL2 Subsystem for Linux. Once you install WSL2 enable the WSL2 terminal from VSCode. You will need PHP, composer, nodejs installed on WSL2 terminal before you begin with the installation process. Install Docker for desktop and enable WSL2 integration to manage the containers from your system. It's recommended to install git on Windows machine and the code to be cloned onto a directory in Linux.

### Setup PostboxCMS
* `npm install`
* `npm run setup:postbox`

### Install Desk
* `php artisan desk:install`

(As a reference from the official documentation of Laravel Sail,if you wish to configure alias to allow Desk commands more easily, edit `~/.bashrc` and add the following snippet at the end of the file 
`alias desk='sh $([ -f desk ] && echo desk || echo vendor/bin/desk)'`)

### Start the server
* `desk up -d`

### Setup the platform
* `desk artisan cms:setup`

### Add user
* `desk artisan cms:add-user`

### Optional steps
If the above steps don't work you may perform the steps mentioned below to get the app up and running.
* `desk artisan key:generate`
* `desk artisan storage:link`

### Refresh the data
* `desk artisan migrate:refresh`
* `desk artisan db:seed`
* `desk artisan passport:install`

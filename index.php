<?php

error_reporting(0);

// Create a blank .env file
if(!file_exists(getcwd().'/.env')) {
    fopen(getcwd().'/.env','w');
}
// A user-defined error handler function
function boxErrorHandler($errno, $errstr, $errfile, $errline) {
    echo "<div style='text-align:center;font-family:Segoe UI,Arial, sans-serif'><h1>Something went wrong.</h1>";
    echo "<p>Either the application isn't configured correctly or seems to have some technical errors.</p></div>";
    // echo "<p style='color:#fff; background-color:#313131'>".$errstr." in ".$errfile." on ".$errline."</p></div>";
    exit();
}

// Set user-defined error handler function
set_error_handler("boxErrorHandler");

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our application. We just need to utilize it! We'll simply require it
| into the script here so that we don't have to worry about manual
| loading any of our classes later on. It feels great to relax.
|
*/

require __DIR__.'/vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| We need to illuminate PHP development, so let us turn on the lights.
| This bootstraps the framework and gets it ready for use, then it
| will load up this application so that we can run it and send
| the responses back to the browser and delight our users.
|
*/

$app = require_once __DIR__.'/bootstrap/app.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
|
*/

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);

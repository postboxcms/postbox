<?php
    /*
    |--------------------------------------------------------------------------
    | Application Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register all of the routes for an application.
    | It's a breeze. Simply tell Laravel the URIs it should respond to
    | and give it the controller to call when that URI is requested.
    |
    */
    Route::get('/install', 'Installer@checkEnvironmentConfig');    
    Route::get('/install/step/1','Installer@appDetails');
    Route::get('/install/step/2','Installer@dbDetails');
    Route::get('/install/step/3','Installer@verifyDetails');
    Route::get('/install/step/4','Installer@installCore');


    Route::post('/install/update/app','Installer@storeAppDetails');
    Route::post('/install/update/database','Installer@storeDBDetails');
    Route::post('/install/update/environment','Installer@updateEnvironment');
    Route::post('/install/update/storage','Installer@createStorageLink');
    Route::post('/install/run/migrations','Installer@runMigrations');


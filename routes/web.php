<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('react');
});

// admin routes
Route::group(['prefix' => env('MIX_ADMIN_PREFIX','/admin')], function () {
    Route::get('/', function() {
        return view('react');
    });
    Route::get('{action}', function() {
        return view('react');
    });
});

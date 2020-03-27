<?php

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
    $data['pageData'] = [];
    $data['pageData']['meta_description'] = Template::display('description');
    $data['pageData']['meta_keywords'] = Template::display('keywords');
    return view('theme.home', $data);
});

Route::group(['prefix' => config('app.admin_prefix')], function() {
    Route::get('/', function() {
        return redirect(config('app.admin_prefix').'/dashboard');
    });
    Auth::routes();
});

// Route::get('/home', 'HomeController@index')->name('home');


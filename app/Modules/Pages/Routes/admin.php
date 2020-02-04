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

Route::middleware(['auth'])->get('/pages','Pages@listPage');
Route::middleware(['auth'])->get('/pages/trash','Pages@trashPage');
Route::middleware(['auth'])->get('/page/create','Pages@createPage');
Route::middleware(['auth'])->get('/page/edit/{id}','Pages@editPage');
Route::middleware(['auth'])->post('/page/store','Pages@storePage');
Route::middleware(['auth'])->post('/page/update','Pages@updatePage');
Route::middleware(['auth'])->post('/page/delete','Pages@destroyPage');
Route::middleware(['auth'])->post('/page/remove','Pages@removePage');
Route::middleware(['auth'])->post('/page/restore','Pages@restorePage');
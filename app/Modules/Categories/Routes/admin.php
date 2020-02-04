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

Route::middleware(['auth'])->get('/categories','Categories@main');
Route::middleware(['auth'])->get('/category/edit/{id}','Categories@editCategory');
Route::middleware(['auth'])->get('/category/create','Categories@createCategory');
Route::middleware(['auth'])->post('/category/store','Categories@storeCategory');
Route::middleware(['auth'])->post('/category/update','Categories@updateCategory');
Route::middleware(['auth'])->post('/category/delete','Categories@destroyCategory');


// Frontend routes
Route::get('/categories/{slug}','Categories@pageView');
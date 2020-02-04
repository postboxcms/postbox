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

Route::middleware(['auth'])->get('/posts','Posts@listPost');
Route::middleware(['auth'])->get('/posts/trash','Posts@trashPost');
Route::middleware(['auth'])->get('/post/create','Posts@createPost');
Route::middleware(['auth'])->get('/post/edit/{id}','Posts@editPost');
Route::middleware(['auth'])->post('/post/store','Posts@storePost');
Route::middleware(['auth'])->post('/post/update','Posts@updatePost');
Route::middleware(['auth'])->post('/post/delete','Posts@destroyPost');
Route::middleware(['auth'])->post('/post/remove','Posts@removePost');
Route::middleware(['auth'])->post('/post/restore','Posts@restorePost');


// Frontend routes
Route::get('/post/{url}','Posts@pageView');
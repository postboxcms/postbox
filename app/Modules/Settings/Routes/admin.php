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

Route::middleware(['auth'])->get('/settings','Settings@main');
Route::middleware(['auth'])->get('/settings/system','Settings@systemSettings');
Route::middleware(['auth'])->get('/settings/menus/builder','Settings@menuBuilder');
Route::middleware(['auth'])->post('/settings/seo/save','Settings@saveSettings');
Route::middleware(['auth'])->post('/settings/site/save','Settings@saveSettings');
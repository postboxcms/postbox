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

Route::middleware(['auth'])->get('/user',function() {
    return redirect_admin('/user/list');
});
Route::middleware(['auth'])->get('/users',function() {
    return redirect_admin('/user/list');
});

Route::middleware(['auth'])->get('/user/list','User@listUser');
Route::middleware(['auth'])->get('/user/create','User@createUser');
Route::middleware(['auth'])->get('/user/edit/{id}','User@editUser');
Route::middleware(['auth'])->post('/user/store','User@storeUser');
Route::middleware(['auth'])->post('/user/update','User@updateUser');
Route::middleware(['auth'])->post('/user/delete','User@destroyUser');

// Route::middleware(['auth'])->get('/user/profile','User@manageProfile');
// Route::middleware(['auth'])->get('/user/security','User@manageSecurity');

Route::middleware(['auth'])->get('/user/roles','Role@listRole');
Route::middleware(['auth'])->get('/user/role/create','Role@createRole');
Route::middleware(['auth'])->get('/user/role/edit/{id}','Role@editRole');
Route::middleware(['auth'])->post('/user/role/store','Role@storeRole');
Route::middleware(['auth'])->post('/user/role/update','Role@updateRole');
Route::middleware(['auth'])->post('/user/role/delete','Role@destroyRole');

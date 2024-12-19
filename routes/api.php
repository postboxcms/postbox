<?php

use Illuminate\Support\Facades\Route;

use App\Http\Modules\Auth\Controller as OAuth;
use App\Http\Modules\Entity\Controller as Entity;
use App\Http\Modules\CRUD\Controller as CRUD;
use App\Http\Modules\Settings\Controller as Settings;
use App\Http\Modules\Website\Controller as Website;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* authorization routes
* Auth type: OAuth
* Service: Laravel Passport
*/
Route::get('/login', function () {
    return response()->json(['message' => trans('auth.unauthorised', ['app' => env('APP_NAME')])]);
})->name('login');
Route::get('/token', function () {
    return auth()->guard('api')->check();
})->middleware('auth:api');

/* authentication routes
* Auth type: OAuth
* Service: Laravel Passport
*/
Route::post('/login', [OAuth::class, 'login']);
Route::post('/logout', [OAuth::class, 'logout'])->middleware('auth:api');
Route::post('/register', [OAuth::class, 'register']);

// api routes
Route::apiResource('/entity', Entity::class)->middleware('auth:api');
Route::apiResource('/crud', CRUD::class)->middleware('auth:api');
Route::apiResource('/settings', Settings::class)->middleware('auth:api');

// website routes
Route::apiResource('/website', Website::class);
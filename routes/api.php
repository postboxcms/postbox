<?php

use Illuminate\Support\Facades\Route;

use App\Http\Modules\Auth\Controller as OAuth;
use App\Http\Modules\ContentType\Controller as ContentType;
use App\Http\Modules\CRUD\Controller as CRUD;
use App\Http\Modules\Settings\Controller as Settings;

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
Route::get('/Login', function () {
    return response()->json(['message' => trans('auth.unauthorised', ['app' => env('APP_NAME')])]);
})->name('login');
Route::get('/VerifyToken', function () {
    return auth()->guard('api')->check();
})->middleware('auth:api');

/* authentication routes
* Auth type: OAuth
* Service: Laravel Passport
*/
Route::post('/Login', [OAuth::class, 'login']);
Route::post('/Logout', [OAuth::class, 'logout'])->middleware('auth:api');
Route::post('/Register', [OAuth::class, 'register']);

// api routes
Route::apiResource('/ContentType', ContentType::class)->middleware('auth:api');
Route::apiResource('/CRUD', CRUD::class)->middleware('auth:api');
Route::apiResource('/Settings', Settings::class)->middleware('auth:api');
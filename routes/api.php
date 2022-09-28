<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\OAuth;
use App\Http\Controllers\ContentTypeController;
use App\Http\Controllers\CRUDController;

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

// authorization routes
Route::get('/Login',function() {
    return response()->json(['message' => trans('auth.unauthorised',['app'=>env('APP_NAME')])]);
})->name('login');
Route::get('/VerifyToken', function() {
    return auth()->guard('api')->check();
})->middleware('auth:api');

// authentication routes
Route::post('/Login', [OAuth::class,'login']);
Route::post('/Logout', [OAuth::class,'logout'])->middleware('auth:api');
Route::post('/Register', [OAuth::class,'register']);

// api routes
Route::apiResource('/ContentType',ContentTypeController::class)->middleware('auth:api');
Route::apiResource('/CRUD',CRUDController::class)->middleware('auth:api');


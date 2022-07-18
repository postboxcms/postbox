<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\OAuth;
use App\Http\Controllers\ContentTypeController;

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
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');

Route::get('/Login',function() {
    return response()->json(['message' => trans('auth.unauthorised',['app'=>env('APP_NAME')])]);
})->name('login');
Route::get('/VerifyToken', function() {
    return auth()->guard('api')->check();
})->middleware('auth:api');

Route::post('/Login', [OAuth::class,'login']);
Route::post('/Register', [OAuth::class,'register']);

Route::apiResource('/ContentType',ContentTypeController::class)->middleware('auth:api');

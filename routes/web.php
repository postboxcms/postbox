<?php

use Illuminate\Support\Facades\Route;
use App\Http\Modules\Settings\Model as Settings;

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
// Route::get('/', function () {
//     return view('web');
// });

// admin routes
Route::group(['prefix' => env('MIX_ADMIN_PREFIX', '/admin')], function () {
    Route::get('/', function () {
        return view('app');
    });
    Route::get('{module}', function () {
        return view('app');
    });
    Route::get('{module}/{action}', function () {
        return view('app');
    });
});

Route::get('/{any}', function (Settings $db) {
    $response = Http::get(env('VITE_SSR_URL') . ':' . env('VITE_SSR_PORT') . '/server?url=' . request()->getRequestUri());
    $html = $response->body();
    $theme = $db->where('property', 'theme')->value('value');
    return view('web', ['html' => $html, 'theme' => $theme]);
})->where('any', '.*');

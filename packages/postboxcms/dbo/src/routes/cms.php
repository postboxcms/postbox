<?php
/*
* This file is part of the PostboxCMS\DBO package.
* (c) PostboxCMS <sanket@digitalbit.in> 
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
use Illuminate\Support\Facades\Route;
use PostboxCMS\DBO\Http\Controllers\DBOController;

Route::group(attributes: ['prefix'=>'cms', 'middleware' => ['auth:api']], routes: function (): void {
    Route::get(uri: '/dbo/{table}', action: [DBOController::class, 'index']);
    Route::post(uri: '/dbo/{table}', action: [DBOController::class,'store']);
    Route::patch(uri: '/dbo/{table}', action: [DBOController::class,'update']);
    Route::delete(uri: '/dbo/{table}', action: [DBOController::class,'destroy']);
});
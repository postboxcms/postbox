<?php
/*
* This file is part of the PostboxCMS\DBO package.
* (c) PostboxCMS <sanket@digitalbit.in> 
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
use Illuminate\Support\Facades\Route;
use PostboxCMS\DBO\Http\Controllers\DBOController;

Route::group(['prefix'=>'cms', 'middleware' => ['auth:api']], function () {
    Route::get('/dbo', [DBOController::class, 'index']);
    Route::post('/dbo', [DBOController::class,'store']);
    Route::patch('/dbo', [DBOController::class,'update']);
});
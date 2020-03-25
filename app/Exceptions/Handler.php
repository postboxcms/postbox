<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];


    protected $envPath;
    protected $configPath;

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        $fstream = @fopen(base_path('storage/logs/laravel-'.date('Y-m-d').'.log'),'a');
        $this->envPath = base_path('.env');
        $this->configPath = base_path('postbox.config');

        if(!is_resource($fstream)) {
            return redirect('/welcome');
        }

        if(@file_exists($this->envPath) && @file_exists($this->configPath) && (0 == filesize( $this->envPath ))) {
            @file_put_contents($this->envPath,@file_get_contents($this->configPath));
        } else if(!file_exists($this->envPath)) {
            return redirect('/');
        }

        return parent::render($request, $exception);
    }
}

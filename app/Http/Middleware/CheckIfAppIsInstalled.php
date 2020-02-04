<?php

namespace App\Http\Middleware;

use Closure;

class CheckIfAppIsInstalled
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(env('APP_INSTALLED') == false && $request->is('install') == false) {
            if($request->is('install/*') == false) {
                return redirect('welcome');
            } else {
                return $next($request);
            }
        }

        return $next($request);
    }
}

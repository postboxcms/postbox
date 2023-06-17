<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;
use Carbon\Carbon;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // passport routes
        if(!$this->app->routesAreCached()) {
            Passport::cookie(env('APP_TOKEN'));
            Passport::tokensExpireIn(Carbon::now()->addDays(1));
            Passport::refreshTokensExpireIn(Carbon::now()->addDays(10));
        }
    }
}

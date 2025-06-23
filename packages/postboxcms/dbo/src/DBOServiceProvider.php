<?php

namespace PostboxCMS\DBO;

use Illuminate\Support\ServiceProvider;

class DBOServiceProvider extends ServiceProvider
{

    /**
     * Register routes.
     */
    public function registerRoutes(): void
    {
        $this->loadRoutesFrom(__DIR__.'/routes/cms.php');
    }

    /**
     * Register publishing.
     */
    public function registerPublishing(): void
    {
        $this->publishes([
            __DIR__.'/config/dbo.php' => config_path('dbo.php'),
        ], 'dbo-config');
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerRoutes();
        $this->registerPublishing();
    }
}

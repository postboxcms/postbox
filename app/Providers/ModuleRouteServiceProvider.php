<?php

namespace App\Providers;

use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class ModuleRouteServiceProvider extends ServiceProvider
{
     /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Modules';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        // Boot the application    
        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map(Router $router)
    {
        $this->mapWebRoutes($router);

        $this->mapApiRoutes($router);

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes(Router $router)
    {
        $modules = config('module.modules');
        $appRoot = app_path() . '/Modules/';

        if(is_array($modules) && !empty($modules)) {        
            foreach($modules as $module)
            {                
                $namespace = $this->namespace.'\\'.$module.'\\Controllers';
                
                if(file_exists($appRoot . $module .'/Controllers/'.$module.'.php')) {                    
                    $router->group([
                        'namespace' => $namespace, 'middleware' => 'web', 'prefix' => config('app.admin_prefix')
                    ], function ($router) use($module) {
                        require app_path('Modules/'.$module.'/Routes/admin.php');
                    });
                    $router->group([
                        'namespace' => $namespace, 'middleware' => 'web'
                    ], function ($router) use($module) {
                        require app_path('Modules/'.$module.'/Routes/frontend.php');
                    });

                }
            }
        }
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        $modules = config('module.modules');
        $appRoot = app_path() . '/Modules/';

        if(is_array($modules) && !empty($modules)) {        
            foreach($modules as $module)
            {        
                $namespace = $this->namespace.'\\'.$module.'\\Controllers';                
                if(file_exists($appRoot . $module .'/Controllers/'.$module.'.php')) {                 
                    Route::group([
                        'middleware' => 'api',
                        'namespace' => $this->namespace,
                        'prefix' => 'api',
                    ], function ($router) {
                        require base_path('routes/api.php');
                    });   
                }
            }
        }
    }
}

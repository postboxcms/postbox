<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;
use Illuminate\View\FileViewFinder;
use Illuminate\Support\Str;

class ModuleServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //Include routes and views of the modules available
        $modules = config('module.modules');
        // $appRoot = __DIR__ . '/';
        $appRoot = app_path() . '/Modules/';

        if(is_array($modules) && !empty($modules)) {
            foreach($modules as $module) {
                // Load the routes for each of the modules
                if (file_exists($appRoot . $module . '/routes.php')) {
                    include $appRoot . $module . '/routes.php';
                }
    
                // Load the views
                if (is_dir($appRoot . $module . '/Views')) {
                    $this->loadViewsFrom($appRoot . $module . '/Views', $module);
                }
                //Override the blade include directive to use module views alongwith resources/views
                View::addLocation(app_path() . '/Modules/' . $module . '/Views');
            }    
        }

        //Override the blade include directive to use module views alongwith resources/views
        Blade::directive('include', function($viewname) {
        $_viewname = trim($viewname, '\'');
        $_viewname = trim($_viewname, '"');
        if (strpos($_viewname, '.') !== FALSE) {
            $path = explode('.', $_viewname);
            $module = ucfirst($path[0]);
            $_viewname = $path[1];
        }
        if (View::exists($_viewname)) {
            return "<?php echo \$__env->make('$_viewname', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>";
        } else {
            $expression = $this->stripParentheses($viewname);
            return "<?php echo \$__env->make($expression, array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>";
        }
        });
    }

    public function stripParentheses($expression) {
        if (Str::startsWith($expression, '(')) {
          $expression = substr($expression, 1, -1);
        }
    
        return $expression;
    }
    
}

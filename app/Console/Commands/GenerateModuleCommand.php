<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use InvalidArgumentException;
use Illuminate\Console\GeneratorCommand;
use Symfony\Component\Console\Input\InputOption;
use File;

class GenerateModuleCommand extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     * Written by Sanket Raut
     * @var string
     */
    protected $name = 'make:module';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a Postbox module.';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Module';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     parent::__construct();
    // }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    // public function handle()
    // {
    //     // write a function to insert data into database
    // }

    // public function index() {

    // }

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return __DIR__.'/stubs/module.stub';
    }

    /**
     * Get the default namespace for the class.
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\Modules\\'.$this->argument('name').'\\Controllers';
    }

    /* Get the options from the console
     *
     */
    protected function getOptions() {
      return [
          ['name',null, InputOption::VALUE_NONE, 'Generate an HMVC module.']
      ];
    }

    /**
     * Build the class with the given name.
     *
     * Remove the base controller import if we are already in base namespace.
     *
     * @param  string  $name
     * @return string
     */
    protected function buildClass($name)
    {
        $namespace = $this->getNamespace($name);
        $this->generateViews($name);
        $this->generateRoutes($name);
        $replaceStrings = [
            "use {$namespace}\Controllers;\n" => ""
        ];

        return str_replace(array_keys($replaceStrings),array_values($replaceStrings), parent::buildClass($name));
    }

    /* Function to create routes for the  module */
    public function generateRoutes($name)
    {
        $paths = $this->routePath($name);
        $modulename = explode('\\',$name);
        foreach($paths as $path) {
            $this->createDir($path);
            // $routeContents = explode('/',$path);
            // $routeFile = end($routeContents);
            // array_pop($routeContents);
            // $routeFolder = implode('/',$routeContents);

            // if(!is_dir($routeFolder)) {
            //     $this->createDir($routeFolder);
            // }

            if (File::exists($path))
            {
                $this->error("Route {$path} already exists!");
                return;
            }
    
            File::put($path, '<?php
    /*
    |--------------------------------------------------------------------------
    | Application Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register all of the routes for an application.
    | It\'s a breeze. Simply tell Laravel the URIs it should respond to
    | and give it the controller to call when that URI is requested.
    |
    */
    
    Route::get(\'/'.strtolower(end($modulename)).'\',\''.end($modulename).'@main\');');        
    
        }

        // Creating table modules if it does not exists
        $module = preg_split('/(?=[A-Z])/',$this->argument('name'));        
        if(!Schema::connection('mysql')->hasTable('modules')) {
            Schema::connection('mysql')->create('modules', function($table) {
                $table->increments('id');
                $table->string('module_name');                
                $table->string('module_url');
                $table->string('module_icon');                
                $table->timestamps();
            });    
        }

        DB::table('modules')->insert(
            [
                'module_name' => strtolower(implode('_',array_filter($module))),
                'module_url' => '/'.strtolower(implode('_',array_filter($module))),
                'module_icon' => 'fas fa-paper-plane',
                'created_at'=>date('Y-m-d H:i:s'),
                'updated_at'=>date('Y-m-d H:i:s')
            ]
        );
        DB::table('admin_menu_items')->insert(
            [
                'label' => ucfirst(implode('_',array_filter($module))),
                'link' => '/'.strtolower(implode('_',array_filter($module))),
                'parent' => 0,
                'class' => 'fas fa-paper-plane',
                'menu' => 1,
                'depth' => 0,
                'created_at'=>date('Y-m-d H:i:s'),
                'updated_at'=>date('Y-m-d H:i:s')
            ]
        );        
        // $module = preg_split('/(?=[A-Z])/',$this->argument('name'));
        // DB::table('permissions')->insert(
        //     [
        //         'key' => strtolower(implode('_',array_filter($module))),
        //         'table_name'=>'modules',
        //         'created_at'=>date('Y-m-d H:i:s'),
        //         'updated_at'=>date('Y-m-d H:i:s')
        //     ]
        // );
    }

    /**
     * Get the route full path.
     *
     * @param string $route
     *
     * @return string
     */
    public function routePath($route)
    {
        $routeArray = explode('\\',$route);
        $routeName = end($routeArray);
        $routeFolder = 'Routes';
        $routeFiles = ['admin.php','frontend.php'];
        $returnPaths = [];
        foreach($routeFiles as $routeFile) {
            $namespace = str_replace('\\Controllers','',str_replace($routeName,'',$route));

            $path = str_replace("App","app","$namespace\\$routeName\\$routeFolder\\$routeFile");

            $returnPaths[] = str_replace("//","",str_replace('\\','/',$path));    
        }
        // dd($returnPaths);

        return $returnPaths;
    }

     

    /* Handle function for generating default module views
     *
     */
    public function generateViews($name)
    {
        $path = $this->viewPath($name);
        $classList = explode('\\', $name);
        $class = end($classList);

        $this->createDir($path);

        if (File::exists($path))
        {
            $this->error("File {$path} already exists!");
            return;
        }
        $viewContent = File::get(__DIR__.'/stubs/module.view.stub');
        $viewContent = str_replace('$class',$class, $viewContent);

        File::put($path, $viewContent);
    }

    /**
     * Get the view full path.
     *
     * @param string $view
     *
     * @return string
     */
    public function viewPath($view)
    {
        $viewarr = explode('\\',$view);
        $viewname = end($viewarr);
        $viewfile = $viewname. '.blade.php';
        $namespace = str_replace('\\Controllers','',str_replace($viewname,'',$view));

        $path = str_replace("App","app","$namespace\\$viewname\\Views\\$viewfile");

        return str_replace('\\','//',$path);
    }

    /**
     * Create view directory if not exists.
     *
     * @param $path
     */
    public function createDir($path)
    {
        $dir = dirname($path);

        if (!file_exists($dir))
        {
            mkdir($dir, 0777, true);
        }
    }
}

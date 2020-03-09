<?php

namespace App\Modules\Installer\Controllers;

use Illuminate\Encryption\Encrypter;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Modules\Installer\Requests\StoreAppData;
use App\Modules\Installer\Requests\StoreDBData;

use Artisan;

class Installer extends Controller
{
    protected $envPath;
    protected $serverVars;
    protected $currentUrl;
    protected $baseUrl;
    protected $envKey;
    protected $urlSegments;

    /**
     * Constructor initialized.
     */
    public function __construct()
    {
        // Constructor function
        $this->envPath = getcwd().'/.env';
        $this->serverVars = filter_input_array(INPUT_SERVER);
        if(isset($this->serverVars['HTTP_X_FORWARDED_PROTO'])) {
            $this->currentUrl = $this->serverVars['HTTP_X_FORWARDED_PROTO'] . "://" . $this->serverVars['SERVER_NAME'] . $this->serverVars['REQUEST_URI'];
        } else {
            $this->currentUrl = $this->serverVars['REQUEST_SCHEME'] . "://" . $this->serverVars['SERVER_NAME'] . $this->serverVars['REQUEST_URI'];
        }
        $this->baseUrl = substr($this->currentUrl,0,strpos($this->currentUrl,'/install'));
        $this->envKey = 'base64:'.base64_encode(
            Encrypter::generateKey(config('app.cipher'))
        );

        $this->urlSegments = \Request::segments();

        if((env('APP_INSTALLED') == true || rtrim(env('APP_URL'),'/') != rtrim($this->baseUrl,'/')) && end($this->urlSegments) !== 'install') {
            return redirect('/')->send();
        }

    }

    private function _updateEnv($env, $val) {
        if(preg_match('/\\s/',env($env)) || preg_match('/\\s/',$val)) {
            file_put_contents($this->envPath, str_replace(
                $env.'="'.env($env).'"', $env . '=' . '"'.$val.'"', file_get_contents($this->envPath)
            ));
        } else {
            file_put_contents($this->envPath, str_replace(
                $env . '=' . env($env), $env . '=' . $val , file_get_contents($this->envPath)
            ));
        }
        return;
    }

    public function checkEnvironmentConfig()
    {   
        if (file_exists($this->envPath) && env('APP_URL') !== $this->baseUrl) {
            $this->_updateEnv('APP_URL',$this->baseUrl);
            $this->_updateEnv('APP_KEY',$this->envKey);
        }
        return redirect('/install/step/1');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function appDetails()
    {
        //Your code goes here
        $data['app'] = session('appData');
        $data['title'] = 'Installer';
        return view('Installer::AppDetails', $data);
    }

    public function dbDetails()
    {
        //Your code goes here
        $data['db'] = session('dbData');        
        $data['title'] = 'Installer';
        return view('Installer::DatabaseDetails', $data);
    }

    public function verifyDetails() 
    {
        $data['title'] = 'Installer';
        return view('Installer::VerifyDetails', $data);
    }

    public function installCore() 
    {
        $data['title'] = 'Installer';
        return view('Installer::InstallCore', $data);
    }

    public function storeAppDetails(StoreAppData $request) {
        $request->session()->put('appData',$request->all());
        $this->_updateEnv('APP_NAME',$request->title);
        $this->_updateEnv('APP_DESCRIPTION',$request->description!=null?$request->description:env('APP_DESCRIPTION'));
        $this->_updateEnv('APP_TAGS',$request->keywords!=null?$request->keywords:env('APP_TAGS'));
        return response()->json(['message'=>__('installer.app_success')]);
    }

    public function storeDBDetails(StoreDBData $request) {
        $request->session()->put('dbData',$request->all());

        try {            

            config(['database.connections.'. $request->connection .'.host' => $request->host]);
            config(['database.connections.'. $request->connection .'.database' => $request->database]);
            config(['database.connections.'. $request->connection .'.username' => $request->user]);
            config(['database.connections.'. $request->connection .'.password' => $request->password]);
                
            DB::connection($request->connection)->getPdo();
            $this->_updateEnv('DB_CONNECTION',$request->connection!=null?$request->connection:env('DB_CONNECTION'));
            $this->_updateEnv('DB_HOST',$request->host!=null?$request->host:env('DB_HOST'));
            $this->_updateEnv('DB_PORT',$request->port!=null?$request->port:env('DB_PORT'));
            $this->_updateEnv('DB_DATABASE',$request->database!=null?$request->database:env('DB_DATABASE'));
            $this->_updateEnv('DB_USERNAME',$request->user!=null?$request->user:env('DB_USERNAME'));
            $this->_updateEnv('DB_PASSWORD',$request->password!=null?$request->password:env('DB_PASSWORD'));
 
            return response()->json(['message'=>__('installer.db_success')]);

        } catch(\Exception $e) {            

            return response()->json(['message'=>__('installer.db_conn_fail')],422);

        }

    }

    public function runMigrations() {
        try {
            Artisan::call('migrate:refresh', ['--path' => 'database/migrations','--force'=>true]);
            Artisan::call('db:seed', ['--force'=>true]);
            return response()->json(['flag' => 1]);            
        } catch(\Exception $e) {
            return response()->json(['flag' => 0,'message'=>$e->getMessage()]);
        }

    }

    public function updateEnvironment() {
        try {
            $this->_updateEnv('APP_INSTALLED','true');
            return response()->json(['flag' => 1]);
        } catch(\Exception $e) {
            return response()->json(['flag' => 0,'message'=>$e->getMessage()]);
        }

    }

    public function createStorageLink() {
        try {
            Artisan::call('assets:link');
            return response()->json(['flag' => 1]);
        } catch(\Exception $e) {
            return response()->json(['flag' => 0,'message'=>$e->getMessage()]);
        }

    }
}

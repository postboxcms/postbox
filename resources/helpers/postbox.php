<?php
if(!function_exists('admin_menu')) {
    function admin_menu() {
        $_menuCollection = \Harimayco\Menu\Facades\Menu::getByName('Administration Menu');
        $_menuCollection = array_map(function($val) {
            if(count($val['child']) > 0) {
                $val['child'] = array_map(function($val) {
                    $val['link'] = config('app.admin_prefix').$val['link'];
                    return $val; 
                },$val['child']);
            }
            $val['link'] = config('app.admin_prefix').$val['link']; 
            return $val;
        }, $_menuCollection);

        return $_menuCollection;
    }
}

if(!function_exists('redirect_admin')) {
    function redirect_admin($url) {
        return redirect(config('app.admin_prefix').$url);
    }
}

if(!function_exists('assets_path')) {
    function assets_path($dir = '') {
        return base_path(str_replace('/','',str_replace(env('APP_URL'),'',env('ASSET_URL'))).'//'.$dir);
    }
}

if(!function_exists('admin_menu_icon')) {
    function admin_menu_icon($controller = '') {
        if($controller !== '') {
            $_link = $controller;
        } else {
            $_link = '/'.implode('/',\Request::segments());
        }
        $link = DB::table('admin_menu_items')->where('link',$_link)->get('class')->toArray();
        return isset($link[0])?$link[0]->class:'';
    }
}

if(!function_exists('admin_view')) {
    function admin_view($view, $data = []) {
        if(config('app.admin_prefix') == '') {
            $module = DB::table('modules')->where('module_url',"/".Request::segment(1))->get()->toArray();
        } else {
            $module = DB::table('modules')->where('module_url',"/".Request::segment(2))->get()->toArray();
        }
        $data = isset($module[0])?array_merge($data,(array)$module[0]):$data;
        $data['module_icon'] = isset($data['module_icon'])?$data['module_icon']:admin_menu_icon();
        $data['module_name'] = isset($data['module_name'])?ucfirst($data['module_name']):'';
        $data['title'] = isset($data['title'])?$data['title']:$data['module_name'];
        return view($view,$data);
    }
}

if(!function_exists('admin_url')) {
    function admin_url($url) {
        return url(config('app.admin_prefix').$url);
    }
}

if(!function_exists('generate_breadcrumbs')) {
    function generate_breadcrumbs() {
        $_routeData = request()->route()->getAction();
        $_controller = str_replace('App\Modules','',str_replace('Controllers','',$_routeData['namespace']));
          
        $_controllerRoute = strtolower(str_replace('\\','',$_controller));
        $_currRoute = explode('/',url()->current());
        $_methodRoute = end($_currRoute);
 
        $_modData = DB::table('modules')->where('module_url',"/".$_controllerRoute)->get()->toArray();                    
        $_dashData = DB::table('modules')->where('module_url',"/dashboard")->get()->toArray();                            
        $_modData = isset($_modData[0])?$_modData[0]:'';
        $_modIcon = admin_menu_icon('/'.$_controllerRoute);
        $_dashData = isset($_dashData[0])?$_dashData[0]:'';
        $_dashIcon = admin_menu_icon('/dashboard');

        $startSlug = '<a href="'.url(config('app.admin_prefix').'/dashboard').'"><i class="'.(isset($_dashData->module_icon)?$_dashData->module_icon:'').'"></i> Dashboard</a>';
        $controllerSlug = '<a href="'.url(config('app.admin_prefix').'/'.$_controllerRoute).'"><i class="fas '.$_modIcon.'"></i> '.ucfirst($_controllerRoute).'</a>';
 
        $_currURL = (string)url()->current();
 
        $methodSlug = '<a href="'.$_currURL.'">'.ucfirst($_methodRoute).'</a>';
        if($_methodRoute == $_controllerRoute) {
            $endSlug = $controllerSlug;
        } else {
            $endSlug = $controllerSlug .'>'.$methodSlug;
        }
        if($_controllerRoute == 'dashboard') {
            $breadcrumb = $startSlug;
        } else {
            $breadcrumb = $startSlug .' > '. $endSlug;
        }
        return $breadcrumb;
    }
}

if(!function_exists('generate_url')) {
    function generate_url($string) {
        return substr(str_replace(' ','-', strtolower($string)),0,30);
    }
}
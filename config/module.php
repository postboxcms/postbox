<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//  $modulePath = config('constants.modulepath');
$modulePath = app_path() . '/Modules';
if (is_dir($modulePath)) {
    $moduleDir = scandir($modulePath);
    $moduleList = [];
    $controllerList = [];
    $count = 0;
    
    foreach ($moduleDir as $module) {
        if (is_dir($modulePath . '/' . $module) && $count > 1) {
            $moduleList[] = $module;
            if (is_dir(($modulePath . '/' . $module . '/Controllers'))) {
                $controllerDir = scandir($modulePath . '/' . $module . '/Controllers');
                $controllerDirList = array_values(array_diff($controllerDir, array('.', '..')));
                // dd($controllerDir);
                foreach ($controllerDirList as $controller) {
                    $controllerList[$module][] = $controller;
                }
            }
        }
        $count++;
    }
    // shuffle($controllerList);

    // dd($controllerList);
    return array(
        'modules' => $moduleList,
        'controllers' => $controllerList,
    );
}

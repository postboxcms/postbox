<?php

use Illuminate\Database\Seeder;

class ModulesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('modules')->delete();
        
        \DB::table('modules')->insert(array (
            0 => 
            array (
                'id' => 1,
                'module_name' => 'dashboard',
                'module_url' => '/dashboard',
                'module_icon' => 'fas fa-home',
                'created_at' => '2019-11-10 11:46:56',
                'updated_at' => '2019-11-10 11:46:56',
            ),
            1 => 
            array (
                'id' => 2,
                'module_name' => 'categories',
                'module_url' => '/categories',
                'module_icon' => 'fas fa-layer-group',
                'created_at' => '2019-11-10 11:46:56',
                'updated_at' => '2019-11-10 11:46:56',
            ),
            2 => 
            array (
                'id' => 3,
                'module_name' => 'comments',
                'module_url' => '/comments',
                'module_icon' => 'fas fa-comment-alt',
                'created_at' => '2019-11-10 11:46:56',
                'updated_at' => '2019-11-10 11:46:56',
            ),
            3 => 
            array (
                'id' => 4,
                'module_name' => 'pages',
                'module_url' => '/pages',
                'module_icon' => 'fas fa-book',
                'created_at' => '2019-11-10 11:46:56',
                'updated_at' => '2019-11-10 11:46:56',
            ),
            4 => 
            array (
                'id' => 5,
                'module_name' => 'posts',
                'module_url' => '/posts',
                'module_icon' => 'fas fa-envelope',
                'created_at' => '2019-11-10 11:46:56',
                'updated_at' => '2019-11-10 11:46:56',
            ),
            5 => 
            array (
                'id' => 6,
                'module_name' => 'settings',
                'module_url' => '/settings',
                'module_icon' => 'fas fa-tools',
                'created_at' => '2019-11-10 11:46:56',
                'updated_at' => '2019-11-10 11:46:56',
            ),
            6 => 
            array (
                'id' => 7,
                'module_name' => 'users',
                'module_url' => '/users',
                'module_icon' => 'fas fa-users',
                'created_at' => '2019-11-10 11:46:56',
                'updated_at' => '2019-11-10 11:46:56',
            ),
        ));
        
        
    }
}
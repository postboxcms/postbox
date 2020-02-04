<?php

use Illuminate\Database\Seeder;

class AdminMenuItemsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('admin_menu_items')->delete();
        
        \DB::table('admin_menu_items')->insert(array (
            0 => 
            array (
                'id' => 1,
                'label' => 'Dashboard',
                'link' => '/dashboard',
                'parent' => 0,
                'sort' => 0,
                'class' => 'fa-home',
                'menu' => 1,
                'depth' => 0,
                'created_at' => '2019-10-04 05:44:08',
                'updated_at' => '2019-10-04 08:16:34',
            ),
            1 => 
            array (
                'id' => 2,
                'label' => 'Posts',
                'link' => '/posts',
                'parent' => 0,
                'sort' => 1,
                'class' => 'fa-envelope',
                'menu' => 1,
                'depth' => 0,
                'created_at' => '2019-10-04 05:44:29',
                'updated_at' => '2019-10-04 08:16:50',
            ),
            2 => 
            array (
                'id' => 3,
                'label' => 'Pages',
                'link' => '/pages',
                'parent' => 0,
                'sort' => 4,
                'class' => 'fa-book',
                'menu' => 1,
                'depth' => 0,
                'created_at' => '2019-10-04 05:44:44',
                'updated_at' => '2019-10-04 10:09:16',
            ),
            3 => 
            array (
                'id' => 4,
                'label' => 'Settings',
                'link' => '/settings',
                'parent' => 0,
                'sort' => 10,
                'class' => 'fa-tools',
                'menu' => 1,
                'depth' => 0,
                'created_at' => '2019-10-04 05:44:55',
                'updated_at' => '2019-11-14 10:20:28',
            ),
            4 => 
            array (
                'id' => 5,
                'label' => 'Categories',
                'link' => '/categories',
                'parent' => 0,
                'sort' => 13,
                'class' => 'fa-layer-group',
                'menu' => 1,
                'depth' => 0,
                'created_at' => '2019-10-04 05:45:05',
                'updated_at' => '2019-11-14 10:20:28',
            ),
            5 => 
            array (
                'id' => 6,
                'label' => 'Comments',
                'link' => '/comments',
                'parent' => 0,
                'sort' => 14,
                'class' => 'fa-comment-alt',
                'menu' => 1,
                'depth' => 0,
                'created_at' => '2019-10-04 05:45:16',
                'updated_at' => '2019-11-14 10:20:28',
            ),
            6 => 
            array (
                'id' => 7,
                'label' => 'Menu Builder',
                'link' => '/settings/menus/builder',
                'parent' => 4,
                'sort' => 11,
                'class' => 'fa-list-ul',
                'menu' => 1,
                'depth' => 1,
                'created_at' => '2019-10-04 05:47:14',
                'updated_at' => '2019-11-14 10:20:28',
            ),
            7 => 
            array (
                'id' => 9,
                'label' => 'Deleted posts',
                'link' => '/posts/trash',
                'parent' => 2,
                'sort' => 3,
                'class' => 'fa-trash',
                'menu' => 1,
                'depth' => 1,
                'created_at' => '2019-10-04 10:07:07',
                'updated_at' => '2019-10-09 10:33:29',
            ),
            8 => 
            array (
                'id' => 10,
                'label' => 'All posts',
                'link' => '/posts',
                'parent' => 2,
                'sort' => 2,
                'class' => 'fa-envelope',
                'menu' => 1,
                'depth' => 1,
                'created_at' => '2019-10-04 10:08:56',
                'updated_at' => '2019-10-04 10:09:53',
            ),
            9 => 
            array (
                'id' => 11,
                'label' => 'All pages',
                'link' => '/pages',
                'parent' => 3,
                'sort' => 5,
                'class' => 'fa-book',
                'menu' => 1,
                'depth' => 1,
                'created_at' => '2019-10-09 10:07:43',
                'updated_at' => '2019-10-09 10:32:59',
            ),
            10 => 
            array (
                'id' => 12,
                'label' => 'Deleted pages',
                'link' => '/pages/trash',
                'parent' => 3,
                'sort' => 6,
                'class' => 'fa-trash',
                'menu' => 1,
                'depth' => 1,
                'created_at' => '2019-10-09 10:08:02',
                'updated_at' => '2019-10-09 10:33:36',
            ),
            11 => 
            array (
                'id' => 13,
                'label' => 'System Settings',
                'link' => '/settings/system',
                'parent' => 4,
                'sort' => 12,
                'class' => 'fa-tools',
                'menu' => 1,
                'depth' => 1,
                'created_at' => '2019-10-11 07:16:46',
                'updated_at' => '2019-11-14 10:20:28',
            ),
            12 => 
            array (
                'id' => 14,
                'label' => 'User Management',
                'link' => '/user',
                'parent' => 0,
                'sort' => 7,
                'class' => 'fa-user',
                'menu' => 1,
                'depth' => 0,
                'created_at' => '2019-11-10 06:19:07',
                'updated_at' => '2019-11-10 06:19:29',
            ),
            13 => 
            array (
                'id' => 15,
                'label' => 'User List',
                'link' => '/user/list',
                'parent' => 14,
                'sort' => 8,
                'class' => 'fa-users',
                'menu' => 1,
                'depth' => 1,
                'created_at' => '2019-11-10 06:19:48',
                'updated_at' => '2019-11-10 06:20:08',
            ),
            14 => 
            array (
                'id' => 17,
                'label' => 'User Roles',
                'link' => '/user/roles',
                'parent' => 14,
                'sort' => 9,
                'class' => 'fas fa-user-lock',
                'menu' => 1,
                'depth' => 1,
                'created_at' => '2019-11-10 06:21:57',
                'updated_at' => '2019-11-14 10:20:25',
            ),
        ));
        
        
    }
}
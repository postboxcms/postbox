<?php

use Illuminate\Database\Seeder;

class AdminMenusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('admin_menus')->delete();
        
        \DB::table('admin_menus')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Administration Menu',
                'created_at' => '2019-10-04 05:43:40',
                'updated_at' => '2019-10-04 10:06:27',
            ),
        ));
        
        
    }
}
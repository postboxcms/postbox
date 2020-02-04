<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('roles')->delete();
        
        \DB::table('roles')->insert(array (
            0 => 
            array (
                'id' => 1,
                'rolename' => 'admin',
                'created_at' => '2019-11-13 20:02:09',
                'updated_at' => '2019-11-13 20:02:55',
            ),
        ));
        
        
    }
}
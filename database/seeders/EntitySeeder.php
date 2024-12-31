<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EntitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // content types post, pages added
        DB::table('entities')->insert([
            'name' => 'Posts',
            'description' => 'Blog posts',
            'slug' => 'posts',
            'type' => 1,
            'icon' => 'message',
            'status' => 1,
        ]);
        DB::table('entities')->insert([
            'name' => 'Pages',
            'description' => 'Website pages',
            'slug' => 'pages',
            'type' => 1,
            'icon' => 'file-lines',
            'status' => 1,
        ]);
        DB::table('entities')->insert([
            'name' => 'Users',
            'description' => 'Website users',
            'slug' => 'users',
            'type' => 1,
            'icon' => 'user-group',
            'status' => 1,
        ]);
    }
}

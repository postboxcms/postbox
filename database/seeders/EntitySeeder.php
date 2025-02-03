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
            'model' => 'Post',
            'type' => 1,
            'icon' => 'fa-message',
            'status' => 1,
            'dashboard' => 1,
        ]);
        DB::table('entities')->insert([
            'name' => 'Pages',
            'description' => 'Website pages',
            'slug' => 'pages',
            'model' => 'Page',
            'type' => 1,
            'icon' => 'fa-file-lines',
            'status' => 1,
            'dashboard' => 1,
        ]);
        DB::table('entities')->insert([
            'name' => 'Users',
            'description' => 'Website users',
            'slug' => 'users',
            'model' => 'User',
            'type' => 1,
            'icon' => 'fa-user-group',
            'status' => 1,
            'dashboard' => 1,
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // content types post, pages added
        DB::table('content_types')->insert([
            'name' => 'Posts',
            'description' => 'Blog posts',
            'slug' => 'posts',
            'type' => 1,
            'icon' => 'LocalPostOfficeIcon',
            'status' => 1,
        ]);
        DB::table('content_types')->insert([
            'name' => 'Pages',
            'description' => 'Website pages',
            'slug' => 'pages',
            'type' => 1,
            'icon' => 'ArticleIcon',
            'status' => 1,
        ]);
        DB::table('content_types')->insert([
            'name' => 'Users',
            'description' => 'Website users',
            'slug' => 'users',
            'type' => 1,
            'icon' => 'PeopleIcon',
            'status' => 1,
        ]);
    }
}

<?php

namespace App\Components;

use Illuminate\Support\Facades\DB;

class Widget 
{
    protected $type;
    protected $data;
    protected static $renderData;

    public function __construct(String $type = '', Array $data = []) {
        $this->type = $type;
        $this->data = $data;
    }

    public static function render(String $table) {
        self::$renderData[$table] = (new self)->$table();
        return view(config('app.theme_directory').'.widgets.'.$table, self::$renderData);
    }

    public static function menu(String $table) {
        self::$renderData[$table] = (new self)->$table();
        return view(config('app.theme_directory').'.widgets.'.$table.'_menu', self::$renderData);
    }

    private function logo() {
        return DB::table('settings')->whereNotNull('value')->where('parameter','site.image_full')->orWhere('parameter','site.image')->orWhere('parameter','site.name')->orderBy('parameter','desc')->first();
    }

    private function posts() {
        return DB::table('posts')->where('status',2)->get();
    }

    private function pages() {
        return DB::table('pages')->where('status',2)->get();
    }

    private function categories() {
        return DB::table('categories')->get();
    }
}
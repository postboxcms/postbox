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
        if(view()->exists(config('app.theme_directory').'.widgets.'.$table)) {
            return view(config('app.theme_directory').'.widgets.'.$table, self::$renderData);
        } else {
            return self::$renderData[$table];
        }

    }

    public static function menu(String $table) {
        self::$renderData[$table] = (new self)->$table();
        return view(config('app.theme_directory').'.widgets.'.$table.'_menu', self::$renderData);
    }

    private function logo() {
        $image = DB::table('settings')->where('parameter','site.image')->whereNotNull('value')->first();
        if(isset($image->value) && $image->value != NULL) {
            return $image;
        } else {
            return DB::table('settings')->where('parameter','site.name')->whereNotNull('value')->first();
        }
    }

    private function posts() {
        return DB::table('posts')->where('status',2)->orderBy('id','desc')->get();
    }

    private function pages() {
        return DB::table('pages')->where('status',2)->get();
    }

    private function categories() {
        $data['uncategorizedPosts'] = DB::table('posts')->whereNull('category')->where('status',2)->count();
        $data['categoryList'] = array_map(function($val) {
            $val->posts = DB::table('posts')->where('category',$val->id)->count();
            return $val;
        },DB::table('categories')->get()->toArray());
        return $data;
    }

    private function copyright() {
        return;
    }
}
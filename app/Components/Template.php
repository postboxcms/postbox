<?php

namespace App\Components;

use Illuminate\Support\Facades\DB;

class Template 
{
    protected $type;
    protected $data;
    protected static $renderData;

    public function __construct(String $type = '', Array $data = []) {
        $this->type = $type;
        $this->data = $data;
    }

    public static function display(String $table) {
        self::$renderData[$table] = (new self)->$table();
        return self::$renderData[$table];
    }

    private function title() {
        $title = DB::table('settings')->where('parameter','site.name')->whereNotNull('value')->first();
        if(isset($title->value) && $title->value != NULL) {
            return $title->value;
        } else {
            return config('app.name','Postbox');
        }
    }

    private function description() {
        $description = DB::table('settings')->where('parameter','site.description')->whereNotNull('value')->first();
        if(isset($description->value) && $description->value != NULL) {
            return $description->value;
        } else {
            return env('APP_DESCRIPTION','Postbox CMS');
        }
    }

    private function keywords() {
        $keywords = DB::table('settings')->where('parameter','site.keywords')->whereNotNull('value')->first();
        if(isset($keywords->value) && $keywords->value != NULL) {
            return $keywords->value;
        } else {
            return env('APP_TAGS','Postbox CMS');
        }
    }
}
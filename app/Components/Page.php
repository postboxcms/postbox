<?php

namespace App\Components;

use Illuminate\Support\Facades\DB;

class Page 
{
    protected $type;
    protected $data;
    protected static $renderData;

    public function __construct(String $type = '', Array $data = []) {
        $this->type = $type;
        $this->data = $data;
    }

    private function fetchData(String $table) {
        // fetch database details from models and return arrays
        return $this->data = DB::table($table)->get();
    }

    public static function render(String $table, Array $data = []) {
        // self::$renderData[$table] = (new self)->fetchData($table);
        return view(config('app.theme_directory').'.pages.'.$table, $data);
    }
}
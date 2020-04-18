<?php

namespace App\Components;

use Illuminate\Support\Facades\DB;

class Template 
{
    protected $type;
    protected $data;
    protected $segments;
    protected $seperator = '-';
    protected static $renderData;

    public function __construct(String $type = '', Array $data = []) {
        $this->type = $type;
        $this->data = $data;
        $this->segments = request()->segments();
    }

    public static function display(String $table) {
        self::$renderData[$table] = (new self)->$table();
        return self::$renderData[$table];
    }

    private function title() {
        $segments = $this->segments;
        $sitename = DB::table('settings')->where('parameter','site.name')->whereNotNull('value')->first();        
        if(count($segments) > 0) {
            switch($segments[0]) {
                case 'post': 
                    $title = DB::table('posts')->where('url',$segments[1])->first();
                    break;
                case 'page':
                    $title = DB::table('pages')->where('url',$segments[1])->first();
                    break;
                default:
                    $title = $sitename;
            }    
        } else {
            $title = $sitename;
        }


        if(isset($title->value) && $title->value != NULL) {
            return $title->value;
        } else if(isset($title->title) && $title->title != NULL) {
            return $title->title;
        } else {
            return config('app.name','Postbox');
        }
    }

    private function description() {
        $segments = $this->segments;
        if(count($segments) > 0) {
            switch($segments[0]) {
                case 'post': 
                    $description = DB::table('posts')->where('url',$segments[1])->first();
                    break;
                case 'page':
                    $description = DB::table('pages')->where('url',$segments[1])->first();
                    break;
                default:
                    $description = DB::table('settings')->where('parameter','site.description')->whereNotNull('value')->first();       
            }    
        } else {
            $description = DB::table('settings')->where('parameter','site.description')->whereNotNull('value')->first();                   
        }

        if(isset($description->value) && $description->value != NULL) {
            return $description->value;
        } else if(isset($description->meta_description) && $description->meta_description != NULL) {
            return $description->meta_description;
        } else {
            return env('APP_DESCRIPTION','Postbox CMS');
        }
    }

    private function keywords() {
        $segments = $this->segments;
        if(count($segments) > 0) {
            switch($segments[0]) {
                case 'post': 
                    $keywords = DB::table('posts')->where('url',$segments[1])->first();
                    break;
                case 'page':
                    $keywords = DB::table('pages')->where('url',$segments[1])->first();
                    break;
                default:
                    $keywords = DB::table('settings')->where('parameter','site.keywords')->whereNotNull('value')->first();
            }    
        } else {
            $keywords = DB::table('settings')->where('parameter','site.keywords')->whereNotNull('value')->first();
        }

        if(isset($keywords->value) && $keywords->value != NULL) {
            return $keywords->value;
        } elseif(isset($keywords->meta_keywords) && $keywords->meta_keywords != NULL) {            
            return $keywords->meta_keywords;
        } else {
            return env('APP_TAGS','Postbox CMS');
        }
    }
}
<?php

namespace App\Components;

use Illuminate\Support\Facades\DB;

class SEO 
{
    protected static $renderData;
    protected $segments;

    public function __construct() {
        $this->segments = request()->segments();
    }

    public static function twitter(String $property) {
        self::$renderData[$property] = (new self)->$property('twitter');
        return self::$renderData[$property];
    }

    public static function facebook(String $property) {
        self::$renderData[$property] = (new self)->$property('facebook');
        return self::$renderData[$property];
    }

    private function title($tag) {
        $segments = $this->segments;
        if(count($segments) > 0) {
            switch($segments[0]) {
                case 'post': 
                    $property = DB::table('posts')->where('url',$segments[1])->first();
                    break;
                case 'page':
                    $property = DB::table('pages')->where('url',$segments[1])->first();
                    break;
                default:
                    $property = DB::table('settings')->where('parameter','seo.'.$tag.'_title')->whereNotNull('value')->first();
            }    
        } else {
            $property = DB::table('settings')->where('parameter','seo.'.$tag.'_title')->whereNotNull('value')->first();
        }

        if(isset($property->value) && $property->value != NULL) {
            return $property->value;
        } else if(isset($property->title) && $property->title != NULL) {
            return $property->title;
        } else {
            return config('app.name','Postbox');
        }
    }

    private function description($tag) {
        $segments = $this->segments;
        if(count($segments) > 0) {
            switch($segments[0]) {
                case 'post': 
                    $property = DB::table('posts')->where('url',$segments[1])->first();
                    break;
                case 'page':
                    $property = DB::table('pages')->where('url',$segments[1])->first();
                    break;
                default:
                    $property = DB::table('settings')->where('parameter','seo.'.$tag.'_description')->whereNotNull('value')->first();
            }    
        } else {
            $property = DB::table('settings')->where('parameter','seo.'.$tag.'_description')->whereNotNull('value')->first();
        }

        if(isset($property->value) && $property->value != NULL) {
            return $property->value;
        } else if(isset($property->summary) && $property->summary != NULL) {
            return $property->summary;
        } else {
            return env('APP_DESCRIPTION','Postbox CMS');
        }
    }

    private function image($tag) {
        $segments = $this->segments;
        if(count($segments) > 0) {
            switch($segments[0]) {
                case 'post': 
                    $section = 'posts';
                    $property = DB::table('posts')->where('url',$segments[1])->first();
                    break;
                case 'page':
                    $section = 'pages';
                    $property = DB::table('pages')->where('url',$segments[1])->first();
                    break;
                default:
                    $property = DB::table('settings')->where('parameter','seo.'.$tag.'_image')->whereNotNull('value')->first();
            }    
        } else {
            $property = DB::table('settings')->where('parameter','seo.'.$tag.'_image')->whereNotNull('value')->first();
        }

        if(isset($property->value) && $property->value != NULL) {
            return asset('storage/settings/'.$property->value);
        } else if(isset($property->image) && $property->image != NULL) {
            return asset('storage/'.$section.'/'.$property->image);
        } else {
            return;
        }
    }

    private function site($tag) {
        $property = DB::table('settings')->where('parameter','seo.'.$tag.'_site')->whereNotNull('value')->first();
        if(isset($property->value) && $property->value != NULL) {
            return $property->value;
        } else {
            return;
        }
    }

    private function url() {
        return url('/');
    }

}
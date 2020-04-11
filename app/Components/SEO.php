<?php

namespace App\Components;

use Illuminate\Support\Facades\DB;

class SEO 
{
    protected static $renderData;

    public function __construct() {

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
        $property = DB::table('settings')->where('parameter','seo.'.$tag.'_title')->whereNotNull('value')->first();
        if(isset($property->value) && $property->value != NULL) {
            return $property->value;
        } else {
            return config('app.name','Postbox');
        }
    }

    private function description($tag) {
        $property = DB::table('settings')->where('parameter','seo.'.$tag.'_description')->whereNotNull('value')->first();
        if(isset($property->value) && $property->value != NULL) {
            return $property->value;
        } else {
            return env('APP_DESCRIPTION','Postbox CMS');
        }
    }

    private function image($tag) {
        $property = DB::table('settings')->where('parameter','seo.'.$tag.'_image')->whereNotNull('value')->first();
        if(isset($property->value) && $property->value != NULL) {
            return asset('storage/settings/'.$property->value);
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

}
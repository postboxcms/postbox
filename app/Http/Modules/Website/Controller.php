<?php

namespace App\Http\Modules\Website;

use App\Http\Modules\Framework;
use App\Http\Modules\Settings\Model as Settings;
use Illuminate\Http\Request;

class Controller extends Framework
{
    protected $data;
    protected $settings;


    public function index()
    {
        // display settings
        $this->settings = Settings::all();
        return response([
            'data' => $this->settings,
            'message' => 'settings data loaded successfully'
        ]);
    }
}

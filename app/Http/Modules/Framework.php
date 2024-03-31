<?php

namespace App\Http\Modules;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Framework extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}

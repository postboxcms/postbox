<?php

namespace App\Http\Modules\Settings;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as BaseModel;

class Model extends BaseModel
{
    use HasFactory;

    protected $table = 'settings';
    protected $fillable = ['property', 'value'];
}

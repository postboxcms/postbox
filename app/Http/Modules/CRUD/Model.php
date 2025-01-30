<?php

namespace App\Http\Modules\CRUD;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as BaseModel;

class Model extends BaseModel
{
    use HasFactory;

    protected $table = 'crud';

    protected $fillable = ['table','field','alias','type','list','position'];
}

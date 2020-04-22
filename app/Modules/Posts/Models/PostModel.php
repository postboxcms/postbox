<?php

namespace App\Modules\Posts\Models;

use Illuminate\Database\Eloquent\Model;

class PostModel extends Model
{
    // table for posts
    protected $table = 'posts';

    public function authorId() {
        return $this->belongsTo('App\User','author');
    }
}

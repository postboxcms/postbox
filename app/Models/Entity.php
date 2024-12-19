<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entity extends Model
{
    use HasFactory;

    protected $fillable = ['name','description','icon','slug'];

    protected $table = 'entities';

    public function getRouteKeyName() {
        return 'slug';
    }

    public function getTableColumns($table) {
        return array_column($this->getConnection()->select(
            (new \Illuminate\Database\Schema\Grammars\MySqlGrammar)->compileColumnListing()
                .' order by ordinal_position',
            [$this->getConnection()->getDatabaseName(), $table]
        ),'column_name');
    }
}

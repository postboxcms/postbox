<?php

namespace App\Http\Modules\Entity;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as BaseModel;

class Model extends BaseModel
{
    use HasFactory;

    protected $fillable = ['name','description','icon','slug','model'];

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

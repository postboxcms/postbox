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
        return $this->getConnection()->getSchemaBuilder()->getColumnListing($table);
    }

    public function getTableIcon($table) {
        $icon = $this->getConnection()->select(
            'SELECT icon FROM entities WHERE slug = ?',
            [$table]
        );
        return !empty($icon) ? $icon[0]->icon : '';
    }
}

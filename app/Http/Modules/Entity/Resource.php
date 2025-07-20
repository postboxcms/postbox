<?php

namespace App\Http\Modules\Entity;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Modules\CRUD\Model as CRUD;

class Resource extends JsonResource
{
    private $collection;
    private $model;

    /**
     * Transform the resource into route collection
     * 
     * @param  \Illuminate\Database\Eloquent\Collection  $collection
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function routes($collection)
    {
        return $collection->map(function ($item) {
            return [
                $item['slug'] => [
                    'title' => $item['name'],
                    'entity' => $item['slug'],
                    'name' => $item['slug'],
                ]
            ];
        });
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $this->collection = parent::toArray($request);
        $this->model = 'App\\Models\\' . $this->collection['model'];
        if (class_exists($this->model)) {
            $this->collection['icon'] = $this->collection['icon'] !== null ? $this->collection['icon'] : 'fa-square';
            $this->collection['records'] = $this->model::count();

            if (isset($request->entity)) {
                if(isset($request->eid)) {
                    $this->collection['data'] = $this->model::where('uuid', $request->eid)->get();
                } else {
                    $this->collection['data'] = $this->model::all();
                }
                // $this->collection['data'] = $this->model::all();
                $this->collection['data'] = collect($this->collection['data']->toArray())->map(function ($data) {
                    foreach ($data as $field => $parameter) {
                        $data[$field] = [
                            'type' => CRUD::where('table', $this->collection['slug'])
                                ->where('field', $field)->value('type'),
                            'value' => $data[$field]
                        ];
                        if ($data[$field]['type'] == 'user') {
                            $data[$field]['value'] = is_integer($data[$field]['value']) ? \App\Models\User::where('id', $data[$field]['value'])->value('name') : $data[$field]['value'];
                        }
                        if ($data[$field]['type'] == 'timestamp') {
                            $data[$field]['value'] = $data[$field]['value'] !== null ? (new \Carbon\Carbon($data[$field]['value']))->diffForHumans() : null;
                        }
                    }
                    return $data;
                });
            }
        } else {
            return [];
        }
        return $this->collection;
    }
}

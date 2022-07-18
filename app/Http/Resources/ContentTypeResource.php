<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContentTypeResource extends JsonResource
{
    private $collection;
    private $model;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $this->collection = parent::toArray($request);
        $this->model = config('postbox.database.models')[$this->collection['slug']];
        $this->collection['records'] = $this->model::count();
        return $this->collection;
    }
}

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
        $this->collection['data'] = $this->model::all();
        $this->collection['data'] = collect($this->collection['data']->toArray())->map(function($data) {
            if(isset($data['author'])) {
                $data['author'] = \App\Models\User::where('id',$data['author'])->value('name');
            }
            if(isset($data['created_at'])) {
                $data['created_at'] = (new \Carbon\Carbon($data['created_at']))->diffForHumans();
            }
            if(isset($data['updated_at'])) {
                $data['updated_at'] = (new \Carbon\Carbon($data['updated_at']))->diffForHumans();
            }
            return $data;
        });
        return $this->collection;
    }
}

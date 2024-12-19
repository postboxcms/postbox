<?php

namespace App\Http\Modules\Entity;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Modules\Framework;

use App\Http\Resources\Entity as ContentTypeResource;
use App\Models\Entity as Entity;

class Controller extends Framework
{
    protected $data;
    protected $tableFields;
    protected $entity;
    protected $contentTypes;
    protected $validator;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // show all content types
        $this->contentTypes = Entity::where('status',1)->get();
        return response([
            'content_types' => ContentTypeResource::collection($this->contentTypes),
            'message'       => trans('content_type.success')
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Entity $entity, Request $request)
    {
        // store a content type
        $this->data = $request->all();
        $this->validator = Validator::make($this->data, [
            'name'          => 'required|max:50',
            'description'   => 'max:191',
            'icon'          => 'required'
        ]);

        if($this->validator->fails()) {
            return response(['message' => $this->validator->errors(),trans('content_types.validationerror')]);
        }

        $this->entity = Entity::create($this->data);
        return response([
            'content_type'  => new ContentTypeResource($this->entity),
            'message'       => trans('content_type.success')
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Entity  $entity
     * @return \Illuminate\Http\Response
     */
    public function show(Entity $entity)
    {
        // show content type info
        return response([
            'content_type'  => new ContentTypeResource($entity),
            'message'       => trans('content_type.success')
        ],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Entity  $entity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Entity $entity)
    {
        // update content type info
        $entity->update($request->all());

        return response([
            'content_type'  => new ContentTypeResource($entity),
            'message'       => trans('content_type.success')
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Entity  $entity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Entity $entity)
    {
        // destroy a content type
        $entity->delete();

        return response(['message' => trans('content_type.delete')],200);
    }
}

<?php

namespace App\Http\Modules\Entity;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

use App\Http\Modules\Framework;

use App\Http\Resources\Entity as EntityResource;
use App\Models\Entity as Entity;

class Controller extends Framework
{
    protected $data;
    protected $table;
    protected $tableFields;
    protected $entity;
    protected $entities;
    protected $validator;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // show all content types
        $this->entities = Entity::where('status', 1)->get();
        return response([
            'entities' => EntityResource::collection($this->entities),
            'message' => trans('entity.success')
        ], 200);
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
        $this->table = $this->data['name'];
        if (Schema::hasTable($this->data['name'])) {
            try {
                unset($this->data['name']);
                DB::table($this->table)->insert($this->data);
                return response(['message' => trans('entity.entitysuccess', ['name' => $this->table])]);
            } catch (\Exception $e) {
                return response(['error' => trans('entity.entityexception') . ': ' . $e->getMessage()]);
            }
        }
        $this->validator = Validator::make($this->data, [
            'name' => 'required|max:50',
            'description' => 'max:191',
            'icon' => 'required'
        ]);

        if ($this->validator->fails()) {
            return response(['message' => $this->validator->errors(), trans('entity.validationerror')]);
        }

        $this->entity = Entity::create($this->data);
        return response([
            'entity' => new EntityResource($this->entity),
            'message' => trans('entity.success')
        ], 200);
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
            'entity' => new EntityResource($entity),
            'message' => trans('entity.success')
        ], 200);
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
            'entity' => new EntityResource($entity),
            'message' => trans('entity.success')
        ], 200);
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

        return response(['message' => trans('entity.delete')], 200);
    }
}

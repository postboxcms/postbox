<?php

namespace App\Http\Modules\Entity;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Schema;
use App\Http\Modules\Framework;

use App\Http\Modules\Entity\Resource as EntityResource;
use App\Http\Modules\Entity\Model as Entity;

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
            'routes'=> EntityResource::routes($this->entities),
            'message' => trans('entity.fetched')
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // store a content type
        try {
            $this->data = $request->all();
            $this->table = $this->data['module'];
            if (Schema::hasTable($this->data['module'])) {
                try {
                    $this->performDBOperations($this->table, 'insert', $this->data);
                    return response(['message' => trans('entity.added', ['name' => $this->table])], 200);
                } catch (\Exception $e) {
                    return response(['error' => trans('entity.exception', ['message' => $e->getMessage()])], 400);
                }
            }
            return response(['error' => trans('entity.validationerror')], 400);

            // $this->validator = Validator::make($this->data, [
            //     'name' => 'required|max:50',
            //     'description' => 'max:191',
            //     'icon' => 'required'
            // ]);

            // if ($this->validator->fails()) {
            //     return response(['message' => $this->validator->errors(), trans('entity.validationerror')]);
            // }

            // $this->entity = Entity::create($this->data);
            // return response([
            //     'entity' => new EntityResource($this->entity),
            //     'message' => trans('entity.success')
            // ], 200);
        } catch (\Exception $e) {
            return response(['error' => trans('entity.exception', ['message' => $e->getMessage()])], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Http\Modules\Entity\Model  $entity
     * @return \Illuminate\Http\Response
     */
    public function show(Entity $entity)
    {
        // show content type info
        return response([
            'entity' => new EntityResource($entity),
            'message' => trans('entity.fetched')
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Modules\Entity\Model  $entity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Entity $entity)
    {
        // update content type info
        try {
            $this->data = $request->all();
            $this->table = $this->data['module'];

            $this->performDBOperations($this->table, 'update', $this->data);
            return response([
                // 'entity' => new EntityResource($entity),
                'message' => trans('entity.success')
            ], 200);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Modules\Entity\Model  $entity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Entity $entity)
    {
        // destroy a content type
        try {
            $this->data = $request->all();
            $this->table = $this->data['module'];

            $this->performDBOperations($this->table, 'delete', $this->data);
            return response([
                // 'entity' => new EntityResource($entity),
                'message' => trans('entity.delete')
            ], 200);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage()
            ], 400);
        }
    }
}

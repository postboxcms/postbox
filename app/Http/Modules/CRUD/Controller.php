<?php

namespace App\Http\Modules\CRUD;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Modules\Framework;
use App\Http\Modules\Entity\Resource as EntityResource;

use App\Http\Modules\Entity\Model as Entity;
use App\Http\Modules\CRUD\Model as CRUD;

class Controller extends Framework
{
    protected $entity;
    protected $entityCollection;
    protected $fields;
    protected $columns;
    protected $data;
    protected $table;
    protected $model;
    protected $missingFields;
    protected $crud;
    protected $counter = 1;
    protected $validator;


    private function _getField($name, $column, $default)
    {
        $dbRow = CRUD::where('table', \Request::segment(count(\Request::segments())))
            ->where('field', $name)->first();
        return !empty($dbRow) ? $dbRow->{$column} : $default;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // display content type tables
        $this->entityCollection = Entity::where('status', 1)->get();
        return response([
            'entities' => EntityResource::collection($this->entityCollection),
            'message' => trans('app.success')
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
        // store CRUD data
        $this->data = $request->all();
        $this->validator = Validator::make($this->data, [
            'alias' => 'required|max:20'
        ]);

        if ($this->validator->fails()) {
            return response(['message' => $this->validator->errors(), trans('crud.validationerror')]);
        }

        $this->crud = CRUD::updateOrCreate([
            'field' => $this->data['field'],
            'table' => $this->data['table']
        ], $this->data);

        return response([
            'message' => trans('crud.success')
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show(Entity $Entity)
    {
        // display CRUD fields
        $this->model = strtolower(Entity::where('slug',\Request::segment(count(\Request::segments())))->first()->model);
        $this->model = "\\App\\Models\\" .ucfirst($this->model);
        $this->model = new $this->model();
        
        $this->table = $this->model->getTable();
        $this->fields = $Entity->getTableColumns($this->table);
        $this->fields = collect($this->fields)->map(function ($field) {
            $this->counter += 1;
            return [
                'id' => $this->counter,
                'table' => $this->table,
                'field' => $field,
                'alias' => $this->_getField($field, 'alias', strtoupper($field)),
                'type'  => $this->_getField($field, 'type', 'text'),
                'position' => $this->_getField($field, 'position', 'none'),
                'list'    => $this->_getField($field, 'list', true),
                'actions' => null
            ];
        });
        $this->data = CRUD::where('table', \Request::segment(count(\Request::segments())))->get()->toArray();

        $this->columns = collect($this->fields)->map(function ($field) {
            $hiddenFields = CRUD::where('table', \Request::segment(count(\Request::segments())))
                ->where('field', $field['field'])
                ->where('list', 0)->get()->pluck('field');

            if (!$hiddenFields->contains($field['field'])) {
                return [
                    'field' => $field['field'],
                    'headerClassName' => 'table-header-light',
                    'headerName' => str_replace('_', ' ', $field['alias']),
                    'flex' => 1
                ];
            }
        })->filter()->values();

        return response([
            'fields' => $this->fields,
            'columns' => $this->columns
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\ContentType;
use App\Models\CRUD;
use App\Http\Resources\ContentTypeResource;

class CRUDController extends Controller
{
    protected $contentType;
    protected $fields;
    protected $columns;
    protected $data;
    protected $table;
    protected $missingFields;
    protected $crud;
    protected $counter = 1;
    protected $validator;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // display content type tables
        $this->contentTypes = ContentType::where('status',1)->get();
        return response([
            'content_types' => ContentTypeResource::collection($this->contentTypes),
            'message'       => trans('app.success')
        ],200);
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
            'alias'          => 'required|max:20'
        ]);

        if($this->validator->fails()) {
            return response(['message' => $this->validator->errors(),trans('crud.validationerror')]);
        }

        $this->crud = CRUD::updateOrCreate([
            'field' => $this->data['field'],
            'table' => $this->data['table']
        ],$this->data);

        return response([
            'message' => trans('app.success')
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ContentType $ContentType)
    {
        // display CRUD fields
        $this->table = \Request::segment(count(\Request::segments()));
        $this->fields = $ContentType->getTableColumns($this->table);
        $this->fields = collect($this->fields)->map(function($field) {
            $this->counter += 1;
            return [
                'id'        => $this->counter,
                'table'     => $this->table,
                'field'     => $field,
                'alias'     => strtoupper($field),
                'type'      => 'text',
                'position'  => 'none',
                'list'      => true,
                'actions'   => null
            ];
        });
        $this->data = CRUD::where('table',\Request::segment(count(\Request::segments())))->get()->toArray();
        $this->missingFields = array_diff(array_column($this->fields->toArray(),'field'),array_column($this->data,'field'));
        $this->fields = collect($this->fields)->map(function($field) {
            if(in_array($field['field'],$this->missingFields)) {
                return $field;
            }
        });
        $this->fields = count($this->data) > 0?array_merge($this->data,array_filter($this->fields->toArray())):$this->fields;
        $this->columns = collect($this->fields)->map(function($field){
            if($field['list'] == 1) {
                return [
                    'field'             => $field['field'],
                    'headerClassName'   => 'table-header-light',
                    'headerName'        => str_replace('_',' ',$field['alias']),
                    'flex'              => 1
                ];
            }
        })->filter()->values();

        return response([
            'fields'    => $this->fields,
            'columns'   => $this->columns
        ],200);
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

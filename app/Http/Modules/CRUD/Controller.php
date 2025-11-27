<?php

namespace App\Http\Modules\CRUD;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Modules\Framework;
use App\Http\Modules\Entity\Resource as EntityResource;

use App\Http\Modules\Entity\Model as Entity;
use App\Http\Modules\CRUD\Model as CRUD;

class Controller extends Framework
{
    protected $id;
    protected $entity;
    protected $entityCollection;
    protected $fields;
    protected $columns;
    protected $data;
    protected $table;
    protected $icon;
    protected $model;
    protected $missingFields;
    protected $crud;
    protected $options;
    protected $counter = 1;
    protected $validator;
    protected $fieldId;
    protected $entityId;
    protected $multiSelectOptions = ["dropdown", "radio", "checkbox"];


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
            'entities' => array_filter(EntityResource::collection($this->entityCollection)->resolve()),
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
        try {
            // store CRUD data
            $this->data = $request->all();
            $this->validator = Validator::make($this->data, [
                'alias' => 'required|max:20'
            ]);

            if ($this->validator->fails()) {
                return response(['message' => $this->validator->errors(), trans('crud.validationerror')], 400);
            }

            $this->crud = CRUD::updateOrCreate([
                'field' => $this->data['field'],
                'table' => $this->data['table']
            ], $this->data);

            $this->options = [
                'fid' => CRUD::where('field', $this->crud['field'])
                    ->where('table', $this->crud['table'])
                    ->first('uuid')->uuid,
                'eid' => Entity::where('slug', $this->crud['table'])->first('uuid')->uuid
            ];

            if (isset($this->data['options']) && is_array($this->data['options'])) {
                foreach ($this->data['options'] as $option) {
                    $value = is_string($option) ? $option : $option['value'];
                    $doesOptionExist = $this->optionsTable()
                        ->where('fid', $this->options['fid'])
                        ->where('value', $value)
                        ->first();
                    if ($doesOptionExist) {
                        continue;
                    }
                    $this->performDBOperations("options", "insert", [
                        'fid' => $this->options['fid'],
                        'eid' => $this->options['eid'],
                        'key' => $this->hashKey($value),
                        'value' => $value,
                        'url' => isset($this->data['url']) ? $this->data['url'] : false
                    ], false);
                }
            }

            return response([
                'message' => trans('crud.success'),
            ], 200);
        } catch (Exception $e) {
            return response([
                'error' => trans('crud.error'),
                'message' => $e->getMessage()
            ], 500);
        }
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
        $this->model = Entity::where('slug', \Request::segment(count(\Request::segments())))->first();
        $this->entityId = $this->model->uuid;
        $this->model = "\\App\\Models\\" . $this->model->model;

        if (class_exists($this->model)) {
            $this->model = new $this->model();
            $this->table = $this->model->getTable();
            $this->fields = $Entity->getTableColumns($this->table);
            $this->icon = $Entity->getTableIcon($this->table);
            $this->fields = collect($this->fields)->map(function ($field) {
                $this->options = [];
                $this->counter += 1;
                $this->fieldId = $this->_getField($field, 'uuid', null);
                if (in_array($this->_getField($field, 'type', 'text'), $this->multiSelectOptions)) {
                    $this->options = $this->optionsTable()->where('fid', $this->fieldId)->where('eid', $this->entityId)->get();
                }
                return [
                    'id' => $this->counter,
                    'uuid' => $this->fieldId,
                    'tid' => $this->entityId,
                    'table' => $this->table,
                    'field' => $field,
                    'alias' => $this->_getField($field, 'alias', strtoupper($field)),
                    'type' => $this->_getField($field, 'type', 'text'),
                    'options' => $this->options,
                    'position' => $this->_getField($field, 'position', 'none'),
                    'list' => $this->_getField($field, 'list', true),
                    'url' => $this->_getField($field, 'url', false),
                    'mandatory' => $this->_getField($field, 'mandatory', false),
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
                'columns' => $this->columns,
                'icon' => $this->icon,
            ], 200);
        } else {
            return response(['error' => 'Model not found'], 400);
        }
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
        // update the specified resource
        try {
            $this->data = $this->formatData($request->all(), false);
            $this->options = $this->data['options'] ?? [];
            $this->table = $this->data['table'];

            unset($this->data['options']);
            unset($this->data['table']);

            $this->performDBOperations("crud", 'update', $this->data);

            if (!in_array($this->data['type'], $this->multiSelectOptions)) {
                $this->performDBOperations("options", "delete", ['fid' => $this->data['uuid']]);
            } else {
                if (isset($this->options) && is_array($this->options) && !empty($this->options)) {
                    $this->performDBOperations("options", "delete", ['fid' => $this->data['uuid']]);
                    foreach ($this->options as $option) {
                        $value = is_string($option) ? $option : $option['value'];
                        $this->performDBOperations("options", "insert", [
                            'fid' => $this->data['uuid'],
                            'eid' => Entity::where('slug', $this->table)->first('uuid')->uuid,
                            'key' => $this->hashKey($value),
                            'value' => $value,
                            'url' => isset($this->data['url']) ? $this->data['url'] : false
                        ], false);
                    }
                }
            }
            return response(['message' => 'Update successful'], 200);
        } catch (Exception $e) {
            return response(['message' => 'Update failed', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->table = $request->table;
        $this->data = $request->all();
        // Remove data from CRUD table
        try {
            $record = CRUD::where('table', $this->table)->where('field', $this->data['column'])->first();
            $record->delete();
            if ($this->data['type'] === 'dropdown' || $this->data['type'] === 'radio' || $this->data['type'] === 'checkbox') {
                $this->optionsTable()->where('fid', $record->uuid)->delete();
            }
            return response(['message' => trans('crud.delete')], 200);
        } catch (Exception $e) {
            return response(['message' => trans('crud.error'), 'error' => $e->getMessage()], 400);
        }

    }
}

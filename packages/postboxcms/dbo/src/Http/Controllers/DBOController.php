<?php
/*
 * This file is part of the PostboxCMS\DBO package.
 * (c) PostboxCMS <sanket@digitalbit.in>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace PostboxCMS\DBO\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

use App\Http\Modules\Framework;

class DBOController extends Framework
{
    protected $table;
    protected $data;

    public function __construct(Request $request)
    {
        $this->table = $request->route()->parameter(name: 'table');
        $this->data = (object) $request->all();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse|ResponseFactory
    {
        return response()->json(data: ['message' => 'DBO Controller initialized']);
    }

    public function store(Request $request): JsonResponse|ResponseFactory
    {
        try {
            Schema::table($this->table, function (Blueprint $table) {
                $table->{$this->data->dataType}($this->data->field)->after('id');
            });
            $this->validate(request: $request, rules: [
                'field' => 'required|min:3',
            ]);

            return response()->json(data: ['message' => 'DB column added successfully', 'data' => $this->data], status: 200);
        } catch (\Exception $e) {
            return response()->json(data: ['message' => 'Something went wrong', 'error' => $e->getMessage()], status: 400);
        }
    }

    public function update(Request $request, $id): JsonResponse|ResponseFactory
    {
        try {
            Schema::table(table: $this->table, callback: function (Blueprint $table) {
                $table->{$this->data->replaceType}($this->data->field)->change();
            });
            return response()->json(data: ['message' => 'DB column updated successfully'], status: 200);
        } catch (\Exception $e) {
            return response()->json(data: ['message' => 'Something went wrong', 'error' => $e->getMessage()], status: 400);
        }
    }

    public function destroy(Request $request): JsonResponse|ResponseFactory
    {
        $table = $this->table;
        $column = $this->data->column;

        try {
            Schema::table($table, function ($table) use ($column) {
                $table->dropColumn($column);
            });
            return response()->json(data: ['message' => 'DB column deleted successfully', 'data' => ['table' => $table, 'column' => $column]], status: 200);
        } catch (\Exception $e) {
            return response()->json(data: ['error' => 'Something went wrong'], status: 400);
        }
    }

}
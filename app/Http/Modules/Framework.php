<?php

namespace App\Http\Modules;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class Framework extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function performDBOperations($table, $type, $data = [])
    {
        $data = $this->formatData($data);

        try {
            unset($data['module']);
            switch ($type) {
                case 'insert':
                    DB::table($table)->insert($data);
                    break;
                case 'update':
                    DB::table($table)->where('id', $data['id'])->update($data);
                    break;
                case 'delete':
                    DB::table($table)->where('id', $data['id'])->delete($data);
                    break;
                default:
                    DB::table($table)->insert($data);
                    break;
            }
        } catch(\Exception $e) {
            return response(['error'=>trans('database.exception', ['message'=>$e->getMessage()])]);
        }

        return response(['message' => trans('database.success')]);
    }

    protected function formatData($data = []) {
        $data['created_at'] = Carbon::now();
        $data['updated_at'] = Carbon::now();

        return $data;
    }
}

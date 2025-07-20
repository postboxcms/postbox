<?php

namespace App\Http\Modules;

use Carbon\Carbon;
use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class Framework extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $state = [];

    protected function performDBOperations($table, $type, $data = [])
    {
        $data = $this->formatData($data);

        try {
            switch ($type) {
                case 'insert':
                    DB::table($table)->insert($data);
                    break;
                case 'update':
                    DB::table($table)->where('uuid', $data['uuid'])->orWhere('id',$data['id'])->update($data);
                    break;
                case 'delete':
                    DB::table($table)->where('uuid', $data['uuid'])->orWhere('id',$data['id'])->delete();
                    break;
                default:
                    DB::table($table)->insert($data);
                    break;
            }
        } catch (Exception $e) {
            throw new Exception(trans('database.exception') . $e->getMessage());
        }
        return response(['error' => trans('database.success')]);
    }

    protected function performFileOperations($request, $type, $data = [])
    {
        // Implement file operations if needed
        $table = $data['module'] ?? null;
        try {
            switch ($type) {
                case 'upload':
                    // Handle file upload logic here
                    foreach ($data as $key => $value) {
                        if ($request->hasFile($key)) {
                            $filename = time() . '.' . $request->$key->getClientOriginalExtension();
                            $file = $request->file($key);
                            $file->move(public_path('uploads/' . $table), $filename);
                            $this->state[$key] = $filename;
                        }
                    }
                    break;
                case 'delete':
                    // Handle file deletion logic here
                    break;
                default:
                    // Default file operation logic
                    break;
            }
        } catch (Exception $e) {
            throw new Exception(trans('file.error') . $e->getMessage());
        }
        // This is a placeholder for future file handling logic
        return response(['error' => trans('database.success')]);
    }

    protected function formatData($data = [])
    {
        $data = !empty($this->state) ? array_merge($data, $this->state) : $data;
        $data['uuid'] = $data['eid'] ?? $data['uuid'] ?? null;
        unset($data['eid']);
        unset($data['module']);
        unset($data['state']);
        unset($data['_method']);
        $data['created_at'] = Carbon::now();
        $data['updated_at'] = Carbon::now();
        $data = array_filter($data, fn($value) => $value !== null && $value !== '');
        return $data;
    }
}

<?php
namespace App\Http\Modules\Consumer;

use App\Http\Modules\Framework;
use Illuminate\Http\Request;

class Controller extends Framework
{
    protected $data;
    protected $meta;

    public function store(Request $request)
    {
        $limit = isset($request->limit) ? $request->limit : 10;
        $offset = isset($request->offset) ? $request->offset : 0;
        $entity = isset($request->entity) ? $request->entity : null;

        $this->data = $this->fetchPublicEntityResponse($entity, [], $limit, $offset);
        $this->meta = $this->fetchPublicEntityResponse('entities', ['slug' => $entity]);
        return response([
            'data' => $this->data,
            'meta' => $this->meta,
            'message' => trans('consumer.success')
        ], 200);
    }
}
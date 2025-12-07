<?php
namespace App\Http\Modules\Consumer;

use App\Http\Modules\Framework;
use Illuminate\Http\Request;

class Controller extends Framework
{
    protected $data;
    protected $meta;

    public function index(Request $request)
    {
        $this->data = $this->fetchPublicEntityResponse($request->header('X-Entity'), [], $request->limit, $request->offset);
        $this->meta = $this->fetchPublicEntityResponse('entities', ['slug' => $request->header('X-Entity')]);
        return response([
            'data' => $this->data,
            'meta' => $this->meta,
            'message' => 'Consumer data fetched successfully'
        ], 200);
    }
}
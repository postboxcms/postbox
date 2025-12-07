<?php
namespace App\Http\Modules\Consumer;

use App\Http\Modules\Framework;
use Illuminate\Http\Request;

class Controller extends Framework
{
    protected $data;

    public function index(Request $request)
    {
        $this->data = $this->fetchPublicEntityResponse($request->header('X-Entity'), $request->limit, $request->offset);
        return response([
            'data' => $this->data,
            'message' => 'Consumer data fetched successfully'
        ], 200);
    }
}
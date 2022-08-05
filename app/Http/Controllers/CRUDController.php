<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ContentType;
use App\Http\Resources\ContentTypeResource;

class CRUDController extends Controller
{
    protected $contentType;
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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

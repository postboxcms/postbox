<?php

namespace App\Http\Modules\ContentType;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Modules\Framework;

use App\Http\Resources\ContentType as ContentTypeResource;
use App\Models\ContentType as ContentType;

class Controller extends Framework
{
    protected $data;
    protected $tableFields;
    protected $contentType;
    protected $contentTypes;
    protected $validator;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // show all content types
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
        // store a content type
        $this->data = $request->all();
        $this->validator = Validator::make($this->data, [
            'name'          => 'required|max:50',
            'description'   => 'max:191',
            'icon'          => 'required'
        ]);

        if($this->validator->fails()) {
            return response(['message' => $this->validator->errors(),trans('content_types.validationerror')]);
        }

        $this->contentType = ContentType::create($this->data);
        return response([
            'content_type'  => new ContentTypeResource($this->contentType),
            'message'       => trans('app.success')
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ContentType  $contentType
     * @return \Illuminate\Http\Response
     */
    public function show(ContentType $ContentType)
    {
        // show content type info
        return response([
            'content_type'  => new ContentTypeResource($ContentType),
            'message'       => trans('app.success')
        ],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ContentType  $contentType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ContentType $ContentType)
    {
        // update content type info
        $ContentType->update($request->all());

        return response([
            'content_type'  => new ContentTypeResource($ContentType),
            'message'       => trans('app.success')
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ContentType  $contentType
     * @return \Illuminate\Http\Response
     */
    public function destroy(ContentType $ContentType)
    {
        // destroy a content type
        $ContentType->delete();

        return response(['message' => trans('app.delete')],200);
    }
}

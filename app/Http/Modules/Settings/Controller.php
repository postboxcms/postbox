<?php

namespace App\Http\Modules\Settings;

use App\Models\Settings;
use Illuminate\Http\Request;

use App\Http\Modules\Framework;
use Validator;

class Controller extends Framework
{
    protected $data;
    protected $validator;
    protected $settings;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // display settings
        $this->settings = Settings::all();
        return response([
            'data'      => $this->settings,
            'message'   => 'settings data loaded successfully'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // create new settings data
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // store settings data
        $this->data = $request->all();
        $this->validator = Validator::make($this->data, [
            'website_name'          => 'required|max:50',
            'website_title'         => 'max:100',
        ]);

        if($this->validator->fails()) {
            return response(['message' => $this->validator->errors(),trans('settings.validationerror')], 400);
        }

        $this->settings = Settings::create($this->data);
        return response([
            'message'       => trans('settings.success')
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

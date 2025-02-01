<?php

namespace App\Http\Modules\Settings;

use Illuminate\Http\Request;
use Intervention\Image\Laravel\Facades\Image;

use App\Http\Modules\Framework;
use App\Http\Modules\Settings\Model as Settings;

use Validator;

class Controller extends Framework
{
    protected $data;
    protected $validator;
    protected $settings;
    protected $filename;
    protected $originalImage;
    protected $resizedImage;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // display settings
        $this->settings = Settings::all();
        return response([
            'data' => $this->settings,
            'message' => 'settings data loaded successfully'
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
            'property.*' => 'required|max:50',
            'value.*' => 'max:1000',
        ]);

        if ($this->validator->fails()) {
            return response(['message' => $this->validator->errors(), trans('settings.validationerror')], 400);
        }


        foreach ($this->data as $key => $value):
            if ($request->hasFile($key)) {
                $this->filename = time() . '.' . $request->$key->getClientOriginalExtension();
                $this->originalImage = $request->file($key);

                if ($this->originalImage->getClientOriginalExtension() == 'svg') {
                    $this->originalImage->move(public_path('images/'), $this->filename);
                } else {
                    $this->resizedImage = Image::read($this->originalImage->getRealPath());
                    // $this->resizedImage->scale(width:150);
                    $this->resizedImage->save(public_path('images/') . $this->filename);
                }
                
                $value = $this->filename;
            }
            Settings::updateOrCreate(['property' => $key], [
                'property' => $key,
                'value' => $value
            ]);
        endforeach;

        return response([
            'message' => trans('settings.success'),
            'data' => $this->filename ? ['file' => $this->filename] : false
        ], 200);
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

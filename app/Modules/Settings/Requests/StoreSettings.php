<?php

namespace App\Modules\Settings\Requests;

use App\Http\Traits\ValidationErrors;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSettings extends FormRequest
{
    use ValidationErrors;

    public function message()
    {
        return __('validation.error');
    }
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
            return [
                // validation rules while creating or updating form
                'name' => 'required|max:255',
                'image' => 'nullable|image|mimes:jpeg,bmp,png,jpg,gif,svg|max:100000',
                'image_full' => 'nullable|image|mimes:jpeg,bmp,png,jpg,gif,svg|max:100000',
            ];
    }
}

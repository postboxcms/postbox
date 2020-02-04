<?php

namespace App\Modules\Installer\Requests;

use App\Http\Traits\ValidationErrors;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAppData extends FormRequest
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
            'title' => 'required|max:50',
            'description' => 'max:255',
            'keywords' => 'max:255'
        ];
    }
}

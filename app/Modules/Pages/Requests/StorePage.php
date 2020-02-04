<?php

namespace App\Modules\Pages\Requests;

use App\Http\Traits\ValidationErrors;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePage extends FormRequest
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
        // return false;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // dd(request()->id);
        if (isset(request()->id)) {
            return [
                // validation rules while creating or updating form
                'title' => [
                    'required',
                    'max:255',
                    Rule::unique('pages')->ignore(request()->id)
                ],
                'url' => [
                    'max:100',
                    'unique:posts',
                    Rule::unique('pages')->ignore(request()->id),
                ],
                'image' => 'nullable|image|mimes:jpeg,bmp,png,jpg,gif,svg|max:10000',
            ];
        } else {
            return [
                // validation rules while creating or updating form
                'title' => 'required|unique:pages|max:255',
                'url' => 'unique:pages|unique:posts|max:100',
                'image' => 'nullable|image|mimes:jpeg,bmp,png,jpg,gif,svg|max:10000',
            ];
        }
    }
}

<?php

namespace App\Modules\Posts\Requests;

use App\Http\Traits\ValidationErrors;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePost extends FormRequest
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
        if (isset(request()->id)) {
            return [
                // validation rules while creating or updating form
                'title' => [
                    'required',
                    'max:255',
                    Rule::unique('posts')->ignore(request()->id)
                ],
                'summary' => 'required|max:500',
                'url' => [
                    'max:100',
                    'unique:pages',
                    Rule::unique('posts')->ignore(request()->id),
                ],
                'image' => 'nullable|image|mimes:jpeg,bmp,png,jpg,gif,svg|max:10000',
            ];
        } else {
            return [
                // validation rules while creating or updating form
                'title' => 'required|unique:posts|max:255',
                'summary' => 'required|max:500',
                'url' => 'unique:posts|unique:pages|max:100',
                'image' => 'nullable|image|mimes:jpeg,bmp,png,jpg,gif,svg|max:10000',
            ];
        }
    }
}

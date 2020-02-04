<?php

namespace App\Modules\User\Requests;

use App\Http\Traits\ValidationErrors;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class StoreUser extends FormRequest
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
                'username' => [
                    'required',
                    'string',
                    'max:255',
                    'min:3',
                    Rule::unique('users')->ignore(request()->id)                    
                ],
                'name' => [
                    'required',
                    'string',
                    'max:255'
                ],
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    Rule::unique('users')->ignore(request()->id)                                        
                ],
                'password' => 'sometimes|nullable|string|min:6|confirmed',
                'image' => 'nullable|image|mimes:jpeg,bmp,png,jpg,gif,svg|max:10000',
            ];
        } else {
            return [
                'username' => 'required|unique:users',
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',          
                'image' => 'nullable|image|mimes:jpeg,bmp,png,jpg,gif,svg|max:10000',      
            ];
        }
    }
}

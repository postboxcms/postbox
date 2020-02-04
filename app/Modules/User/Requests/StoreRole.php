<?php

namespace App\Modules\User\Requests;

use App\Http\Traits\ValidationErrors;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class StoreRole extends FormRequest
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
                'rolename' => [
                    'required',
                    Rule::unique('roles')->ignore(request()->id)                    
                ]
            ];
        } else {
            return [
                'rolename' => 'required|unique:roles'
            ];
        }
    }
}

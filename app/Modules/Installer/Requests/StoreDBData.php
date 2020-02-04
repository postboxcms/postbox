<?php

namespace App\Modules\Installer\Requests;

use App\Http\Traits\ValidationErrors;
use Illuminate\Validation\Factory as ValidationFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDBData extends FormRequest
{
    use ValidationErrors;

    public function __construct(ValidationFactory $validationFactory) {
        $validationFactory->extend(
            'dbConnect',
            function ($attribute, $value, $parameters) {                
                return 'dbConnect' === $value;
            },
            'Sorry, it failed foo validation!'
        );
    }

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
            'connection' => 'required',
            'host' => 'required|max:255',
            'database' => 'required|max:100',
            'port' => 'required|numeric|max:65535',
            'user' => 'required|max:50',
            'password'  =>  'required|min:4|max:100'
        ];
    }
}

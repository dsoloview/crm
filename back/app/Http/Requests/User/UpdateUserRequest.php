<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'email' => ['required', 'email', 'max:254', Rule::unique('users')->ignore($this->user)],
            'password' => ['required', 'confirmed', 'exclude_if:password,null'],
            'roles' => ['required', 'array', 'exists:roles,id'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}

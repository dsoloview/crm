<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'email' => ['required', 'email', 'max:254', 'unique:users'],
            'password' => ['required', 'confirmed'],
            'role' => ['required', 'exists:roles,id'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}

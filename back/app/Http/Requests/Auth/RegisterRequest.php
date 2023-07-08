<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}

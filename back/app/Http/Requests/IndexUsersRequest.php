<?php

namespace App\Http\Requests;

use App\Sort\UserSort;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexUsersRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'sort' => ['nullable', 'string', Rule::in(UserSort::getSortableFields())],
            'filters' => ['array', 'nullable'],
            'direction' => ['nullable', 'string', Rule::in(['asc', 'desc'])],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}

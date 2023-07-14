<?php

namespace App\Filters;

use dsoloview\LaravelFiltersSort\Filters\QueryFilter;

class UserFilter extends QueryFilter
{
    public function name(string $value): void
    {
        $this->builder->where('name', 'like', "%{$value}%");
    }

    public function email(string $value): void
    {
        $this->builder->where('email', 'like', "%{$value}%");
    }
}

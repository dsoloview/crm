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

    public function role(string $value): void
    {
        $this->builder->whereHas('roles', function ($query) use ($value) {
            $query->where('id', $value);
        });
    }

    public function search(string $value): void
    {
        $this->builder->where(function ($query) use ($value) {
            $query->where('name', 'like', "%{$value}%")
                ->orWhere('email', 'like', "%{$value}%");
        });
    }
}

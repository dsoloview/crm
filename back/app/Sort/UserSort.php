<?php

namespace App\Sort;

use dsoloview\LaravelFiltersSort\Sort\QuerySort;

class UserSort extends QuerySort
{
    protected const SORT_DEFAULT = 'created_at';
    protected const DIRECTION_DEFAULT = 'desc';

    public function id(string $direction): void
    {
        $this->builder->orderBy('id', $direction);
    }

    public function name(string $direction): void
    {
        $this->builder->orderBy('name', $direction);
    }

    public function email(string $direction): void
    {
        $this->builder->orderBy('email', $direction);
    }

    public function created_at(string $direction): void
    {
        $this->builder->orderBy('created_at', $direction);
    }

}

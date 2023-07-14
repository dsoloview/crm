<?php

namespace App\Utils;

class Paginate
{
    private const DEFAULT_PER_PAGE = 10;

    public static function getPerPage(): int
    {
        try {
            return request()->get('per_page', self::DEFAULT_PER_PAGE);
        } catch (\Throwable $e) {
            return self::DEFAULT_PER_PAGE;
        }

    }
}

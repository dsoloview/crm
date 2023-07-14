<?php

namespace App\Services\User;

use App\Filters\UserFilter;
use App\Models\User;
use App\Sort\UserSort;
use App\Utils\Paginate;
use Illuminate\Pagination\LengthAwarePaginator;

readonly class UserService
{
    public function __construct(private User $user)
    {
    }

    public function create(array $data): User
    {
        $user = $this->user->create($data);
        $user->syncRoles($data['roles']);
        return $user;
    }

    public function update(array $data, User $user): User
    {
        $user->update($data);
        $user->syncRoles($data['roles']);
        return $user;
    }

    public function delete(User $user): void
    {
        $user->delete();
    }

    public function get(): User
    {
        return $this->user;
    }

    public function all(): LengthAwarePaginator
    {
        return $this->user->query()
            ->filter(new UserFilter())
            ->sort(new UserSort())
            ->paginate(Paginate::getPerPage());
    }

}

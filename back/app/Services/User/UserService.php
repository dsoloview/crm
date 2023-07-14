<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class UserService
{
    public function __construct(private readonly User $user)
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
        return $this->user->with('roles')->paginate(5);
    }

}

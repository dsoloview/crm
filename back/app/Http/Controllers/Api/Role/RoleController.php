<?php

namespace App\Http\Controllers\Api\Role;

use App\Http\Controllers\Controller;
use App\Http\Resources\Role\RoleCollection;
use App\Http\Resources\Role\RoleResource;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return new RoleCollection(Role::all());
    }

    public function show(Role $role)
    {
        return new RoleResource($role);
    }
}

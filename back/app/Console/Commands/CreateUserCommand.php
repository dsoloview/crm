<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateUserCommand extends Command
{
    protected $signature = 'create:user {name} {email} {password}';

    protected $description = 'Command description';

    public function handle(): void
    {
        $name = $this->argument('name');
        $email = $this->argument('email');
        $password = $this->argument('password');

        $user = \App\Models\User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => $password,
            ]
        );

        $user->assignRole('admin');

        $this->info("User {$user->name} created");
    }
}

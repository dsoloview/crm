<?php

namespace Tests\Feature\Api\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;
    // Write tests for login here
    public function testLogin(): void
    {
        User::create([
            'name' => 'test',
            'email' => 'test@test.ru',
            'password' => 'password'
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@test.ru',
            'password' => 'password'
        ]);

        $response->assertOk();
    }

    public function testLoginFail(): void
    {
        User::create([
            'name' => 'test',
            'email' => 'test@test.ru',
            'password' => 'password'
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'wrong@test.ru',
            'password' => 'password'
        ]);

        $response->assertUnauthorized();
    }

    // Write tests for register here
    public function testRegister(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'test',
            'email' => 'test@test.ru',
            'password' => 'password',
            'password_confirmation' => 'password',
            'roles' => ['user'],
        ]);

        $response->assertOk();
    }

    public function testRegisterFail(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'test',
            'email' => 'wrong.@test.ru',
            'password' => 'password',
            'password_confirmation' => 'passwor',
        ]);

        $response->assertStatus(422);
    }

    // Write tests for logout here
    public function testLogout(): void
    {
        $user = User::factory()->createOne();

        $response = $this->actingAs($user)->postJson('/api/auth/logout');

        $response->assertOk();
    }

    public function testLogoutFail(): void
    {
        $response = $this->postJson('/api/auth/logout');

        $response->assertUnauthorized();
    }
}

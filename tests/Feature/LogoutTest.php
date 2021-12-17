<?php

namespace Tests\Feature;

use Illuminate\Foundation\Auth\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    public function test_logout_without_auth()
    {
        $this->get('/logout')
            ->assertRedirect('/login');
    }

    public function test_logout_with_auth()
    {
        $this->be(self::$testUser);
        $this->get('/logout')
            ->assertRedirect('/login');
    }
}

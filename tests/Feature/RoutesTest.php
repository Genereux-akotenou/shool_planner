<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RoutesTest extends TestCase
{
    public function test_main_route()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
    public function test_login_route()
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
    }
}

<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SinginTest extends TestCase
{
    public function test_signin_view_is_shown()
    {
        $this->get('/login')
            ->assertViewIs('login')
            ->assertOk();
    }

    public function test_signin_with_valid_credentials()
    {
        $data = [
            'email'    => 'genereux.akotenou@campus.uac.bj',
            'password' => '00000000'
        ];
        $this->post('/login', $data)
            ->assertRedirect('/planning')
            ->assertSessionDoesntHaveErrors();
    }

    public function test_signin_with_invalid_password()
    {
        $data = [
            'email'    => 'genereux.akotenou@campus.uac.bj',
            'password' => 'fakepass'
        ];
        $this->post('/login', $data)
            ->assertRedirect('/')
            ->assertSessionHasErrors(['status']);
    }

    public function test_signin_with_invalid_email()
    {
        $data = [
            'email'    => 'fakemail@mail.test',
            'password' => 'fakepass'
        ];
        $this->post('/login', $data)
            ->assertRedirect('/')
            ->assertSessionHasErrors(['status']);
    }

    // public function test_signin_with_invalid_small_password()
    // {
    //     $data = [
    //         'email'    => 'genereux.akotenou@campus.uac.bj',
    //         'password' => '00'
    //     ];
    //     $this->post('/login', $data)
    //         ->assertRedirect('/planning')
    //         ->assertSessionDoesntHaveErrors();
    // }
}

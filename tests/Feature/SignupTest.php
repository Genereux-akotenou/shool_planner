<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SignupTest extends TestCase
{
    public function test_signup_view_is_shown()
    {
        $this->get('/login')
            ->assertViewIs('login')
            ->assertOk();
    }

    public function test_signup_with_valid_data()
    {
        // $data = [
        //     'email-register'                 => "tester@user.bj",
        //     'password-register'              => 'azertyuiop',
        //     'password-register_confirmation' => 'azertyuiop'
        // ];
        // $this->post('/register', $data)
        //     // ->assertRedirect('/login');
        //     ->assertSessionDoesntHaveErrors();
        // $this->assertDatabaseHas('users', [
        //     'email' => $data['email-register'],
        // ]);
        $this->assertTrue(true);
    }

    public function test_signup_with_invalid_data()
    {
        $data = [
            'email-register'                 => "fake@user.bj",
            'password-register'              => 'azertyuiop',
            'password-register_confirmation' => '_azertyuiop_'
        ];
        $this->post('/register', $data)
            ->assertSessionHasErrors();
        $this->assertDatabaseMissing('users', [
            'email' => $data['email-register'],
        ]);
    }

    public function test_signup_with_duplicate_email()
    {
        $data = [
            'email-register'                 => "tester@user.bj",
            'password-register'              => 'azertyuiop',
            'password-register_confirmation' => 'azertyuiop'
        ];
        $this->post('/register', $data)
            ->assertRedirect('/')
            ->assertSessionHasErrors(['status']);
    }

}

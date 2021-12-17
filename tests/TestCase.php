<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{

    use CreatesApplication;
    use WithFaker;

    protected static ?User $testUser = null;

    protected function setUp(): void
    {
        parent::setUp();
        $this->setUpFaker();
        self::$testUser ??= new User([
            'email'          => $this->faker->safeEmail,
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        ]);
    }
}



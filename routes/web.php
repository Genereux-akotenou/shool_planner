<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\usersControllers;
use App\Http\Controllers\reservationsControllers;

// GENERAL ROUTE EXTERNAL
Route::get('/',  [reservationsControllers::class, 'get_today_reservation'])->name('today');
Route::post('/planning', [reservationsControllers::class, 'get_filterer_reservation']);
Route::get('/login', function () {
    return view('login');
});
Route::get('/preferences/{calendarForm}', [reservationsControllers::class, 'set_calendar_preferences']);


// TEACHER ROUTE INTERNAL
Route::middleware(['UserAuth'])->group(function () {
    // GET ROUTE
    Route::get('/planning', [reservationsControllers::class, 'get_today_reservation']);
    Route::get('/reservation-step1', function () {
        return view('tools.reservation-step1');
    });
    Route::get('/reservation-step2', function () {
        return view('tools.reservation-step2');
    });
    Route::get('/edit-recap', function () {
        return view('tools.edit-recap');
    });
    Route::get('/read-recap', function () {
        return view('tools.see-recap');
    });
    // POST ROUTE
    Route::post('/reservation-step1', [reservationsControllers::class, 'reservation_step1']);
    Route::post('/reservation-step2', [reservationsControllers::class, 'reservation_step2']);
});

// TEACHER ROUTE EXTERNAL
Route::post('/register', [usersControllers::class, 'register']);
Route::post('/login',    [usersControllers::class, 'authenticate']);
Route::get('/logout',    [usersControllers::class, 'logout']);


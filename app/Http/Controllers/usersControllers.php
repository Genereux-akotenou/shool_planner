<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class usersControllers extends Controller
{
    public function register(){
        request()->validate([
            'email-register' => 'required | email',
            'password-register' => 'required | confirmed | min:8',
            'password-register_confirmation' => 'required'
        ]);

        $utilisateur = User::create([
            'email' => request('email-register'),
            'password' => bcrypt(request('password-register')),
        ]);

        return redirect('/login')->with('state', 'Account successfully created. Login right now !');
    }

    public function logout(Request $request) {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
    }

    public function authenticate(Request $request) {
        $credentials = $request->validate([
            'email' => 'required | email',
            'password' => 'required | min:8',
        ]);

        $remember = (request('remenber_me') == 'on') ? TRUE : FALSE;

        if(Auth::attempt($credentials, $remember)) {
            // $request->session()->regenerate();

            return redirect('planning');
        }

        return back()->withErrors([
            'status' => 'No active account found with the given credentials.',
        ]);
    }
}

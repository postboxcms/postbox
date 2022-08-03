<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class OAuth extends Controller
{
    protected $data;
    protected $user;
    protected $token;

    // register a user
    public function register(Request $request) {
        $this->data = $request->validate([
            'name'      => 'required|max:255',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|confirmed'
        ]);
        $this->data['password'] = bcrypt($request->password);
        $this->user = User::create($this->data);
        $this->token = $this->user->createToken(env('APP_NAME').' Token')->accessToken;

        return response(['user' => $this->user, 'token' => $this->token]);
    }

    // login a user
    public function login(Request $request) {
        $this->data = $request->validate([
            'email'     => 'email|required',
            'password'  => 'required'
        ]);

        if(!auth()->attempt($this->data)) {
            return response(['message' => trans('auth.failed')],422);
        }
        $this->token = auth()->user()->createToken(env('APP_NAME').' Token')->accessToken;

        return response(['user' => auth()->user(), 'token' => $this->token],200);
    }
}
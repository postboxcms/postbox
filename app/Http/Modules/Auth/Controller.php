<?php

namespace App\Http\Modules\Auth;

use Illuminate\Http\Request;

use App\Http\Modules\Framework;

use App\Models\User as UserModel;

class Controller extends Framework
{
    protected $data;
    protected $user;
    protected $token;

    // register a user
    public function register(Request $request)
    {
        try {
            $this->data = $request->validate([
                'name' => 'required|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|confirmed'
            ]);
            $this->data['password'] = bcrypt($request->password);
            $this->user = UserModel::create($this->data);
            $this->token = $this->user->createToken(env('APP_NAME') . ' Token')->accessToken;

            return response(['user' => $this->user, 'token' => $this->token], 200);
        } catch (\Exception $e) {
            return response(['error' => $e->getMessage()], 400);
        }
    }

    // login a user
    public function login(Request $request)
    {
        $this->data = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($this->data)) {
            return response(['message' => trans('auth.failed')], 422);
        }
        $this->token = auth()->user()->createToken(env('APP_NAME') . ' Token')->accessToken;

        return response(['user' => auth()->user(), 'token' => $this->token, 'message' => 'Login successful'], 200);
    }

    // logout a user
    public function logout()
    {
        try {
            $this->user = auth()->user();
            auth()->user()->token()->revoke();
            return response(['message' => 'logged out', 'user' => $this->user], 200);
        } catch (\Exception $e) {
            return response(['error' => 'unable to logout'], 403);
        }
    }
}

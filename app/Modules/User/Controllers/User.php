<?php

namespace App\Modules\User\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

use App\Http\Controllers\Controller;

use App\Modules\User\Models\UserRoleModel;
use App\Modules\User\Requests\StoreUser;

use Auth;

class User extends Controller
{
    protected $schema;
    protected $table = 'users';

    /**
     * Constructor initialized.
     */
    public function __construct() {
        // Constructor function
        $this->schema = $this->_getSchema($this->table);
    }

    // Get schema for user table
    private function _getSchema($table) {
        $data = array_flip(Schema::getColumnListing($table));
        unset($data['id']);
        return array_map(function($val) { $val = '';}, $data);
    }

    private function _getUserData($id) {
        return isset(\App\User::where('id',$id)->get()->toArray()[0])?\App\User::where('id',$id)->get()->toArray()[0]:abort(404);
    }

    private function _updateToDB(\App\User $user, Request $request) {

        foreach($this->schema as $col=>$val) {  
            $user->$col = $request->$col;
            if($col == 'password' && $request->$col == null) {
                unset($user->$col);
            } elseif($col == 'password' && $request->$col != null) {
                $user->$col = bcrypt($request->$col);
            }
            if($col == 'image') {
                if($request->image_flag == "1") {
                    $user->$col = null;
                    continue;
                }
                if($request->$col != null) {
                    $user->$col = $request->$col->hashName();
                } else {
                    unset($user->$col);
                    continue;
                }
            }
        }
        $user->created_at = date('Y-m-d H:i:s');
        $user->updated_at = date('Y-m-d H:i:s');

        return $user->save();
    }


    private function _saveToDB(\App\User $user, Request $request) {
        $data = $request->all();
        unset($data['_token']);
        unset($data['password_confirmation']);
        unset($data['image_flag']);

        foreach($data as $field=>$record) {
            if($field == 'image' && $data[$field] != null) {
                $data[$field] = $request->$field->hashName();
            }
            if($field == 'password') {
                $user->$field = bcrypt($data[$field]);
            } else {
                $user->$field = $data[$field];
            }
        }
        $user->save();

        return $user->id;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function listUser()
    {
        //Your code goes here
        $data['title'] = __('user.title');
        $data['users'] = \App\User::all();

        return admin_view('User::List', $data);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editUser($id)
    {
        // Edit post
        $data['title'] = __('user.edit_user');
        $data['pagemode'] = 'edit';
        $data['user'] = $this->_getUserData($id);
        $data['user']['form'] = config('app.admin_prefix').'/user/update';
        $data['user']['roles'] = UserRoleModel::all();
        return admin_view('User::CreateEdit', $data);
    }

    public function createUser() {
        $data['title'] = __('user.add');
        $data['pagemode'] = 'add';
        // $data['user'] = \App\User::all();
        $data['user'] = $this->schema;
        $data['user']['roles'] = UserRoleModel::all();
        $data['user']['form'] = config('app.admin_prefix').'/user/store';
        return admin_view('User::CreateEdit',$data);
    }

    public function storeUser(StoreUser $request) {
        if($request->hasFile('image')) {
            $request->image->store('users','assets');
        }        
        $userRecord = new \App\User();
        $response = $this->_saveToDB($userRecord, $request);
        return response()->json(['message'=>__('user.create_user_success')]);
    }

    public function updateUser(StoreUser $request) {
        // update existing user
        if(isset($request->id)) {
            $user = \App\User::find($request->id);
            if($request->hasFile('image')) {
                $request->image->store('users','assets');
            }
            $updateCategory = $this->_updateToDB($user, $request);
        }
        return response()->json(['message'=>__('user.update_user_success')]);
    }

    public function destroyUser(Request $request) {
        // Delete user id
        $user = \App\User::find($request->id);
        $adminCount = \App\User::where('role',1)->count();
        if($user->id !== Auth::user()->id) {
            $user->delete();
            return response()->json(['message'=>__('user.delete_user_success_message')]);    
        } else {
            return response()->json(['message'=>__('user.delete_user_fail_message')],401);    
        }
    }
}

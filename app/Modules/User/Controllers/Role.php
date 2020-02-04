<?php

namespace App\Modules\User\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

use App\Http\Controllers\Controller;

use App\Modules\User\Models\UserRoleModel;
use App\Modules\User\Requests\StoreRole;

class Role extends Controller
{
    protected $schema;
    protected $table = 'roles';

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

    private function _getRoleData($id) {
        return isset(UserRoleModel::where('id',$id)->get()->toArray()[0])?UserRoleModel::where('id',$id)->get()->toArray()[0]:abort(404);
    }

    private function _updateToDB(UserRoleModel $role, Request $request) {
        foreach($this->schema as $col=>$val) {            
            $role->$col = $request->$col;
        }
        $role->created_at = date('Y-m-d H:i:s');
        $role->updated_at = date('Y-m-d H:i:s');
        return $role->save();
    }


    private function _saveToDB(UserRoleModel $role, Request $request) {
        $data = $request->all();
        unset($data['_token']);

        foreach($data as $field=>$record) {
            $role->$field = $data[$field];
        }
        $role->save();

        return $role->id;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function listRole()
    {
        //Your code goes here
        $data['title'] = __('user.roles');
        $data['roles'] = UserRoleModel::all();

        return admin_view('User::RoleList', $data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editRole($id)
    {
        // Edit post
        $data['title'] = __('user.edit_role');
        $data['pagemode'] = 'edit';
        // $data['user'] = \App\User::where([['id','!=',$id],['parent','!=',$id]])->orWhereNull('parent')->get();        
        $data['role'] = $this->_getRoleData($id);
        $data['role']['form'] = config('app.admin_prefix').'/user/role/update';
        return admin_view('User::CreateEditRole', $data);
    }

    public function createRole() {
        $data['title'] = __('user.add');
        $data['pagemode'] = 'add';
        $data['user'] = UserRoleModel::all();
        $data['role'] = $this->schema;
        $data['role']['form'] = config('app.admin_prefix').'/user/role/store';
        return admin_view('User::CreateEditRole',$data);
    }

    public function storeRole(StoreRole $request) {
        $roleRecord = new UserRoleModel();
        $response = $this->_saveToDB($roleRecord, $request);
        return response()->json(['message'=>__('user.create_role_success')]);
    }

    public function updateRole(StoreRole $request) {
        // update existing post
        if(isset($request->id)) {
            $role = UserRoleModel::find($request->id);
            $updateRole = $this->_updateToDB($role, $request);
        }
        return response()->json(['message'=>__('user.update_role_success')]);
    }

    public function destroyRole(Request $request) {
        // Delete role id
        if($request->id > 1) {
            $associatedUsers = \App\User::where('role',$request->id)->count();
            if($associatedUsers <= 0) {
                $role = UserRoleModel::find($request->id);    
                $role->delete();
                return response()->json(['message'=>__('user.delete_role_success_message')]);
            } else {
                return response()->json(['message'=>__('user.delete_role_user_err_message')],400);
            }
        } else {
            return response()->json(['message'=>__('user.delete_role_unauth_message')],401);
        }
    }
}

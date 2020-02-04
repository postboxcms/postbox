<?php

namespace App\Modules\Categories\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

use App\Http\Controllers\Controller;

use App\Modules\Categories\Models\CategoryModel;
use App\Modules\Categories\Requests\StoreCategory;

class Categories extends Controller
{
    protected $schema;
    protected $table = 'categories';

    /**
     * Constructor initialized.
     */
    public function __construct() {
        // Constructor function
        $this->schema = $this->_getSchema($this->table);
    }

    // Get schema for categories table
    private function _getSchema($table) {
        $data = array_flip(Schema::getColumnListing($table));
        unset($data['id']);
        return array_map(function($val) { $val = '';}, $data);
    }

    private function _getCategoryData($id) {
        return isset(CategoryModel::where('id',$id)->get()->toArray()[0])?CategoryModel::where('id',$id)->get()->toArray()[0]:abort(404);
    }

    private function _updateToDB(CategoryModel $category, Request $request) {
        foreach($this->schema as $col=>$val) {            
            if($col == 'url') {
                $request->$col = generate_url($request->name);
            }            
            $category->$col = $request->$col;
        }

        return $category->save();
    }


    private function _saveToDB(CategoryModel $category, Request $request) {
        $data = $request->all();
        unset($data['_token']);

        if($data['url'] == '') {
            $data['url'] = generate_url($data['name']);
        } else {
            $data['url'] = generate_url($data['url']);
        }

        foreach($data as $field=>$record) {
            $category->$field = $data[$field];
        }
        $category->save();

        return $category->id;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function main()
    {
        //Your code goes here
        $data['title'] = __('categories.title');
        $data['categories'] = CategoryModel::get()->toArray();
        $data['categories'] = array_map(function($val) {
            $val['parent'] = \Illuminate\Support\Facades\DB::table('categories')->where('id',$val['parent'])->get('name')->toArray();
            $val['parent'] = isset($val['parent'][0])?$val['parent'][0]->name:'';
            return (object)$val;
        },$data['categories']);

        return admin_view('Categories::List', $data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editCategory($id)
    {
        // Edit post
        $data['title'] = __('categories.edit');
        $data['pagemode'] = 'edit';
        $data['categories'] = CategoryModel::where([['id','!=',$id],['parent','!=',$id]])->orWhereNull('parent')->get();        
        $data['category'] = $this->_getCategoryData($id);
        $data['category']['form'] = config('app.admin_prefix').'/category/update';
        return admin_view('Categories::CreateEdit', $data);
    }

    public function createCategory() {
        $data['title'] = __('categories.add');
        $data['pagemode'] = 'add';
        $data['categories'] = CategoryModel::all();
        $data['category'] = $this->schema;
        $data['category']['form'] = config('app.admin_prefix').'/category/store';
        return admin_view('Categories::CreateEdit',$data);
    }

    public function storeCategory(StoreCategory $request) {
        $categoryRecord = new CategoryModel();
        $response = $this->_saveToDB($categoryRecord, $request);
        return response()->json(['message'=>__('categories.create_category_success')]);
    }

    public function updateCategory(StoreCategory $request) {
        // update existing post
        if(isset($request->id)) {
            $category = CategoryModel::find($request->id);
            $updateCategory = $this->_updateToDB($category, $request);
        }
        return response()->json(['message'=>__('categories.update_category_success')]);
    }

    public function destroyCategory(Request $request) {
        // Delete post id
        $category = CategoryModel::find($request->id);    
        $category->delete();
        return response()->json(['message'=>__('categories.delete_category_success_message')]);
    }

    public function pageView($url) {
        $data['page'] = 'categories';
        $data['pageData'] = CategoryModel::where('url',$url)->firstOrFail()->toArray();
        $data['pageData']['posts'] = DB::table('posts')->where(['category'=>$data['pageData']['id'],'status'=>2])->get()->toArray();

        return view('theme.page',$data);
    }
}

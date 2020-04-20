<?php

namespace App\Modules\Pages\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

use App\Http\Requests;

use App\Http\Controllers\Controller;

use App\Modules\Pages\Models\PageModel;
use App\Modules\Pages\Requests\StorePage;

class Pages extends Controller
{
    protected $schema;
    protected $table = 'pages';

    /**
     * Constructor initialized.
     */
    public function __construct() {
        // Constructor function
        $this->schema = $this->_getSchema($this->table);
    }


    private function _saveToDB(PageModel $page, Request $request) {
        $data = $request->all();
        unset($data['_token']);
        unset($data['image_flag']);
        if($data['url'] == '') {
            $data['url'] = generate_url($data['title']);
        } else {
            $data['url'] = generate_url($data['url']);
        }

        foreach($data as $field=>$record) {
            if($field == 'image' && $data[$field] != null) {
                $data[$field] = $request->$field->hashName();
            }
            $page->$field = $data[$field];
        }
        $page->save();

        return $page->id;
    }

    private function _getPageData($id) {
        return isset(PageModel::where('id',$id)->get()->toArray()[0])?PageModel::where('id',$id)->get()->toArray()[0]:abort(404);
    }

    private function _getSchema($table) {
        $data = array_flip(Schema::getColumnListing($table));
        unset($data['id']);
        return array_map(function($val) { $val = '';}, $data);
    }

    private function _updateToDB(PageModel $page, Request $request) {
        foreach($this->schema as $col=>$val) {
            if($col == 'image') {
                if($request->image_flag == "1") {
                    $page->$col = null;
                    continue;
                }
                if($request->$col != null) {
                    $request->$col = $request->$col->hashName();
                } else {
                    continue;
                }
            }

            if($col == 'url') {
                if($request->$col == null) {
                    $request->$col = generate_url($request->title);
                }
            }

            $page->$col = $request->$col;
        }
        return $page->save();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function listPage()
    {
        //Your code goes here
        $data['pages'] = PageModel::where('status',1)->orWhere('status',2)->orderBy('id','desc')->get();
        $data['pagemode'] = 'edit';
        return admin_view('Pages::List', $data);
    }

    public function trashPage() {
        $data['pages'] = PageModel::where('status',3)->get();
        $data['title'] = __('pages.trash');
        $data['pagemode'] = 'trash';
        return admin_view('Pages::List', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createPage()
    {
        // create a new page
        $data['title'] = __('pages.add');
        $data['page'] = $this->schema;
        $data['page']['form'] = config('app.admin_prefix').'/page/store';

        return admin_view('Pages::CreateEdit', $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storePage(StorePage $request)
    {
        // Store the request data in database
        $validated = $request->validated();
        if($request->hasFile('image')) {
            $request->image->store('pages','assets');
        }
        $request->created_at = date('Y-m-d H:i:s');
        $request->updated_at = date('Y-m-d H:i:s');
        $pageRecord = new PageModel();
        $response = $this->_saveToDB($pageRecord, $request);
        return response()->json(['message'=>__('pages.storepage_message')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editPage($id)
    {
        // Edit page
        $data['title'] = __('pages.edit');
        $data['page'] = $this->_getPageData($id);
        $data['page']['form'] = config('app.admin_prefix').'/page/update';
        return admin_view('Pages::CreateEdit', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updatePage(StorePage $request)
    {
        // update existing page
        if(isset($request->id)) {
            $page = PageModel::find($request->id);
            if($request->hasFile('image')) {
                $request->image->store('pages','assets');
            }
            $request->created_at = date('Y-m-d H:i:s');
            $request->updated_at = date('Y-m-d H:i:s');
    
            $updatePage = $this->_updateToDB($page, $request);
            return response()->json(['message'=>__('pages.updatepage_message')]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyPage(Request $request)
    {
        // Delete page id
        $page = PageModel::find($request->id);    
        $page->status = $request->status;
        $page->save();
        return response()->json(['message'=>__('pages.delete_page_success_message')]);
        // dd($request);
    }

    
    /**
     * Resore the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restorePage(Request $request)
    {
        // Delete page id
        $page = PageModel::find($request->id);    
        $page->status = $request->status;
        $page->save();
        return response()->json(['message'=>__('pages.restore_page_success_message')]);
        // dd($request);
    }

    public function removePage(Request $request) {
        // Delete page id
        $page = PageModel::find($request->id);    
        $page->delete();
        return response()->json(['message'=>__('pages.delete_page_success_message')]);
    }

    public function pageView($url) {
        $data['page'] = 'pages';
        $data['pageData'] = PageModel::where('url',$url)->where('status',2)->firstOrFail()->toArray();
        $data['pageData']['meta_description'] = (isset($data['pageData']['meta_description']) && $data['pageData']['meta_description'] != null)?$data['pageData']['meta_description']:env('APP_DESCRIPTION');
        $data['pageData']['meta_keywords'] = (isset($data['pageData']['meta_keywords']) && $data['pageData']['meta_keywords'] != null)?$data['pageData']['meta_keywords']:env('APP_TAGS');
        $data['pageData']['created_at'] = date('D d M, Y', strtotime($data['pageData']['created_at']));
        $data['pageData']['updated_at'] = date('D d M, Y', strtotime($data['pageData']['updated_at']));
        // dd($data);
        return view('theme.page',$data);
    }
}

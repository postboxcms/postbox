<?php

namespace App\Modules\Posts\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use App\Http\Requests;
use Image;

use App\Http\Controllers\Controller;

use App\Modules\Posts\Models\PostModel;
use App\Modules\Posts\Models\CategoryModel;
use App\Modules\Posts\Requests\StorePost;

class Posts extends Controller
{
    protected $schema;
    protected $thumb;
    protected $image;
    protected $table = 'posts';

    /**
     * Constructor initialized.
     */
    public function __construct() {
        // Constructor function
        $this->schema = $this->_getSchema($this->table);
    }


    private function _saveToDB(PostModel $post, Request $request) {
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
            $post->$field = $data[$field];
        }
        $post->save();

        return $post->id;
    }

    private function _getPostData($id) {
        return isset(PostModel::where('id',$id)->get()->toArray()[0])?PostModel::where('id',$id)->get()->toArray()[0]:abort(404);
    }

    private function _getSchema($table) {
        $data = array_flip(Schema::getColumnListing($table));
        unset($data['id']);
        return array_map(function($val) { $val = '';}, $data);
    }

    private function _updateToDB(PostModel $post, Request $request) {
        // dd($request->all());
        foreach($this->schema as $col=>$val) {
            if($col == 'image') {
                if($request->image_flag == "1") {
                    $post->$col = null;
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
            $post->$col = $request->$col;
        }

        return $post->save();
    }

    private function _createThumbnail($path, $width, $height)
    {
        $img = Image::make($path)->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->save($path);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function listPost()
    {
        //Your code goes here
        $data['posts'] = PostModel::where('status',1)->orWhere('status',2)->orderBy('id','desc')->get();
        $data['pagemode'] = 'edit';
        return admin_view('Posts::List', $data);
    }

    public function trashPost() {
        $data['posts'] = PostModel::where('status',3)->get();
        $data['title'] = __('posts.trash');
        $data['pagemode'] = 'trash';
        return admin_view('Posts::List', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createPost()
    {
        // create a new post
        $data['title'] = __('posts.add');
        $data['post'] = $this->schema;
        $data['post']['categories'] = CategoryModel::all();
        $data['post']['form'] = config('app.admin_prefix').'/post/store';

        return admin_view('Posts::CreateEdit', $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storePost(StorePost $request)
    {
        // Store the request data in database
        $validated = $request->validated();
        if($request->hasFile('image')) {
            $request->image->store('posts','assets');
            // $request->image->store('posts/thumbs','assets');
            // $this->thumb = assets_path('storage/posts/thumbs/'.$request->image->hashName());
            // $this->_createThumbnail($this->thumb,16,16);
            // $this->image = Image::make($request->file('image')->getRealPath())->encode('jpg');
            // $this->thumb = $this->image->fit(300)->encode('jpg');
            // Storage::put('posts',$this->image->__toString());
            // Storage::put('posts/thumbs',$this->thumb->__toString());
        }
        $request->created_at = date('Y-m-d H:i:s');
        $request->updated_at = date('Y-m-d H:i:s');
        $postRecord = new PostModel();
        $response = $this->_saveToDB($postRecord, $request);
        return response()->json(['message'=>__('posts.storepost_message')]);
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
    public function editPost($id)
    {
        // Edit post
        $data['title'] = __('posts.edit');
        $data['post'] = $this->_getPostData($id);
        $data['post']['form'] = config('app.admin_prefix').'/post/update';
        $data['post']['categories'] = CategoryModel::all();
        return admin_view('Posts::CreateEdit', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updatePost(StorePost $request)
    {
        // update existing post
        // dd($request->all());
        if(isset($request->id)) {
            $post = PostModel::find($request->id);
            if($request->hasFile('image')) {
                $request->image->store('posts','assets');
                $request->image->store('posts/thumbs','assets');
                $this->thumb = assets_path('storage/posts/thumbs/'.$request->image->hashName());
                $this->_createThumbnail($this->thumb,16,16);
            }
            if($post->status !== 2) {
                $request->created_at = date('Y-m-d H:i:s');
            } else {
                $request->created_at = $post->created_at;
            }
            $request->updated_at = date('Y-m-d H:i:s');
    
            $updatePost = $this->_updateToDB($post, $request);
            return response()->json(['message'=>__('posts.updatepost_message')]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyPost(Request $request)
    {
        // Delete post id
        $post = PostModel::find($request->id);    
        $post->status = $request->status;
        $post->save();
        return response()->json(['message'=>__('posts.delete_post_success_message')]);
        // dd($request);
    }

    
    /**
     * Resore the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restorePost(Request $request)
    {
        // Delete post id
        $post = PostModel::find($request->id);    
        $post->status = $request->status;
        $post->save();
        return response()->json(['message'=>__('posts.restore_post_success_message')]);
        // dd($request);
    }

    public function removePost(Request $request) {
        // Delete post id
        $post = PostModel::find($request->id);    
        $post->delete();
        return response()->json(['message'=>__('posts.delete_post_success_message')]);
    }

    public function pageView($url) {
        $data['page'] = 'posts';
        $data['pageData'] = PostModel::where('url',$url)->where('status',2)->firstOrFail()->toArray();
        $data['pageData']['author'] = PostModel::where('url',$url)->where('status',2)->first()->authorId->name;
        $data['pageData']['meta_description'] = (isset($data['pageData']['meta_description']) && $data['pageData']['meta_description'] != null)?$data['pageData']['meta_description']:env('APP_DESCRIPTION');
        $data['pageData']['meta_keywords'] = (isset($data['pageData']['meta_keywords']) && $data['pageData']['meta_keywords'] != null)?$data['pageData']['meta_keywords']:env('APP_TAGS');
        $data['pageData']['category'] = $data['pageData']['category'] == null ? 'Uncategorized':$this->_getCategoryName($data['pageData']['category']);
        $data['pageData']['created_at'] = date('D d M, Y', strtotime($data['pageData']['created_at']));
        $data['pageData']['updated_at'] = date('D d M, Y', strtotime($data['pageData']['updated_at']));
        return view('theme.page',$data);
    }

    private function  _getCategoryName($id) {
        return DB::table('categories')->where('id',$id)->first()->name;
    }
}

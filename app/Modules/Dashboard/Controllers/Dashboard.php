<?php

namespace App\Modules\Dashboard\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

use App\Http\Requests;

use App\Http\Controllers\Controller;

use App\User;
use App\Modules;
use App\Modules\Posts\Models\PostModel;
use App\Modules\Pages\Models\PageModel;
use App\Modules\Comments\Models\CommentsModel;

class Dashboard extends Controller
{
    protected $count;
    protected $data;
    protected $posts;
    protected $pages;
    protected $users;
    protected $comments;
    protected $modules;

    /**
     * Constructor initialized.
     */
    public function __construct(PostModel $post, PageModel $page, CommentsModel $comment, User $user, Modules $module) {
        // Constructor function
        $this->posts = $post;
        $this->users = $user;
        $this->comments = $comment;
        $this->pages = $page;
        $this->modules = $module;
    }

    private function _getData(Model $model, String $module) {
        $this->count = $model::all()->count();
        $this->data = $this->modules->where('module_name', $module)->get()->toArray();
        $this->data = isset($this->data[0])?$this->data[0]:$this->data;
        return ['count'=>$this->count, 'data' => $this->data];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function main()
    {
        //Your code goes here
        $data['modules']['posts'] = $this->_getData($this->posts, 'posts');
        $data['modules']['pages'] = $this->_getData($this->pages, 'pages');
        $data['modules']['users'] = $this->_getData($this->users, 'users');
        $data['modules']['comments'] = $this->_getData($this->comments, 'comments');
        // dd($data);
        return admin_view('Dashboard::Dashboard',$data);
    }

}

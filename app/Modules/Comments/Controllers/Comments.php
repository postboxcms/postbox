<?php

namespace App\Modules\Comments\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Http\Controllers\Controller;

use App\Modules\Comments\Models\CommentsModel;

class Comments extends Controller
{

    /**
     * Constructor initialized.
     */
    public function __construct() {
        // Constructor function
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function main()
    {
        //Your code goes here
        $data['title'] = __('comments.title');
        $data['comments'] = CommentsModel::all();
        return admin_view('Comments::List', $data);
    }
}

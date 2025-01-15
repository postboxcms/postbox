<?php
/*
 * This file is part of the PostboxCMS\DBO package.
 * (c) PostboxCMS <sanket@digitalbit.in>
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace PostboxCMS\DBO\Http\Controllers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Http\Request;
use App\Http\Modules\Framework;

class DBOController extends Framework
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(['message' => 'DBO Controller initialized']);
    }

    public function store(Request $request)
    {
        try {
            $this->validate($request, [
                'alias' => 'required|min:3',
            ]);
            $data = $request->all();
            $data['field'] = $request->input('field');
            $data['alias'] = $request->input('alias');

            return response(['message' => 'DB field added successfully', 'data' => $data],200);
        } catch (\Exception $e) {
            return response(['error' => 'Something went wrong', 400]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            return response(['message' => 'DB field updated successfully'], 200);
        } catch(\Exception $e) {
            return response(['error'=> 'Something went wrong',400]);
        }
    }
            
}
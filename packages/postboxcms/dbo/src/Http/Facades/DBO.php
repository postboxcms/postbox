<?php

namespace PostboxCMS\DBO\Http\Facades;

use Illuminate\Support\Facades\Facade;


class DBO extends Facade
{
    protected static function createColumn()
    {
        // DBO::createColumn(table:'posts',[
        //     column:'category' => [
        //         attribute:'type'=>'string',
        //         attribute:'nullable' => true,
        //         attribute:'default' => false
        //     ]
        // ]);
        return 'dbo';
    }
}
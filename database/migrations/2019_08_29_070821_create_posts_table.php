<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('posts')) {
            Schema::create('posts', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('title');
                $table->string('url');            
                $table->mediumText('summary')->nullable();
                $table->longText('content')->nullable();
                $table->bigInteger('category')->nullable();
                $table->string('image',200)->nullable();
                $table->text('meta_description')->nullable();
                $table->text('meta_keywords')->nullable();
                $table->string('seo_title',100)->nullable();
                $table->tinyInteger('status');            
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}

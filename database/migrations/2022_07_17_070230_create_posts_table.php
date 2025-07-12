<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->index()->default(DB::raw('(uuid())'))->index();
            $table->string('title',100)->nullable()->default(null);
            $table->string('summary',255)->nullable()->default(null);
            $table->string('image',500)->nullable()->default(null);
            $table->longText('content')->nullable()->default(null);
            $table->integer('author')->default(null);
            $table->tinyInteger('status')->default(null);
            $table->timestamps();
        });
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

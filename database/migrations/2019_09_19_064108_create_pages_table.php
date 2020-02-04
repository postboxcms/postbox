<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('pages')) {
            Schema::create('pages', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('title');
                $table->string('url');            
                $table->longText('content')->nullable();
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
        Schema::dropIfExists('pages');
    }
}

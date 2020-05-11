<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $post;
    protected $adminPrefix;
    /**
     * A setUp method to instantiate user variable
     *
     * @return void
     */
    protected function setUp(): void {
        parent::setUp();

        $this->user = factory(\App\User::class)->create();
        $this->post = [
            'title'             =>  'New Post',
            'author'            =>  1,
            'url'               =>  'new-post',
            'summary'           =>  'This is a new post summary',
            'content'           =>  null,
            'category'          =>  null,
            'image'             =>  null,
            'meta_description'  =>  null,
            'meta_keywords'     =>  null,
            'status'            =>  1,
            'created_at'        =>  date('Y-m-d H:i:s'),
            'updated_at'        =>  date('Y-m-d H:i:s'),
            'comments'          =>  0
        ];
        $this->adminPrefix = config('app.admin_prefix');
    }


    // test create post without logging in
    public function testCreatePostWithMiddleware() {
        $response = $this->call('POST',$this->adminPrefix.'/post/store',$this->post);
        $response->assertStatus(302);
        $response->assertRedirect($this->adminPrefix.'/login');
    }

    // test create post by creating a user and logging in
    public function testCreatePost() {
        $response = $this->actingAs($this->user)->json('POST',$this->adminPrefix.'/post/store',$this->post);
        $response->assertStatus(200);
        $response->assertJson(['message'=>__('posts.storepost_message')]);
    }

    // test list posts by asserting a view
    public function testListPost() {
        $response = $this->actingAs($this->user)->get($this->adminPrefix.'/posts');
        $response->assertStatus(200);
    }

    // test update post without a valid id
    public function testUpdatePostWithoutId() {
        $response = $this->actingAs($this->user)->json('POST',$this->adminPrefix.'/post/update',$this->post);
        $response->assertStatus(400);
        $response->assertJson(['error'=>__('posts.updatepost_failed_message')]);
    }

    // test update post with a valid id 
    public function testUpdatePostWithId() {
        $this->actingAs($this->user)->call('POST',$this->adminPrefix.'/post/store',$this->post);
        $this->post['id'] = 1;
        $this->post['title'] = 'New post 2';
        $response = $this->actingAs($this->user)->json('POST',$this->adminPrefix.'/post/update',$this->post);
        $response->assertStatus(200);
        $response->assertJson(['message'=>__('posts.updatepost_message')]);
    }
}

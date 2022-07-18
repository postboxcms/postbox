<?php
// Postbox configuration setup

return [
    'database' => [
        'models' => [
            'posts' => \App\Models\Post::class,
            'pages' => \App\Models\Page::class,
            'users' => \App\Models\User::class
        ]
    ]
];

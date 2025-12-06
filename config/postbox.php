<?php
// Postbox configuration setup
return [
    'theme' => [
        'website' => env('POSTBOX_WEBSITE_THEME', 'blog'),
    ],
    'guarded_fields' => ['id', 'uuid', 'password', 'remember_token', 'email_verified_at']
];

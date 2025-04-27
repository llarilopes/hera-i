<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Mail Driver
    |--------------------------------------------------------------------------
    |
    | Supported: "smtp", "sendmail", "mailgun", "ses", "postmark", "log"
    |
    */
    'driver' => env('MAIL_MAILER', 'smtp'),
    'host' => env('MAIL_HOST'),
    'port' => env('MAIL_PORT'),
    'from' => [
        'address' => env('MAIL_FROM_ADDRESS'),
        'name' => env('MAIL_FROM_NAME'),
    ],
    'encryption' => env('MAIL_ENCRYPTION'),
    'username' => env('MAIL_USERNAME'),
    'password' => env('MAIL_PASSWORD'),
    'sendmail' => '/usr/sbin/sendmail -bs',
];

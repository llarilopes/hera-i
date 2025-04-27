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
    'driver' => env('MAIL_MAILER', 'sendmail'),
    'host' => env('MAIL_HOST', 'localhost'),
    'port' => env('MAIL_PORT', 25),
    'from' => [
        'address' => env('MAIL_FROM_ADDRESS'),
        'name' => env('MAIL_FROM_NAME'),
    ],
    'encryption' => env('MAIL_ENCRYPTION', ''),
    'username' => env('MAIL_USERNAME', ''),
    'password' => env('MAIL_PASSWORD', ''),
    'sendmail' => '/usr/sbin/sendmail -bs',
];

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteVisit extends Model
{
    protected $fillable = [
        "ip_address",
        "user_agent",
        "os",
        "browser",
        "device_type",
        "city",
        "state",
        "is_bot",
        "entry_time",
        "exit_time",
        "device_id",
        "time_spent_seconds",
        "referrer"
    ];
}

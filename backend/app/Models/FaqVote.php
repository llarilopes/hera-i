<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaqVote extends Model
{
    protected $fillable = [
        "faq_question_id",
        "reaction",
        "ip_address",
        "user_agent",
        "device_id"
    ];

    public function question()
    {
        return $this->belongsTo(FaqQuestion::class, "faq_question_id");
    }
}

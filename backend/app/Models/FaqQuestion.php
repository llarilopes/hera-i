<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaqQuestion extends Model
{
    protected $fillable = [
        "question",
        "answer",
        "clicks"
    ];

    public function votes()
    {
        return $this->hasMany(FaqVote::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    /** @use HasFactory<\Database\Factories\FeedbackFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'status',
        'votes',
        'user_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(Comments::class);
    }

    public function votes() {
        return $this->hasMany(Feedback::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    public const REASONS = [
        'spam' => 'Spam',
        'duplicate_feedback' => 'Duplicate Feedback',
        'offensive_content' => 'Offensive Content',
        'harassment' => 'Harassment',
        'misleading_information' => 'Misleading Information',
        'other' => 'Other',
    ];

    public const STATUSES = [
        'pending' => 'Pending',
        'reviewed' => 'Reviewed',
        'resolved' => 'Resolved',
        'dismissed' => 'Dismissed',
    ];

    protected $fillable = [
        'feedback_id',
        'reported_by',
        'reason',
        'details',
        'status'
    ];

    // Relationships
    public function reporter() {
        return $this->belongsTo(User::class, 'reported_by');
    }

    public function feedback() {
        return $this->belongsTo(Feedback::class);
    }

    // Helper Methods
    public function getReasonLabelAttribute(): string
    {
        return self::REASONS[$this->reason] ?? $this->reason;
    }

    public function getStatusLabelAttribute(): string
    {
        return self::STATUSES[$this->status] ?? $this->status;
    }
}

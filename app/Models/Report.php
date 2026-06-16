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

    public const USER_REPORT_REASONS = [
        'spam_or_promotional_activity' => 'Spam or Promotional Activity',
        'harassment_or_bullying' => 'Harassment or Bullying',
        'hate_speech_or_offensive_behavior' => 'Hate Speech or Offensive Behavior',
        'impersonation' => 'Impersonation',
        'misleading_or_fraudulent_activity' => 'Misleading or Fraudulent Activity',
        'repeated_community_guidelines_violations' => 'Repeated Community Guidelines Violations',
        'other' => 'Other',
    ];

    public const USER_REPORT_STATUSES = [
        'pending' => 'Pending',
        'reviewed' => 'Reviewed',
        'action_taken' => 'Action Taken',
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

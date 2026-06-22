<?php

namespace App\Services;

use App\Models\Feedback;
use App\Models\Comments;
use App\Models\FeedbackVote;
use App\Models\User;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FeedbackService
{
    /**
     * Get the main global list of feedbacks with rich user analytics.
     */
    public function getGlobalFeedbacks(
        int $perPage = 10,
        ?bool $isPinned = null,
        ?string $search = null,
        string $sort = 'newest',
        string $status = 'all',
        string $category = 'all',
        ?string $tab = null
    ): LengthAwarePaginator
    {
        $feedbacks = Feedback::with([
                'user' => fn ($query) => $query
                    ->select('id', 'name', 'avatar', 'public_id', 'email')
                    ->withCount('feedbacks', 'comments', 'commentsReceived as total_comments_received')
                    ->withSum('feedbacks as total_votes_received', 'votes'),
                'feedbackVotes.user:id,name,avatar,email',
                'comments.user:id,name,avatar,email',
            ])
            ->withCount('comments')
            ->withExists([
                'feedbackVotes as has_liked' => fn ($query) => $query->where('user_id', Auth::id()),
            ]);

        if ($isPinned !== null) {
            $feedbacks->where('is_pinned', $isPinned);
        }

        if ($search) {
            $feedbacks->where(function ($query) use ($search) {
                // search by title
                $query->where('title', 'like', "%{$search}%")
                // search by user name
                ->orWhereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
                });
            });
        }

        // Status
        if ($status !== 'all') {
            $feedbacks->where('status', $status);
        }

        // Sorting
        if ($sort === 'oldest') {
            $feedbacks->oldest();
        } else {
            $feedbacks->latest();
        }

        // Category
        if ($category !== 'all') {
            $feedbacks->where('category', $category);
        }

        $feedbacks = $feedbacks->latest()->paginate($perPage);

        // Keep query string for pagination
        $queryParams = [];
        if ($search) $queryParams['search'] = $search;
        if ($sort !== 'newest') $queryParams['sort'] = $sort;
        if ($status !== 'all') $queryParams['status'] = $status;
        if ($category !== 'all') $queryParams['category'] = $category;
        if ($tab) $queryParams['tab'] = $tab;

        if (!empty($queryParams)) {
            $feedbacks->appends($queryParams);
        }

        $this->normalizeAvatarUrls($feedbacks);

        return $feedbacks;
    }
    /**
     * Get a list of feedbacks filtered strictly by a specific user ID.
     */
    public function getUserFeedbacks(int $userId, int $perPage = 10): LengthAwarePaginator
    {
        $feedbacks = Feedback::with('user:id,name,avatar,email')
            ->withCount('comments')
            ->withExists([
                'feedbackVotes as has_liked' => fn ($query) => $query->where('user_id', Auth::id()),
            ])
            ->with('comments.user:id,name,avatar,email')
            ->with('feedbackVotes.user:id,name,avatar,email')
            ->where('user_id', $userId)
            ->latest()
            ->paginate($perPage);

        $this->normalizeAvatarUrls($feedbacks);

        return $feedbacks;
    }

    /**
     * Get paginated comments for a specific user.
     */
    public function getUserComments(int $userId, int $perPage = 10): LengthAwarePaginator
    {
        return Comments::with([
                'feedback:id,title,status',
                'user:id,name,avatar,email',
            ])
            ->where('user_id', $userId)
            ->latest()
            ->paginate($perPage)
            ->through(function ($comment) {
                $this->normalizeUserAvatar($comment->user);
                return $comment;
            });
    }

    /**
     * Get paginated votes for a specific user.
     */
    public function getUserVotes(int $userId, int $perPage = 10): LengthAwarePaginator
    {
        return FeedbackVote::with([
                'feedback:id,title,user_id,status',
                'feedback.user:id,name,avatar,email,created_at',
                'user:id,name,avatar,email'
            ])
            ->where('user_id', $userId)
            ->latest()
            ->paginate($perPage)
            ->through(function ($vote) {
                $this->normalizeUserAvatar($vote->user);
                if ($vote->feedback && $vote->feedback->user) {
                    $this->normalizeUserAvatar($vote->feedback->user);
                }
                return $vote;
            });
    }

    /**
     * Get complete user activity profile data.
     */
    public function getUserActivityProfile(User $user, int $perPage = 10): array
    {
        $this->normalizeUserAvatar($user);

        return [
            'user' => $user->only(['id', 'name', 'email', 'public_id', 'avatar', 'created_at']),
            'feedbacks' => $this->getUserFeedbacks($user->id, $perPage),
            'comments' => $this->getUserComments($user->id, $perPage),
            'votes' => $this->getUserVotes($user->id, $perPage),
            'activityCounts' => [
                'feedbacks' => $user->feedbacks()->count(),
                'comments' => $user->comments()->count(),
                'votes' => FeedbackVote::where('user_id', $user->id)->count(),
            ],
            'activeTab' => request('tab', 'feedbacks'),
        ];
    }

    /**
     * Get profile metrics aggregation for a specific user.
     */
    public function getUserStats(int $userId): array
    {
        $stats = User::query()
            ->whereKey($userId)
            ->withCount([
                'feedbacks',
                'comments',
                'commentsReceived as total_comments_received',
                'feedbacks as completed_feedbacks_count' => fn ($query) => $query->where('status', 'completed'),
            ])
            ->withSum('feedbacks as total_votes_received', 'votes')
            ->first();

        return [
            'feedbacks_count' => $stats?->feedbacks_count ?? 0,
            'total_votes_received' => $stats?->total_votes_received ?? 0,
            'completed_feedbacks_count' => $stats?->completed_feedbacks_count ?? 0,
            'comments_count' => $stats?->comments_count ?? 0,
            'total_comments_received' => $stats?->total_comments_received ?? 0,
        ];
    }

    public function storingReportedFeedback(int $feedbackId, string $reason, ?string $details = null, int $reportedBy): Report
    {
        return Report::create([
            'feedback_id' => $feedbackId,
            'reported_by' => $reportedBy,
            'reason' => $reason,
            'details' => $details,
            'status' => 'pending',
        ]);
    }

    public function storingReportedUser(int $reportedUserId, string $reason, ?string $details = null, int $reportedBy): Report
    {
        return Report::create([
            'reported_user_id' => $reportedUserId,
            'reported_by' => $reportedBy,
            'reason' => $reason,
            'details' => $details,
            'status' => 'pending',
        ]);
    }

    /**
     * Normalizes all avatar URLs inside a paginated feedback collection.
     */
    private function normalizeAvatarUrls($feedbacks): void
    {
        $feedbacks->getCollection()->each(function ($feedback) {
            $this->normalizeUserAvatar($feedback->user);

            $feedback->comments->each(function ($comment) {
                $this->normalizeUserAvatar($comment->user);
            });

            $feedback->feedbackVotes->each(function ($vote) {
                $this->normalizeUserAvatar($vote->user);
            });
        });
    }

    /**
     * Helper to append storage URL to a single user's avatar string.
     */
    private function normalizeUserAvatar($user): void
    {
        if (!$user || !$user->avatar || str_starts_with($user->avatar, '/storage/') || str_starts_with($user->avatar, 'http')) {
            return;
        }

        $user->setAttribute('avatar', Storage::url($user->avatar));
    }
}

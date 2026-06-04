<?php

namespace App\Services;

use App\Models\Feedback;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FeedbackService
{
    /**
     * Get the main global list of feedbacks with rich user analytics.
     */
    public function getGlobalFeedbacks(int $perPage = 10): LengthAwarePaginator
    {
        $feedbacks = Feedback::with([
                'user' => fn ($query) => $query
                    ->select('id', 'name', 'avatar')
                    ->withCount('feedbacks', 'comments', 'commentsReceived as total_comments_received')
                    ->withSum('feedbacks as total_votes_received', 'votes')
            ])
            ->withCount('comments')
            ->withExists([
                'feedbackVotes as has_liked' => fn ($query) => $query->where('user_id', Auth::id()),
            ])
            ->with('comments.user:id,name,avatar')
            ->latest()
            ->paginate($perPage);

        $this->normalizeAvatarUrls($feedbacks);

        return $feedbacks;
    }

    /**
     * Get a list of feedbacks filtered strictly by a specific user ID.
     * Fits perfectly for profile pages, user posts, or external profiles.
     */
    public function getUserFeedbacks(int $userId, int $perPage = 10): LengthAwarePaginator
    {
        $feedbacks = Feedback::with('user:id,name,avatar')
            ->withCount('comments')
            ->withExists([
                'feedbackVotes as has_liked' => fn ($query) => $query->where('user_id', Auth::id()),
            ])
            ->with('comments.user:id,name,avatar')
            ->where('user_id', $userId)
            ->latest()
            ->paginate($perPage);

        $this->normalizeAvatarUrls($feedbacks);

        return $feedbacks;
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

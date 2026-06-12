<?php

namespace App\Services;

use App\Models\Report;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use LengthException;

class AdminRelatedService
{
    /**
     * Create a new class instance.
     */
    public function getUsers(int $perPage = 10): LengthAwarePaginator
    {
        $users = User::select('id', 'name', 'email', 'public_id', 'avatar', 'is_admin', 'created_at')
            ->with([
                'feedbacks' => function ($query) {
                    $query
                        ->select('id', 'user_id', 'title', 'description','category', 'status', 'votes', 'created_at')
                        ->withCount('comments')
                        ->latest()
                        ->limit(5);
                },
            ])

            ->withCount([
                'feedbacks',
                'comments',
                'commentsReceived as comments_received_count',
                'feedbacks as completed_feedbacks_count' => function ($query) {
                    $query->where('status', 'completed');
                },
            ])

            ->withSum('feedbacks as total_votes_received', 'votes')
            ->latest()
            ->paginate($perPage);

        $users->getCollection()->transform(function ($user) {
            if (
                $user->avatar &&
                !str_starts_with($user->avatar, '/storage/') &&
                !str_starts_with($user->avatar, 'http')
            ) {
                $user->avatar = Storage::url($user->avatar);
            }

            return $user;
        });

        return $users;
    }

    public function getLeaderboardUsers(int $perPage = 10): LengthAwarePaginator
    {
        $users = User::select('id', 'name', 'email', 'public_id', 'avatar', 'is_admin', 'created_at')
            ->with([
                'feedbacks' => function ($query) {
                    $query
                        ->select('id', 'user_id', 'title', 'description','category', 'status', 'votes', 'created_at')
                        ->withCount('comments')
                        ->latest()
                        ->limit(5);
                },
            ])
            ->withCount([
                'feedbacks',
                'comments',
                'commentsReceived as comments_received_count',
            ])
            ->withSum('feedbacks as total_votes_received', 'votes')
            ->orderByDesc('total_votes_received')
            ->paginate($perPage);

        $this->normalizeAvatars($users);

        return $users;
    }

    public function getReportedFeedbacks(int $perPage = 10): LengthAwarePaginator
    {
        $reports = Report::with([
            'reporter:id,name,avatar,email',
            'feedback:id,title'
        ])
        ->latest()
        ->paginate(10);

        $this->normalizeAvatars($reports);

        return $reports;
    }

    private function normalizeAvatars($users): void
    {
        $users->getCollection()->transform(function ($item) {
            if (
                isset($item->avatar) &&
                $item->avatar &&
                !str_starts_with($item->avatar, '/storage/') &&
                !str_starts_with($item->avatar, 'http')
            ) {
                $item->avatar = Storage::url($item->avatar);
            }

            if (
                isset($item->reporter) &&
                $item->reporter &&
                isset($item->reporter->avatar) &&
                $item->reporter->avatar &&
                !str_starts_with($item->reporter->avatar, '/storage/') &&
                !str_starts_with($item->reporter->avatar, 'http')
            ) {
                $item->reporter->avatar = Storage::url($item->reporter->avatar);
            }

            return $item;
        });
    }
}

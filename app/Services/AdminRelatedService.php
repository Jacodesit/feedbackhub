<?php

namespace App\Services;

use App\Models\Comments;
use App\Models\Feedback;
use App\Models\Report;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use LengthException;

class AdminRelatedService
{
    public function getDashboardData(): array
    {
        return [
            'recentFeedbacks' => $this->getRecentFeedbacks(),
            'topFeedbacks' => $this->getTopFeedbacks(),
            'recentUsers' => $this->getRecentUsers(),
            'categories' => $this->getCategories(),
            'stats' => $this->getStats(),
        ];
    }

    protected function getStats(): array
    {
        return [
            'totalFeedbacks' => Feedback::count(),
            'totalUsers' => User::count(),
            'totalComments' => Comments::count(),
            'pendingFeedbacks' => Feedback::where('status', 'open')->count(),
        ];
    }
    protected function getRecentFeedbacks()
    {
        $feedbacks = Feedback::with([
            'user' => fn ($query) => $query->select('id', 'name', 'avatar')
        ])
        ->latest()
        ->take(4)
        ->get();

        $this->transformAvatars($feedbacks);

        return $feedbacks;
    }

    protected function getTopFeedbacks()
    {
        $feedbacks = Feedback::with([
            'user' => fn ($query) => $query->select('id', 'name', 'avatar')
        ])
        ->orderByDesc('votes')
        ->take(4)
        ->get();

        $this->transformAvatars($feedbacks);

        return $feedbacks;
    }

    protected function getRecentUsers()
    {
        $users = User::select('id', 'name', 'avatar', 'created_at')
            ->latest()
            ->take(4)
            ->get();

        $this->transformUserAvatars($users);

        return $users;
    }

    protected function getCategories(): array
    {
        return ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'];
    }

    protected function transformAvatars($items): void
    {
        $items->each(function ($item) {
            $user = $item->user;

            if (!$user || !$user->avatar || $this->isFullUrl($user->avatar)) {
                return;
            }

            $user->setAttribute('avatar', Storage::url($user->avatar));
        });
    }

    protected function transformUserAvatars($users): void
    {
        $users->each(function ($user) {
            if (!$user->avatar || $this->isFullUrl($user->avatar)) {
                return;
            }

            $user->setAttribute('avatar', Storage::url($user->avatar));
        });
    }

    protected function isFullUrl(string $avatar): bool
    {
        return str_starts_with($avatar, '/storage/') ||
               str_starts_with($avatar, 'http');
    }
    /**
     * Create a new class instance.
     */
    public function getUsers(int $perPage = 10, ?string $search = null, string $sort = 'newest', string $role = 'all'): LengthAwarePaginator
    {
        $users = User::select('id', 'name', 'email', 'public_id', 'avatar', 'is_admin', 'created_at')
            ->with([
                'feedbacks' => function ($query) {
                    $query->select('id', 'user_id', 'title', 'description', 'category', 'status', 'votes', 'created_at')
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
            ->withSum('feedbacks as total_votes_received', 'votes');

        if ($search) {
            $users->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('public_id', 'like', "%{$search}%");
            });
        }

        if ($sort === 'oldest') {
            $users->oldest();
        } else {
            $users->latest();
        }

        if ($role !== 'all') {
            $users->where('is_admin', $role === 'admin');
        }

        $users = $users->paginate($perPage);

        $queryParams = [];
        if ($search) $queryParams['search'] = $search;
        if ($sort !== 'newest') $queryParams['sort'] = $sort;
        if ($role !== 'all') $queryParams['role'] = $role;

        if (!empty($queryParams)) {
            $users->appends($queryParams);
        }

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

    public function getReportedFeedbacks(int $perPage = 10, ?string $search = null, string $sort = 'newest', string $reason = 'all', string $status = 'all'): LengthAwarePaginator
    {
        $reports = Report::with([
            'reporter:id,name,avatar,email,public_id',
            'feedback' => function ($query) {
                $query
                    ->select('id', 'user_id', 'title', 'description', 'votes')
                    ->withCount('comments');
            },
            'feedback.user:id,name,avatar,email,created_at',
            'feedback.feedbackVotes.user:id,name,avatar,email',
            'feedback.comments.user:id,name,avatar,email',
        ]);

        if ($search) {
            $reports->where(function ($query) use ($search) {
                $query->whereHas('reporter', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('public_id', 'like', "%{$search}%");
                })
                ->orWhereHas('feedback', function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%");
                });
            });
        }

        if ($sort === 'oldest') {
            $reports->oldest();
        } else {
            $reports->latest();
        }

        if ($reason !== 'all') {
            $reports->where('reason', $reason);
        }

        if ($status !== 'all') {
            $reports->where('status', $status);
        }

        $reports = $reports->latest()->paginate($perPage);

        $queryParams = [];
        if ($search) $queryParams['search'] = $search;
        if ($sort !== 'newest') $queryParams['sort'] = $sort;
        if ($reason !== 'all') $queryParams['reason'] = $reason;
        if ($status !== 'all') $queryParams['status'] = $status;

        if (!empty($queryParams)) {
            $reports->appends($queryParams);
        }

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

            if (isset($item->feedback) && $item->feedback) {
                $this->normalizeUserAvatar($item->feedback->user);

                $item->feedback->comments->each(function ($comment) {
                    $this->normalizeUserAvatar($comment->user);
                });

                $item->feedback->feedbackVotes->each(function ($vote) {
                    $this->normalizeUserAvatar($vote->user);
                });
            }

            return $item;
        });
    }

    private function normalizeUserAvatar($user): void
    {
        if (
            !$user ||
            !$user->avatar ||
            str_starts_with($user->avatar, '/storage/') ||
            str_starts_with($user->avatar, 'http')
        ) {
            return;
        }

        $user->avatar = Storage::url($user->avatar);
    }
}

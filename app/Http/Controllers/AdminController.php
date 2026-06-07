<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\FeedbackVote;
use App\Models\User;
use App\Services\AdminRelatedService;
use Illuminate\Http\Request;
use App\Services\FeedbackService;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function forDashboard() {
        $recentFeedbacks = Feedback::with([
            'user' => fn ($query) => $query
                ->select('id', 'name', 'avatar')
            ])

        ->latest()
        ->take(4)
        ->get();

        $topFeedbacks = Feedback::with([
            'user' => fn ($query) => $query
                ->select('id', 'name', 'avatar')
            ])

        ->orderByDesc('votes')
        ->take(4)
        ->get();

        $recentUsers = User::select('id', 'name', 'avatar', 'created_at')
        ->latest()
        ->take(4)
        ->get();

        $recentFeedbacks->each(function ($feedback) {
            $user = $feedback->user;

            if (!$user || !$user->avatar || str_starts_with($user->avatar, '/storage/') || str_starts_with($user->avatar, 'http')) {
                return;
            }

            $user->setAttribute('avatar', Storage::url($user->avatar));
        });

        $topFeedbacks->each(function ($feedback) {
            $user = $feedback->user;

            if (!$user || !$user->avatar || str_starts_with($user->avatar, '/storage/') || str_starts_with($user->avatar, 'http')) {
                return;
            }

            $user->setAttribute('avatar', Storage::url($user->avatar));
        });

        $recentUsers->each(function ($user) {
            if (!$user || !$user->avatar || str_starts_with($user->avatar, '/storage/') || str_starts_with($user->avatar, 'http')) {
                return;
            }

            $user->setAttribute('avatar', Storage::url($user->avatar));
        });

        return Inertia::render('authpage/admin/pages/dashboard/page', [
            'recentFeedbacks' => $recentFeedbacks,
            'topFeedbacks' => $topFeedbacks,
            'recentUsers' => $recentUsers,
            'categories' => ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'],
        ]);
    }

    public function index(FeedbackService $feedbackService)
    {
        return Inertia::render('authpage/admin/pages/feedbacks/page', [
            'feedbacks' => $feedbackService->getGlobalFeedbacks(10),
            'categories' => ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'],
        ]);
    }

    public function users(AdminRelatedService $adminRelatedService)
    {
        return Inertia::render('authpage/admin/pages/users/page', [
            'users' => $adminRelatedService->getUsers(10)
        ]);
    }

    public function userFeedbacks(User $user, FeedbackService $feedbackService)
    {
        $stats = User::query()
            ->whereKey($user->id)
            ->withCount(['feedbacks', 'comments'])
            ->first();

        return Inertia::render('authpage/admin/pages/users/components/activity', [
            'user' => $user->only(['id', 'name', 'email', 'public_id', 'avatar', 'created_at']),
            'feedbacks' => $feedbackService->getUserFeedbacks($user->id, 10),
            'activityCounts' => [
                'feedbacks' => $stats?->feedbacks_count ?? 0,
                'comments' => $stats?->comments_count ?? 0,
                'votes' => FeedbackVote::where('user_id', $user->id)->count(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

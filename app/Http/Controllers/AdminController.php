<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\FeedbackVote;
use App\Models\Comments;
use App\Models\Report;
use App\Models\User;
use App\Services\AdminRelatedService;
use Illuminate\Http\Request;
use App\Services\FeedbackService;
use Illuminate\Support\Facades\Log;
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

    public function index(Request $request, FeedbackService $feedbackService)
    {
        $tab = $request->query('tab', 'feedback');
        $reasons = Report::REASONS;

        return Inertia::render('authpage/admin/pages/feedbacks/page', [
            'feedbacks' => $feedbackService->getGlobalFeedbacks(10),
            'pinnedFeedbacks' => $feedbackService->getGlobalFeedbacks(10, true),
            'categories' => ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'],
            'tab' => $tab,
            'reasons' => $reasons
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
        return Inertia::render('authpage/admin/pages/users/components/activity',
            $feedbackService->getUserActivityProfile($user, 10)
        );
    }

    public function userLeaderboardData(AdminRelatedService $adminRelatedService)
    {
        return Inertia::render('authpage/admin/pages/leaderboard/page', [
            'users' => $adminRelatedService->getLeaderboardUsers(10)
        ]);
    }

    public function getReportedFeedbacks(AdminRelatedService $adminRelatedService) {
        return Inertia::render('authpage/admin/pages/reports/page', [
            'reports' => $adminRelatedService->getReportedFeedbacks(10)
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

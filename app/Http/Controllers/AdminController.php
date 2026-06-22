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
    public function forDashboard(AdminRelatedService $dashboardService)
    {
        $dashboardData = $dashboardService->getDashboardData();
        return Inertia::render('authpage/admin/pages/dashboard/page', $dashboardData);
    }

    public function index(Request $request, FeedbackService $feedbackService)
    {
        $tab = $request->query('tab', 'feedback');
        $search = $request->query('search');
        $sort = $request->query('sort', 'newest');
        $status = $request->query('status', 'all');
        $category = $request->query('category', 'all');
        $reasons = Report::REASONS;

        return Inertia::render('authpage/admin/pages/feedbacks/page', [
            'feedbacks' => $feedbackService->getGlobalFeedbacks(
                perPage: 10,
                sort: $sort,
                search: $search,
                status: $status,
                category: $category,
                tab: $tab
            ),
            'pinnedFeedbacks' => $feedbackService->getGlobalFeedbacks(
                perPage: 10,
                isPinned: true,
                sort: $sort,
                search: $search,
                status: $status,
                category: $category,
                tab: $tab
            ),
            'categories' => ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'],
            'tab' => $tab,
            'reasons' => $reasons,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'status' => $status,
                'category' => $category,
            ],
        ]);
    }

    public function users(AdminRelatedService $adminRelatedService, Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'newest');
        $role = $request->query('role', 'all');

        return Inertia::render('authpage/admin/pages/users/page', [
            'users' => $adminRelatedService->getUsers(10, $search, $sort, $role),
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'role' => $role
            ],
        ]);
    }

    public function userFeedbacks(User $user, FeedbackService $feedbackService)
    {
        return Inertia::render('authpage/admin/pages/users/components/activity',
            $feedbackService->getUserActivityProfile($user, 10)
        );
    }

    public function userLeaderboardData(AdminRelatedService $adminRelatedService, FeedbackService $feedbackService)
    {
        return Inertia::render('authpage/admin/pages/leaderboard/page', [
            'users' => $adminRelatedService->getLeaderboardUsers(10),
        ]);
    }

    public function getReportedFeedbacks(AdminRelatedService $adminRelatedService, Request $request) {
        $tab = $request->query('tab', 'feedback');
        $search = $request->query('search');
        $sort = $request->query('sort', 'newest');
        $reason = $request->query('reason', 'all');
        $status = $request->query('status', 'all');

        return Inertia::render('authpage/admin/pages/reports/page', [
            'reports' => $adminRelatedService->getReportedFeedbacks(10, $search, $sort, $reason, $status),
            'userReports' => $adminRelatedService->getReportedUsers(10, $search, $sort, $reason, $status),
            'tab' => $tab,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'reason' => $reason,
                'status' => $status,
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

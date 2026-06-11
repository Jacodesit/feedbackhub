<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\User;
use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Requests\UpdateFeedbackRequest;
use App\Services\FeedbackService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function __construct(
        protected FeedbackService $feedbackService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('authpage/feedback/feedback', [
            'feedbacks' => $this->feedbackService->getGlobalFeedbacks(10),
            'categories' => ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeedbackRequest $request)
    {
        if (!Auth::check()) {
            return back()->withErrors(['auth' => 'Authentication required']);
        }

        Feedback::create([
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'user_id' => Auth::id(),
            'votes' => 0,
            'status' => 'open',
        ]);

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedbackRequest $request, Feedback $feedback)
    {
        $feedback->update([
            'title' => $request->input('title', $feedback->title),
            'category' => $request->input('category', $feedback->category),
            'description' => $request->input('description', $feedback->description),
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $feedback)
    {
        $feedback->delete();
        return back();
    }

    /**
     * Display profile page data for the logged-in user.
     */
    public function forProfile()
    {
        $userId = Auth::id();

        return Inertia::render('authpage/profile/profile', [
            'feedbacks' => $this->feedbackService->getUserFeedbacks($userId, 5),
            'stats' => $this->feedbackService->getUserStats($userId),
            'categories' => ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'],
        ]);
    }

    /**
     * Display management list of posts for the logged-in user.
     */
    public function forPost()
    {
        return Inertia::render('authpage/post/post', [
            'feedbacks' => $this->feedbackService->getUserFeedbacks(Auth::id(), 10),
            'categories' => ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'],
        ]);
    }

    /**
     * Return JSON data for an external user profile view.
     */
    public function forUser(User $user)
    {
        $feedbacks = $this->feedbackService->getUserFeedbacks($user->id, 3);
        return response()->json($feedbacks);
    }

    public function togglePin(Feedback $feedback, Request $request)
    {
        $request->validate([
            'is_pinned' => 'required|boolean',
        ]);

        $feedback->update([
            'is_pinned' => $request->is_pinned,
        ]);

        return back();
    }
}

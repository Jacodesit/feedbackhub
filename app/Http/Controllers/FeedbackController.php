<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Requests\UpdateFeedbackRequest;
use App\Models\Comments;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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
            ->paginate(10);
        $this->normalizeAvatarUrls($feedbacks);

        return Inertia::render('authpage/feedback/feedback', [
            'feedbacks' => $feedbacks,
            'categories' => ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeedbackRequest $request)
    {
        if (!Auth::check()) {
            return back()->withErrors([
                'auth' => 'Authentication required'
            ]);
        }

        $feedback = Feedback::create([
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
     * Display the specified resource.
     */
    public function show(Feedback $feedback)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feedback $feedback)
    {
        //
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

    public function forProfile() {
        $stats = User::query()
            ->whereKey(Auth::id())
            ->withCount([
                'feedbacks',
                'comments',
                'commentsReceived as total_comments_received',
                'feedbacks as completed_feedbacks_count' => fn ($query) => $query->where('status', 'completed'),
            ])
            ->withSum('feedbacks as total_votes_received', 'votes')
            ->first();

        $feedbacks = Feedback::with('user')
            ->withCount('comments')
            ->withExists([
                'feedbackVotes as has_liked' => fn ($query) => $query->where('user_id', Auth::id()),
            ])
            ->with('comments.user:id,name,avatar')
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(5);
        $this->normalizeAvatarUrls($feedbacks);

        return Inertia::render('authpage/profile/profile', [
            'feedbacks' => $feedbacks,
            'stats' => [
                'feedbacks_count' => $stats?->feedbacks_count ?? 0,
                'total_votes_received' => $stats?->total_votes_received ?? 0,
                'completed_feedbacks_count' => $stats?->completed_feedbacks_count ?? 0,
                'comments_count' => $stats?->comments_count ?? 0,
                'total_comments_received' => $stats?->total_comments_received ?? 0,
            ],
            'categories' => ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'],
        ]);
    }

    public function forPost() {
        $feedbacks = Feedback::with('user')
            ->withCount('comments')
            ->withExists([
                'feedbackVotes as has_liked' => fn ($query) => $query->where('user_id', Auth::id()),
            ])
            ->with('comments.user:id,name,avatar')
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(10);
        $this->normalizeAvatarUrls($feedbacks);

        return Inertia::render('authpage/post/post', [
            'feedbacks' => $feedbacks,
            'categories' => ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'],
        ]);
    }

    public function forUser(User $user) {
        $feedbacks = Feedback::with('user:id,name,avatar')
            ->withCount('comments')
            ->withExists([
                'feedbackVotes as has_liked' => fn ($query) => $query->where('user_id', Auth::id()),
            ])
            ->with('comments.user:id,name,avatar')
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(3);
        $this->normalizeAvatarUrls($feedbacks);

        return response()->json($feedbacks);
    }

    private function normalizeAvatarUrls($feedbacks): void
    {
        $feedbacks->getCollection()->each(function ($feedback) {
            $this->normalizeUserAvatar($feedback->user);

            $feedback->comments->each(function ($comment) {
                $this->normalizeUserAvatar($comment->user);
            });
        });
    }

    private function normalizeUserAvatar($user): void
    {
        if (!$user || !$user->avatar || str_starts_with($user->avatar, '/storage/') || str_starts_with($user->avatar, 'http')) {
            return;
        }

        $user->setAttribute('avatar', Storage::url($user->avatar));
    }


}

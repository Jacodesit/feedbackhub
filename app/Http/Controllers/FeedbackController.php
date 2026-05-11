<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Requests\UpdateFeedbackRequest;
use App\Models\Comments;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $feedbacks = Feedback::with('user:id,name')->withCount('comments')->latest()->get();

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
        $feedback = Feedback::create([
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'user_id' => Auth::id(),
            'votes' => 0,
            'status' => 'open',
        ]);

        return redirect('/feedback');
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $feedback)
    {
        //
    }

    public function userFeedback() {
        $feedbacks = Feedback::with('user')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('authpage/profile/components/sections/feedbacks', [
            'feedbacks' => $feedbacks
        ]);
    }
}

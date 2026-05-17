<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\FeedbackVote;
use App\Models\Votes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VotesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Feedback $feedback)
    {
        if (!Auth::check()) {
            return back()->withErrors([
                'auth' => 'Authentication required'
            ]);
        }

        $vote = FeedbackVote::where('user_id', Auth::id())
            ->where('feedback_id', $feedback->id)
            ->first();

        if ($vote) {
            $vote->delete();

            $feedback->decrement('votes');
        } else {
            FeedbackVote::create([
                'user_id' => Auth::id(),
                'feedback_id' => $feedback->id,
            ]);

            $feedback->increment('votes');
        }

        return back();
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

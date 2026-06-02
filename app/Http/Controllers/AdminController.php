<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recentFeedbacks = Feedback::with([
            'user' => fn ($query) => $query
                ->select('id', 'name', 'avatar')
            ])

        ->latest()
        ->take(5)
        ->get();

        $recentFeedbacks->each(function ($feedback) {
            $user = $feedback->user;

            if (!$user || !$user->avatar || str_starts_with($user->avatar, '/storage/') || str_starts_with($user->avatar, 'http')) {
                return;
            }

            $user->setAttribute('avatar', Storage::url($user->avatar));
        });

        return Inertia::render('authpage/admin/pages/dashboard/page', [
            'recentFeedbacks' => $recentFeedbacks,
            'categories' => ['feature_request', 'bug_report', 'ui_ux', 'performance', 'other'],
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

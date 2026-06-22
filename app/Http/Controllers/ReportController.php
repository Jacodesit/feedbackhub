<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\StoreUserReportRequest;
use App\Models\Feedback;
use App\Models\Report;
use App\Models\UserReport;
use App\Services\FeedbackService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ReportController extends Controller
{
    public function __construct(
        protected FeedbackService $feedbackService
    ) {}

    /**
     * Store a newly created report in storage.
     */
    public function store(StoreReportRequest $request)
    {
        if (!Auth::check()) {
            return back()->with('error', 'You must be logged in to report.');
        }

        try {
            $existingReport = Report::where('feedback_id', $request->feedback_id)
                ->where('reported_by', Auth::id())
                ->first();

            if ($existingReport) {
                return back()->with('error', 'You have already reported this feedback.');
            }

            $feedback = Feedback::findOrFail($request->feedback_id);
            if ($feedback->user_id === Auth::id()) {
                return back()->with('error', 'You cannot report your own feedback.');
            }

            $report = Report::create([
                'feedback_id' => $request->feedback_id,
                'reported_by' => Auth::id(),
                'reason' => $request->reason,
                'details' => $request->details,
                'status' => 'pending'
            ]);

            Log::info('Report created successfully', [
                'report_id' => $report->id,
                'feedback_id' => $request->feedback_id,
                'reported_by' => Auth::id()
            ]);

            return back()->with('success', 'Report submitted successfully.');

        } catch (\Exception $e) {
            Log::error('Failed to create report', [
                'error' => $e->getMessage(),
                'feedback_id' => $request->feedback_id,
                'reported_by' => Auth::id()
            ]);

            return back()
                ->with('error', 'Failed to submit report. Please try again.')
                ->withInput();
        }
    }

    public function reportUser(StoreUserReportRequest $request) {
        if (!Auth::check()) {
            return back()->with('error', 'You must be logged in to report.');
        }

        try {
            if ((int) $request->user_id === Auth::id()) {
                return back()->with('error', 'You cannot report yourself.');
            }

            $existingReport = UserReport::where('user_id', $request->user_id)
                ->where('reported_by', Auth::id())
                ->first();

            if ($existingReport) {
                return back()->with('error', 'You have already reported this user.');
            }

            $report = UserReport::create([
                'user_id' => $request->user_id,
                'reported_by' => Auth::id(),
                'reason' => $request->reason,
                'status' => 'pending',
            ]);

            Log::info('User report created successfully', [
                'report_id' => $report->id,
                'user_id' => $request->user_id,
                'reported_by' => Auth::id(),
            ]);

            return back()->with('success', 'User report submitted successfully.');

        } catch (\Exception $e) {
            Log::error('Failed to create user report', [
                'error' => $e->getMessage(),
                'reported_user_id' => $request->user_id,
                'user_id' => Auth::id()
            ]);

            return back()
                ->with('error', 'Failed to submit user report. Please try again.')
                ->withInput();
        }
    }
}

<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\FeedbackController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::resource('feedbacks', FeedbackController::class)->except('index');
Route::resource('feedbacks.comments', CommentsController::class);

Route::get('/', fn() => Inertia::render('landingpage/page'))->name('index');
Route::get('/login', fn() => Inertia::render('auth/login'));
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback.index');
    Route::get('/my-posts', [FeedbackController::class, 'forPost'])->name('my-posts.index');
    Route::get('/profile', [FeedbackController::class, 'forProfile'])->name('profile.index');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

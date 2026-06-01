<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\VotesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::resource('feedbacks', FeedbackController::class)->except('index');
Route::resource('feedbacks.comments', CommentsController::class);
Route::resource('feedbacks.votes', VotesController::class);

Route::get('/', fn() => Inertia::render('landingpage/page'))->name('index');

Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback.index');
Route::get('/users/{user}/feedbacks', [FeedbackController::class, 'forUser'])->name('users.feedbacks.index');

Route::get('/login', fn() => Inertia::render('auth/login'));
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::get('/admin', fn() => Inertia::render('admin/page', [
    'canResetPassword' => Route::has('password.request'),
    'status' => session('status'),
]))->name('admin.login');
Route::post('/admin', [AuthenticatedSessionController::class, 'adminStore'])->name('admin.login.store');

Route::middleware('auth')->group(function () {
    Route::get('/my-posts', [FeedbackController::class, 'forPost'])->name('my-posts.index');
    Route::get('/profile', [FeedbackController::class, 'forProfile'])->name('profile.index');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

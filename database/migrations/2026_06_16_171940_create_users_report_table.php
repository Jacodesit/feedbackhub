<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users_report', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('reported_by')->constrained('users')->cascadeOnDelete();
            $table->enum('reason', [
                'spam_or_promotional_activity',
                'harassment_or_bullying',
                'hate_speech_or_offensive_behavior',
                'impersonation',
                'misleading_or_fraudulent_activity',
                'repeated_community_guidelines_violations',
                'other'
            ]);
            $table->enum('status', [
                'pending',
                'reviewed',
                'resolved',
                'dismissed'
            ])->default('pending');
            $table->unique([
                'user_id',
                'reported_by',
            ]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_report');
    }
};

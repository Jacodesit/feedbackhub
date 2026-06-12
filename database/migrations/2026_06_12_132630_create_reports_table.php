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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('feedback_id')->constrained()->cascadeOnDelete();
            $table->foreignId('reported_by')->constrained('users')->cascadeOnDelete();
            $table->text('details')->nullable();
            $table->enum('reason', [
                'spam',
                'duplicate_feedback',
                'offensive_content',
                'harassment',
                'misleading_information',
                'other'
            ]);
            $table->enum('status', [
                'pending',
                'reviewed',
                'resolved',
                'dismissed'
            ])->default('pending');
            $table->unique([
                'feedback_id',
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
        Schema::dropIfExists('reports');
    }
};

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
        Schema::table('users', function (Blueprint $table) {
            $table->string('public_id')->unique()->nullable(false)->change();
        });

        $users = \App\Models\User::all();
        foreach ($users as $user) {
            $user->public_id = 'FBH' . str_pad($user->id, 5, '0', STR_PAD_LEFT) . rand(100, 999);
            $user->save();
        }

        Schema::table('users', function (Blueprint $table) {
            $table->string('public_id')->unique()->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};

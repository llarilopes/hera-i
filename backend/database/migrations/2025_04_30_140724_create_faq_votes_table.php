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
        Schema::create("faq_votes", function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("faq_question_id");
            $table->string("reaction"); // "like" ou "dislike"
            $table->ipAddress("ip_address");
            $table->string("user_agent");
            $table->string("device_id")->nullable();
            $table->timestamps();

            $table->foreign("faq_question_id")->references("id")->on("faq_questions")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("faq_votes");
    }
};

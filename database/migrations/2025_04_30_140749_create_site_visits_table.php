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
        Schema::create("site_visits", function (Blueprint $table) {
            $table->id();
            $table->ipAddress("ip_address");
            $table->string("user_agent");
            $table->string("os");
            $table->string("browser");
            $table->string("device_type"); // mobile ou desktop
            $table->string("city")->nullable();
            $table->string("state")->nullable();
            $table->boolean("is_bot")->default(false);
            $table->timestamp("entry_time");
            $table->timestamp("exit_time")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("site_visits");
    }
};

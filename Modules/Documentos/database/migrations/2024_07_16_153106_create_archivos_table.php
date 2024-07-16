<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArchivosTable extends Migration
{
    public function up()
    {
        Schema::create('archivos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_documento')->nullable();
            $table->binary('archivo')->nullable();
            $table->timestamps();
            $table->bigInteger('id_padre')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('archivos');
    }
}

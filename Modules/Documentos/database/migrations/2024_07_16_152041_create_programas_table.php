<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramasTable extends Migration
{
    public function up()
    {
        Schema::create('programas', function (Blueprint $table) {
            $table->id();
            $table->string('id_programa', 5)->nullable();
            $table->string('programa')->nullable();
            $table->integer('id_padre')->nullable();
            $table->string('estado')->nullable();
            $table->integer('id_categoria')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('programas');
    }
}
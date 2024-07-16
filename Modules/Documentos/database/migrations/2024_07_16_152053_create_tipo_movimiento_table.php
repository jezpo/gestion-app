<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTipoMovimientoTable extends Migration
{
    public function up()
    {
        Schema::create('tipo_movimiento', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tipo_movimiento');
    }
}


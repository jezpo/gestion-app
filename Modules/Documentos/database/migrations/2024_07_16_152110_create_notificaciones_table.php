<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificacionesTable extends Migration
{
    public function up()
    {
        Schema::create('notificaciones', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_documento')->nullable();
            $table->text('mensaje');
            $table->timestamp('created_at');
            $table->string('estado')->default('Pendiente');
           // Desactiva las marcas de tiempo automáticas
        });
    }

    public function down()
    {
        Schema::dropIfExists('notificaciones');
    }
}

<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentosTable extends Migration
{
    public function up()
    {
        Schema::create('documentos', function (Blueprint $table) {
            $table->id();
            $table->string('cite')->nullable();
            $table->text('descripcion')->nullable();
            $table->string('estado')->nullable();
            $table->string('hash', 32)->nullable();
            $table->integer('id_tipo_documento');
            $table->binary('documento')->nullable();
            $table->string('id_programa', 5);
            $table->integer('id_tipo_movimiento');
            $table->string('remitente');
            $table->timestamps();
            $table->renameColumn('created_at', 'fecha_creacion');
            $table->string('usuario_creacion')->nullable();
            $table->renameColumn('updated_at', 'fecha_modificacion');
            $table->string('usuario_modificacion')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('documentos');
    }
}


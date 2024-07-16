
<li class="has-sub">
    <a href="{{ url('users') }}">
        <i class="material-icons">people</i> <span>Usuarios</span>
    </a>
</li>

<li>
    <a href="{{ url('permissions') }}">       
        <i class="material-icons">lock</i> <span>Permisos</span>
    </a>
</li>

<li>
    <a href="{{ url('roles') }}">    
        <i class="material-icons">security</i><span>Roles</span>
    </a>
</li>

<li>
    <a href="{{ url('dashboard/documentos-reci') }}">
        <i class="material-icons">inbox</i>  <span>Documentos recibidos</span>
    </a>
</li>
<li>
    <a href="{{ url('dashboard/documentos-env') }}">
        <i class="material-icons">send</i> <span>Documentos enviados</span>
    </a>
</li>
<li>
    <a href="{{ url('/flujos/buscar') }}">
        <i class="material-icons">description</i> <span>Buscar Documento</span>
    </a>
</li>
<li>
    <a href="{{ url('/dashboard/flujo-tramites') }}">
        <i class="material-icons">sync_alt</i> <span>Flujo de trámite </span>
    </a>
</li>
<li>
    <a href="{{ url('/dashboard/flujo-documentos') }}">
        <i class="material-icons">description</i> <span>Flujo de documentos </span>
    </a>
</li>

<li>
    <a href="{{ url('/dashboard/tipo-tramites') }}">
        <i class="material-icons">assignment</i>  <span>Trámite</span>
    </a>
</li>
<li>
    <a href="{{ url('/dashboard/programas') }}">
        <i class="material-icons">school</i> <span>Unidad o carrera </span>
    </a>
</li>



<ul class="nav">
    <!-- Usuarios -->
    <li class="has-sub">
        <a href="javascript:void(0);">
            <b class="caret"></b>
            <i class="material-icons">groups</i>
            <span>Usuarios</span>
        </a>
        <ul class="sub-menu">
            <li><a href="{{ url('/users') }}">Lista de Usuarios</a></li>
            <li><a href="{{ url('/users/create') }}">Crear Usuario</a></li>
        </ul>
    </li>

    <!-- Roles -->
    <li class="has-sub">
        <a href="javascript:void(0);">
            <b class="caret"></b>
            <i class="fa fa-user-shield"></i>
            <span>Roles</span>
        </a>
        <ul class="sub-menu">
            <li><a href="{{ url('/roles') }}">Lista de Roles</a></li>
            <li><a href="{{ url('/roles/create') }}">Crear Rol</a></li>
        </ul>
    </li>

    <!-- Permisos -->
    <li class="has-sub">
        <a href="javascript:;">
            <b class="caret"></b>
            <i class="fa fa-key"></i>
            <span>Permisos</span>
        </a>
        <ul class="sub-menu">
            <li><a href="{{ url('/permissions') }}">Lista de Permisos</a></li>
            <li><a href="{{ url('/permissions/create') }}">Crear Permiso</a></li>
        </ul>
    </li>

    <!-- Documentos -->
    <li class="has-sub">
        <a href="javascript:;">
            <b class="caret"></b>
            <i class="fa fa-file-alt"></i>
            <span>Documentos</span>
        </a>
        <ul class="sub-menu">
            <li><a href="{{ url('documentos/crear') }}">Crear Documento</a></li>
            <li><a href="{{ url('documentos/lista') }}">Lista de Documentos</a></li>
            <li><a href="{{ url('documentos/pendientes') }}">Documentos Pendientes</a></li>
        </ul>
    </li>

    <!-- Categorías -->
    <li class="has-sub">
        <a href="javascript:;">
            <b class="caret"></b>
            <i class="fa fa-tags"></i>
            <span>Categorías</span>
        </a>
        <ul class="sub-menu">
            <li><a href="{{ url('categorias/crear') }}">Crear Categoría</a></li>
            <li><a href="{{ url('categorias/lista') }}">Lista de Categorías</a></li>
        </ul>
    </li>

    <!-- Archivos -->
    <li class="has-sub">
        <a href="javascript:;">
            <b class="caret"></b>
            <i class="fa fa-folder-open"></i>
            <span>Archivos</span>
        </a>
        <ul class="sub-menu">
            <li><a href="{{ url('archivos/subir') }}">Subir Archivo</a></li>
            <li><a href="{{ url('archivos/lista') }}">Lista de Archivos</a></li>
            <li><a href="{{ url('archivos/pendientes') }}">Archivos Pendientes</a></li>
        </ul>
    </li>

    <!-- Operaciones -->
    <li class="has-sub">
        <a href="javascript:;">
            <b class="caret"></b>
            <i class="fa fa-cogs"></i>
            <span>Operaciones</span>
        </a>
        <ul class="sub-menu">
            <li><a href="{{ url('operaciones/revision') }}">Revisión de Documentos</a></li>
            <li><a href="{{ url('operaciones/aprobacion') }}">Aprobación de Documentos</a></li>
        </ul>
    </li>

    <!-- Reportes -->
    <li class="has-sub">
        <a href="javascript:;">
            <b class="caret"></b>
            <i class="fa fa-chart-line"></i>
            <span>Reportes</span>
        </a>
        <ul class="sub-menu">
            <li><a href="{{ url('reportes/general') }}">Reporte General</a></li>
            <li><a href="{{ url('reportes/usuarios') }}">Reporte por Usuarios</a></li>
            <li><a href="{{ url('reportes/documentos') }}">Reporte por Documentos</a></li>
            <li><a href="{{ url('reportes/archivos') }}">Reporte por Archivos</a></li>
        </ul>
    </li>

    <!-- Configuración -->
    <li class="has-sub">
        <a href="javascript:;">
            <b class="caret"></b>
            <i class="fa fa-cog"></i>
            <span>Configuración</span>
        </a>
        <ul class="sub-menu">
            <li><a href="{{ url('configuracion/perfil') }}">Perfil</a></li>
            <li><a href="{{ url('configuracion/ajustes') }}">Ajustes</a></li>
        </ul>
    </li>
</ul>

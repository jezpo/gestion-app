@php
$sidebarHide = true;
$headerClass = !empty($headerInverse) ? 'navbar-inverse ' : 'navbar-default ';
$headerMenu = !empty($headerMenu) ? $headerMenu : '';
$hiddenSearch = !empty($headerLanguageBar) ? 'hidden-xs' : '';
$headerMegaMenu = !empty($headerMegaMenu) ? $headerMegaMenu : '';
@endphp
<!-- begin #header -->
<div id="header" class="header {{ $headerClass }}">
    <!-- begin navbar-header -->
    <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed navbar-toggle-left" data-click="sidebar-minify">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a href="/" class="navbar-brand"><strong>@yield('titlePag')</strong></a>
        @if (!$sidebarHide)
            <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        @endif
        @if ($headerMegaMenu)
            <button type="button" class="navbar-toggle p-0 m-r-5" data-toggle="collapse" data-target="#top-navbar">
                <span class="fa-stack fa-lg text-inverse m-t-2">
                    <i class="far fa-square fa-stack-2x"></i>
                    <i class="fa fa-cog fa-stack-1x"></i>
                </span>
            </button>
        @endIf
    </div>
    <!-- end navbar-header -->

    @includeWhen($headerMegaMenu, 'includes.header-mega-menu')

    <!-- begin header-nav -->
    <ul class="navbar-nav navbar-right">
        <li >
        <a href="#" data-toggle="dropdown" class="dropdown-toggle icon" aria-expanded="false">
            <i class="material-icons">inbox</i>
            <span class="label">5</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
            <li class="dropdown-header">Notificaciones</li>
            <li><a href="#">Notificación 1</a></li>
            <li><a href="#">Notificación 2</a></li>
            <li><a href="#">Notificación 3</a></li>
            <li><a href="#">Notificación 4</a></li>
            <li><a href="#">Notificación 5</a></li>
            <li class="dropdown-footer"><a href="#">Ver todas las notificaciones</a></li>
        </ul>
        </li>
            <li class="">
                <a href="#" onclick="cambiar_gestion_periodo_header()" data-toggle="navbar-search" class="icon"> GESTIÓN:
                    @php
                        echo session('id_gestion');
                    @endphp
                </a>
            </li>

        @isset($headerLanguageBar)
            <li class="dropdown navbar-language">
                <a href="#" class="dropdown-toggle pr-1 pl-1 pr-sm-3 pl-sm-3" data-toggle="dropdown">
                    <span class="flag-icon flag-icon-us" title="us"></span>
                    <span class="name d-none d-sm-inline">EN</span> <b class="caret"></b>
                </a>
                <div class="dropdown-menu">
                    <a href="javascript:;" class="dropdown-item"><span class="flag-icon flag-icon-us" title="us"></span>
                        English</a>
                    <a href="javascript:;" class="dropdown-item"><span class="flag-icon flag-icon-cn" title="cn"></span>
                        Chinese</a>
                    <a href="javascript:;" class="dropdown-item"><span class="flag-icon flag-icon-jp" title="jp"></span>
                        Japanese</a>
                    <a href="javascript:;" class="dropdown-item"><span class="flag-icon flag-icon-be" title="be"></span>
                        Belgium</a>
                    <div class="dropdown-divider"></div>
                    <a href="javascript:;" class="dropdown-item text-center">more options</a>
                </div>
            </li>
        @endisset
        <li class="dropdown navbar-user">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <img src="" alt="..." class=" profile_img">
                <span class="d-none d-md-inline">
								{{ Auth::user()->name }}
                </span> <b class="caret"></b>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
               
                <a href="{{-- route('dir.ver.perfil') --}}" class="dropdown-item">Editar Perfil</a>
                <div class="dropdown-divider"></div>
               
                <a href="{{-- route('password') --}}" class="dropdown-item">Cambiar Contraseña</a>
                <div class="dropdown-divider"></div>
                <a href="{{-- url('/logout') --}}" class="dropdown-item" style="color: red;"
                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Cerrar sesión</a>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                    @csrf
                </form>
            </div>
        </li>
    </ul>
    <!-- end header navigation right -->
    {{-- <div class="search-form">
        <button class="search-btn" type="submit"><i class="material-icons">search</i></button>
        <input type="text" class="form-control" placeholder="Buscar algo..." />
        <a href="#" class="close" data-dismiss="navbar-search"><i class="material-icons">close</i></a>
    </div> --}}
</div>
<!-- end #header -->
<!-- modal -->
<div class="modal fade" id="modal-gestion-periodo-header">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header alert-info">
                <h4 class="modal-title" id="nombremateria"><i class="fa fa-undo" aria-hidden="true"></i> Cambiar la Gestión y el Periodo</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
            </div>

            <div class="modal-body">
                <div class="alert alert-danger print-error-msg-header" style="display:none">
                    <ul></ul>
                </div>
                <div class="form-group row m-b-15">
                    <label class="col-md-2 col-sm-2 col-form-label" for="message">Gestión: </label>
                    <div class="col-md-8 col-sm-8">
                        <input class="form-control" type="text" name="gestionheader" value="<?php echo session('id_gestion'); ?>"
                            id="gestionid" placeholder="Gestión">
                    </div>
                </div>
                <div class="form-group row m-b-15">
                    <label class="col-md-2 col-sm-2 col-form-label" for="message">Periodo: </label>
                    <div class="col-md-8 col-sm-8">
                        <input class="form-control" type="text" name="periodoheader" value="<?php echo session('id_periodo'); ?>"
                            id="periodoid" placeholder="Periodo">
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <a href="javascript:;" class="btn btn-outline" data-dismiss="modal"><i class="fa fa-times-circle" aria-hidden="true"></i> Cerrar</a>
                <a href="javascript:;" onclick="GuardarGestionPeriodoHeader();" class="btn btn-primary"><i class="fa fa-save" aria-hidden="true"></i> Guardar Cambios</a>
            </div>
        </div>
    </div>
</div>
<!-- end modal -->
{{--<script>
    function cambiar_gestion_periodo_header() {
        $('#modal-gestion-periodo-header').modal('toggle');
    }

    function GuardarGestionPeriodoHeader() {
        var id_gestion = $('#gestionid').val();
        var id_periodo = $('#periodoid').val();
        $.ajax({
            type: 'POST',
            url: "{{ route('cambiar.gestion.periodo') }}",
            data: {
                _token: '{{ csrf_token() }}',
                gestion: id_gestion,
                periodo: id_periodo
            },
            datatype: 'json',
            success: function(data) {
                if ($.isEmptyObject(data.success)) { //primero verficar si el controlador no manda un success
                    MostrarMensajesHeader(data); //mostrar los errores
                } else { //el controlador mando un succes 
                    swal({
                        icon: "success",
                        title: "Cambiado Correctamente"
                    });
                    location.reload();
                }
                if (!$.isEmptyObject(data.html)) { //verificamos si el retorno es html
                    swal({
                        icon: "error",
                        title: "Error",
                        text: "No se pudo realizar la modificación"
                    });
                }


            }
        });
    }

    function getListCar(selectObject) {
        var value = selectObject.value;
        $.ajax({
            type: 'POST',
            url: "{{ route('cambiar.carrera') }}",
            data: {
                _token: '{{ csrf_token() }}',
                id_programa: value
            },
            datatype: 'json',
            success: function(data) {
                if ($.isEmptyObject(data
                    .success)) { //primero verficar si el controlador no manda un success
                        MostrarMensajesHeader(data); //mostrar los errores
                } else { //el controlador mando un succes 
                    swal({
                        icon: "success",
                        title: "Cambiado Correctamente"
                    });
                    location.reload();
                }
                if (!$.isEmptyObject(data.html)) { //verificamos si el retorno es html
                    swal({
                        icon: "error",
                        title: "Error",
                        text: "No se pudo realizar la modificación"
                    });
                }


            }
        });
    }

    function MostrarMensajesHeader(msg) {
        //msg es un objeto asi q colocamos msg.errors
        $(".print-error-msg-header").find("ul").html('');
        $(".print-error-msg-header").css('display', 'block');
        $.each(msg.errors, function(key, value) { //mostrar la lista de errores

            $(".print-error-msg-header").find("ul").append('<li>' + value + '</li>');
        });
    }
</script>
--}}

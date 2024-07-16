
<li class="has-sub">
    <a href="{{ url('/users') }}">
	<i class="material-icons  ">groups</i>
        <span>
           Usuarios
        </span>
    </a>
</li>

<!-- MENU MODULO CAJAS -->
<li class="has-sub ">
    <a >
        <b class="caret"></b>
        <i class=" fa fa-coins"></i>
        <span>
           Cajas
        </span>
    </a>
    <ul class="sub-menu">
        <li class="has-sub ">
            <a href="javascript:;">
                <b class="caret"></b>
                Operaciones
            </a>
            <ul class="sub-menu">
                <li class="has-sub "><a href="{{ url('cajas.postulaciones.confirmaciones')}}">Confirmaciones</a></li>
                <li class="has-sub "><a href="{{ url('cajas.matricula_digital.lista')}}">Matricula Digital</a></li>
            </ul>
        </li>
    </ul>
</li>
@endrole

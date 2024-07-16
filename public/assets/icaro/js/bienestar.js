$(document).ready( function () {
    $(document).on("submit" ,"#formEdit", function(e){
        $.ajaxSetup({
            header: $('meta[name="_token"]').attr('content')
        });
        e.preventDefault(e);
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: 'json',
            cache: false,
        }).done(function (data) {
            if (data.errors) {
                printErrorMsg(data,2);
            } else {
                if(data[0]==='OK'){
                    swal({
                        icon: "success",
                        title: "Modificado Correctamente"
                    });
                    $('#modal-editar').modal('hide');
                }else{
                    swal({
                        icon: "error",
                        title: "Error",
                        text: data[0]
                    });
                }
                $(".print-error-msg-edit").css('display','none');//ocultar div de errores
            }
            $('#tdLista').DataTable().ajax.reload();
        });
    });
    function printErrorMsg (msg,accion) {
        if(accion==1){
            $(".print-error-msg").find("ul").html('');
            $(".print-error-msg").css('display','block');
            $.each( msg.errors, function( key, value ) {//mostrar la lista de errores
                $(".print-error-msg").find("ul").append('<li>'+value+'</li>');
            });
        }
        else{
            $(".print-error-msg-edit").find("ul").html('');
            $(".print-error-msg-edit").css('display','block');
            $.each( msg.errors, function( key, value ) {//mostrar la lista de errores
                $(".print-error-msg-edit").find("ul").append('<li>'+value+'</li>');
            });
        }
    }
});
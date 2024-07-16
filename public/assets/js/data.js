$(document).ready( function () {
    $(document).on("submit" ,"#formAdd", function(e){
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
            if($.isEmptyObject(data.errors)) {
                if(data[0]==='OK'){
                    swal({
                        icon: "success",
                        title: "Registrado Correctamente"
                    });
                    $('#modal-agregar').modal('hide');
                }else{
                    swal({
                        icon: "error",
                        title: "Error",
                        text: data[0]
                    });
                }
                $(".print-error-msg").css('display','none');//ocultar div de errores
            } else {
                printErrorMsg(data,1);
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

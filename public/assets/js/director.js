function headCsfr(){
    $.ajaxSetup({
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
}
$(document).ready( function () {
    function resizeImages(file, size, complete) {
        // read file as dataUrl
        ////////  2. Read the file as a data Url
        var reader = new FileReader();
        // file read
        reader.onload = function(e) {
                // create img to store data url
                ////// 3 - 1 Create image object for canvas to use
                var img = new Image();
                img.onload = function() {
                    /////////// 3-2 send image object to function for manipulation
                    complete(resizeInCanvasImg(img, size));
                };
                img.src = e.target.result;
            }
            // read file
        reader.readAsDataURL(file);

    }

    function resizeInCanvasImg(img, size) {
        /////////  3-3 manipulate image

        var perferedWidth = size;
        var ratio = perferedWidth / img.width;
        var canvas = $("<canvas>")[0];
        canvas.width = img.width * ratio // 300 //img.width * ratio;// 4*5
        canvas.height = img.height * ratio; //300 // img.height * ratio;// 4*5
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        //////////4. export as dataUrl
        return canvas.toDataURL('image/jpeg');
    }
    $(document).on("submit" ,"#formAdd", function(e){
        headCsfr();
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
    $(document).on("submit" ,"#formAddDeposito", function(e){
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
                printErrorMsg(data,1);
            } else {
                if(data[0]!='ERROR'){
                    swal({
                        icon: "success",
                        title: data[0]
                    });
                    $('#modal-nuevo-deposito').modal('hide');
                    f_depositos(data[1],data[2]);
                }else{
                    swal({
                        icon: "error",
                        title: "Error",
                        text: "No se pudo registrar la venta"
                    });
                }
                $(".print-error-msg").css('display','none');//ocultar div de errores
            }
            
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
    $(document).on("submit" ,"#formDelete", function(e){
        $.ajaxSetup({
            header: $('meta[name="_token"]').attr('content')
        });
        e.preventDefault(e);
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            cache: false,
            dataType: 'html',
            success:function(html){
                if(html=='1')
                    {
                        swal({
                            icon: "success",
                            title: "Eliminado Correctamente"
                        });
                    }else{
                        swal({
                            icon: "error",
                            title: "Error",
                            text: "No se pudo eliminar el registro"
                        });
                    }
                    $('#modal-eliminar').modal('hide');
                    $('#tdLista').DataTable().ajax.reload();
            }
        });
    });
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
            if($.isEmptyObject(data.errors)) {
                if(data[0]==='OK'){
                    swal({
                        icon: "success",
                        title: "Editado Correctamente"
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
            } else {
                printErrorMsg(data,2);
            }
            $('#tdLista').DataTable().ajax.reload();
        });
    });
    $(document).on("submit" ,"#formEdit2", function(e){
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
                        title: "Editado Correctamente"
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
    

    $(document).on("submit" ,"#FormViajes", function(e){
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
            if(data[0]==='OK'){
                swal({
                    icon: "success",
                    title: "Confirmado Correctamente"
                });
            }else{
                swal({
                    icon: "error",
                    title: "Error",
                    text: data[0]
                });
            }
        });
    });
    $(document).on("submit" ,".formView", function(e){
        e.preventDefault(e);
        $.ajax({ 
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: $(this).attr('action'), 
            type: 'POST', 
            data: $(this).serialize(), 
            success: function(view) 
            { 
                $('#informacion').html(view.html); 
            }  
        });
    });
    $(document).on("submit", ".EnviarFoto", function(e) {
        /////////////////////////////////////////////////
        let action = $(this).attr('action');
        file = files = $('#exampleInputFile').get(0).files[0];
        let parameters = {};
        resizeImages(file, 300, function(dataUrl) {
            var buffer = dataUrl;
            parameters = { img: buffer,  _token: window.Laravel['csrfToken'] };
            parameters = JSON.stringify(parameters)
            $.ajaxSetup({
                header: $('meta[name="_token"]').attr('content')
            })
            e.preventDefault(e);
            $.ajax({
                type: "POST",
                url: action,
                data: { parameters: parameters, _token: window.Laravel['csrfToken'] },
                success: function(data) {
                    if (data===0) {
                        swal({
                            icon: "error",
                            title: "Error",
                            text: "No se pudo guardar la foto"
                        });
                    } else {
                        swal({
                            icon: "success",
                            title: "Guardado!",
                            text: "Imagen subida"
                        });
                    }
                },
                error: function(data) {
                    console.log(data)
                }
            })

        });
        return false
    });
});

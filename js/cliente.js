//funcion para editar cliente
function setEditarCliente() {
    var nombre = $('#cliente').val();
    var id = $('#id').val();
    if (!vacio(nombre)) servidor(myLink + "clientes/update.php?id=" + id + "&nombre=" + nombre, function (xhttp) {
        var respuesta = xhttp.responseText;
        if (respuesta == 1) {
            alerta("Cliente Editado!");
            resetearPilaFunction(setMostrarClientes);
        }
    });
    else alerta("Estan los espacios vacios!");
}

//funcion para eliminar el cliente
function setEliminarCliente(id) {
    servidor(myLink + "clientes/delete.php?id=" + id, function (xhttp) {
        var respuesta = xhttp.responseText;
        if (respuesta == 1) {
            alerta("Cliente eliminado con EXITO!");
            setMostrarClientes();
        }
    });
}



//funcion para agregar los clientes
function setAgregarClient() {
    var nombre = $("#cliente").val();
    if (!vacio(nombre)) {
        servidor(myLink + "clientes/add.php?nombre=" + nombre, function (xhttp) {
            var respuesta = xhttp.responseText;

            if (respuesta == 1) {
                alerta("Cliente Registrado!");
                resetearPilaFunction(setMostrarClientes);
            }
        });
    }
    else alerta("Espacios Vacios!");

}


//funcion para mostrar los clientes
function setMostrarClientes() {
    $('#loadingCliente').empty();
    $('#loadingCliente').append("<ons-progress-bar indeterminate></ons-progress-bar>");
    servidor(myLink + "clientes/select.php", function (xhttp) {
        var respuesta = xhttp.responseText;
        var arrayJson = respuesta.split('|');
        listaInfinita('listaClientes', 'loadingCliente', arrayJson, enlistarClientes);
    });
}


//funcion para mostrar clientes
function enlistarClientes(arrayJson) {
    //console.log(arrayJson);
    let html1 = "";

    html1 += '<ons-card class="enlistar boton" onclick="opciones(\'' + arrayJson.id + '\',\'' + arrayJson.nombre + '\')"> ';
    html1 += '    <ons-list-item modifier="nodivider"> ';
    html1 += '        <div class="left"> ';
    html1 += '            <i class="fa-solid fa-user fa-2x" style="color: #44BD66"></i> ';
    html1 += '        </div> ';
    html1 += '        <div class="center textoEnlistar" style="color:linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,255,64,1) 100%);"> ';
    html1 += arrayJson.nombre;
    html1 += '        </div>';
    html1 += '    </ons-list-item> ';
    html1 += '</ons-card>';

    return html1;
}


//mensjae de opciones
function opciones(id, nombre) {
    mensajeArriba("<b>Opciones</b>", ["Editar", "Eliminar"], function (index) {

        if (index == 0) nextPageFunction('clienteEditar.html', function () {

            $('#cliente').val(nombre);
            $('#id').val(id);

        }); //alerta("Entro en editar"+datos);
        else if (index == 1) alertComfirm("Estas seguro de eliminar este cliente?", ["Aceptar", "Cancelar"], function (i) {

            if (i == 0) setEliminarCliente(id);

        }); //setEliminarCliente(id)

    });
}
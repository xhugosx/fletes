//var idCliente;
//editar servicio

function setEditarServicio() {
    var id = $("#id").val();
    var origen = $('#origen').val();
    var destino = $('#destino').val();
    var hrInicio = $('#hrInicio').val();
    var hrTermino = $('#hrTermino').val();
    var costo = $('#costo').val();
    var fecha = $('#fecha').val();
    var observaciones = $('#observaciones').val();
    idCliente = $('#cliente').val();


    if (!vacio(origen, destino, hrInicio, hrTermino, costo, fecha, idCliente)) {
        servidor(myLink + "servicio/update.php?origen=" + origen + "&destino=" + destino + "&hrInicio=" + hrInicio + "&hrTermino=" + hrTermino + "&costo=" + costo + "&fecha=" + fecha + "&observaciones=" + observaciones + "&idCliente=" + idCliente + "&id=" + id, function (xhttp) {
            var respuesta = xhttp.responseText;
            if (respuesta == 1) {
                alerta("Servicio Editado!");
                resetearPilaFunction(setBuscarClienteDebeServicios, idCliente);
            }
            else alerta("No se pudo editar!")
        });
    }
    else alerta("Espacios vacios!");



}


//bucar servicio para editarlo

function setBuscarServicioEditar(id) {
    //llenar option de los clientes
    setBuscarClienteServicio();
    setTimeout(() => {
        servidor(myLink + "servicio/select.php?id_servicio=" + id, function (xhttp) {
            var respuesta = xhttp.responseText;
            //console.log(respuesta);
            var arrayJson = respuesta.split('|');
            var tempJson = JSON.parse(arrayJson[0]);
            $('#id').val(tempJson.id);
            $('#origen').val(tempJson.origen);
            $('#destino').val(tempJson.destino);
            $('#hrInicio').val(tempJson.hr_inicio);
            $('#hrTermino').val(tempJson.hr_termino);
            $('#costo').val(tempJson.costo);
            $('#fecha').val(tempJson.fecha);
            $('#observaciones').val(tempJson.observaciones);
            $('#cliente').val(tempJson.id_cliente);
            //console.log(tempJson.id_cliente);
        });
    }, 200);
    //console.log(myLink+"deben/clienteServicios.php?id="+id+"&fecha1="+fecha1+"&fecha2="+fecha2);
}

function setMandarIngresoServicio(idServicio, fecha) {
    servidor(myLink + "ingreso/add.php?id_servicio=" + idServicio + "&fecha=" + fecha, function (xhttp) {
        var respuesta = xhttp.responseText;
        if (respuesta == 1) {
            //console.log(respuesta);
            alerta("Servicio Pagado");
            resetearPilaFunction(setBuscarClientesDeben);
        }
    });
}

//funcion para eliminaer el servicio
function setEliminarServicioDeben(id) {
    servidor(myLink + "servicio/delete.php?id=" + id, function (xhttp) {
        var respuesta = xhttp.responseText;
        if (respuesta == 1) {
            alerta("Servicio Eliminado");
            resetearPilaFunction(setBuscarClientesDeben);
        }
    });
}


function setBuscarClientesDeben() {
    $('#loadingClienteDeben').empty();
    $('#loadingClienteDeben').append("<ons-progress-bar indeterminate></ons-progress-bar>");

    servidor(myLink + "servicio/selectCliente.php?fechaInicio=" + fecha1 + "&fechaFin=" + fecha2, function (xhttp) {
        var respuesta = xhttp.responseText;
        var arrayJson = respuesta.split('|');
        listaInfinita('listaClientesDeben', 'loadingClienteDeben', arrayJson, enlistarClientesDeben);
    });
    // actualizar siempre la pagina principal
    setBuscarHome();
}


function setBuscarClienteDebeServicios(id) {
    $('#loadingServicios').empty();
    $('#loadingServicios').append("<ons-progress-bar indeterminate></ons-progress-bar>");
    servidor(myLink + "servicio/select.php?id=" + id + "&fechaInicio=" + fecha1 + "&fechaFin=" + fecha2, function (xhttp) {
        var respuesta = xhttp.responseText;
        var arrayJson = respuesta.split('|');
        listaInfinita('listaServicios', 'loadingServicios', arrayJson, enlistarClientesServicios);
    });
}


//mensjae de opciones debe servicio
function opcionesDeben(id) {
    mensajeArriba("<b>Opciones</b>", ["<span style=\"color:#03C03C\"><b>Ya pago!</b></span>", "Editar", "Eliminar"], function (index) {
        if (index == 0) alertComfirmDato("Cuando Pago?", "date", "Aceptar", function (dato) {

            if (dato == "") alerta("Selecciona la fecha primero");
            else if (dato != null) setMandarIngresoServicio(id, dato);

        });
        else if (index == 1) nextPageFunction("servicioEditar.html", setBuscarServicioEditar, id);
        else if (index == 2) alertComfirm("Estas seguro de eliminar este Servicio?", ["Aceptar", "Cancelar"], function (opcion) {
            if (opcion == 0) setEliminarServicioDeben(id);
        });
    });
}

function enlistarClientesServicios(arrayJson) {
    var html = "";
    //"id": "2", "origen": "ECO EMPAQUES", "destino": "PCM", "hrInicio": "10:53:00", "hrTermino": "00:52:00", "costo": "1500", "fecha": "2023-06-26", "observaciones": ""
    html += '<ons-card class="enlistar boton" onclick="opcionesDeben(' + arrayJson.id + ')" style="padding: 15px;">';
    html += '    <div>';
    html += '        <div style="float: right; color: gray;"><b>Fecha del servicio:</b> ' + formatearFecha(arrayJson.fecha) + '</div><br><hr>';
    html += '        <table>';
    html += '            <tr>';
    html += '                <td style="font-weight: bold">Origen:</td> ';
    html += '                <td style="font-weight: bold">Destino:</td> ';
    html += '            </tr>';
    html += '            <tr>';
    html += '                <td >' + arrayJson.origen + '</td>';
    html += '                <td>' + arrayJson.destino + '</td>';
    html += '            </tr>';
    html += '            <tr>';
    html += '                <td style="font-weight: bold">Inicio</td>';
    html += '                <td style="font-weight: bold">Termino</td>';
    html += '            </tr>';
    html += '            <tr>';
    html += '                <td>' + arrayJson.hr_inicio + '</td>';
    html += '                <td>' + arrayJson.hr_termino + '</td>';
    html += '            </tr>';
    html += '            <tr>';
    html += '                <td style="font-weight: bold">Observaciones: </td>';
    html += '            </tr>';
    html += '            <tr>';
    html += '                 <td>' + (arrayJson.observaciones == "" ? "(sin observaciones)" : arrayJson.observaciones) + '</td>';
    html += '            </tr>';
    html += '        </table>';
    html += '        <br><hr>';
    html += '        <center><div style="font-size: 25px; font-weight: bold; color:#C23B22">  $' + new Intl.NumberFormat().format(arrayJson.costo) + '</div></center>';
    html += '    </div>';
    html += '</ons-card>';


    return html;
}
//{ "id": "1", "origen": "en donde sea", "destino": "al otro lado", "hr_inicio": "15:55:00", "hr_termino": "15:56:00", "costo": "350", "fecha": "2024-12-10", "observaciones": "", "cliente_nombre": "SALVADOR CORONA SUPER MAMADO" }|

function enlistarClientesDeben(arrayJson) {
    var html = "";
    html += '<ons-card class="enlistar boton" onclick="nextPageFunction(\'servicios.html\',setBuscarClienteDebeServicios,' + arrayJson.id_cliente + ')">';
    html += '    <ons-list-item modifier="nodivider">';
    html += '        <div class="left">';
    html += '            <i class="fa-solid fa-user fa-2x" style="color: #44BD66"></i> ';
    html += '        </div>';
    html += '        <div class="center textoEnlistar" style="color:linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,255,64,1) 100%);">';
    html += '            <span class="list-item__title" style="font-size:larger;margin-bottom: 5px;">' + arrayJson.cliente_nombre + '</span>';
    html += '            <span class="list-item__subtitle">Servicios: ' + arrayJson.cantidad_servicios + '</span>';
    html += '        </div>';
    html += '        <div class="right" style="font-size:large; color:#C23B22"> <span style="font-weight:bold">$' + new Intl.NumberFormat().format(arrayJson.costo_total) + '</span> </div>';
    html += '    </ons-list-item>';
    html += '</ons-card>';
    return html;
}
//{ "id_cliente": "3", "cliente_nombre": "SALVADOR CORONA SUPER MAMADO", "cantidad_servicios": "1", "costo_total": "350" }|
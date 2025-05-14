function setBuscarClientesPagado() {
    $('#loadingClientePagado').empty();
    $('#loadingClientePagado').append("<ons-progress-bar indeterminate></ons-progress-bar>");

    servidor(myLink + "servicio/selectCliente.php?accion=pagado&fechaInicio=" + fecha1 + "&fechaFin=" + fecha2, function (xhttp) {
        var respuesta = xhttp.responseText;
        var arrayJson = respuesta.split('|');
        listaInfinita('listaClientesPagado', 'loadingClientePagado', arrayJson, enlistarClientesPagado);
        //console.log(myLink + "servicio/select.php?accion=pagado&fechaInicio=" + fecha1 + "&fechaFin=" + fecha2);
    });
    setBuscarHome();
}
var id_global_cliente;
function setBuscarClientePagadoServicios(id) {
    $('#loadingServiciosPagado').empty();
    $('#loadingServiciosPagado').append("<ons-progress-bar indeterminate></ons-progress-bar>");
    servidor(myLink + "servicio/select.php?id=" + id + "&accion=pagado&fechaInicio=" + fecha1 + "&fechaFin=" + fecha2, function (xhttp) {
        var respuesta = xhttp.responseText;
        var arrayJson = respuesta.split('|');
        listaInfinita('listaServiciosPagado', 'loadingServiciosPagado', arrayJson, enlistarClientesPagadoServicios);
    });
    id_global_cliente = id;
}

//opciones para pagado
function opcionesPagado(id,fecha_pago) {
    //console.log(id);
    mensajeArriba("<b>Opciones</b>", ["Editar fecha", "Eliminar Ingreso"], function (index) {
        if (index == 0) alertComfirmDato("Editar fecha de pago", "date", "Aceptar", function (dato) {

            if (dato == "") alerta("Selecciona la fecha primero");
            else if (dato != null) editarIngreso(id, dato);

        },0,fecha_pago);
        else if (index == 1) alertComfirm("Estas seguro de eliminar este Ingreso?", ["Aceptar", "Cancelar"], function (opcion) {
            if (opcion == 0) eliminarIngreso(id);
        });
    });
}
//funcion para enlitar servicios pagados
function enlistarClientesPagadoServicios(arrayJson) {
    var html = "";
    //"id": "2", "origen": "ECO EMPAQUES", "destino": "PCM", "hrInicio": "10:53:00", "hrTermino": "00:52:00", "costo": "1500", "fecha": "2023-06-26", "observaciones": ""
    html += '<ons-card class="enlistar boton" onclick="opcionesPagado(' + arrayJson.id_ingreso + ',\''+arrayJson.fecha_pago+'\')" style="padding: 15px;">';
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
    html += '        <hr>';
    html += '        <center><div style="font-size: 25px; font-weight: bold; color:#03C03C">  $' + new Intl.NumberFormat().format(arrayJson.costo) + '</div></center><hr>';
    html += '        <div style="float: right; color: gray;"><b> Pagado:</b> ' + formatearFecha(arrayJson.fecha_pago) + '</div><br>';
    html += '    </div>';
    html += '</ons-card>';


    return html;
}

function enlistarClientesPagado(arrayJson) {
    var html = "";
    html += '<ons-card class="enlistar boton" onclick="nextPageFunction(\'serviciosPagado.html\',setBuscarClientePagadoServicios,' + arrayJson.id_cliente + ')">';
    html += '    <ons-list-item modifier="nodivider">';
    html += '        <div class="left">';
    html += '            <i class="fa-solid fa-user fa-2x" style="color: #44BD66"></i> ';
    html += '        </div>';
    html += '        <div class="center textoEnlistar" style="color:linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,255,64,1) 100%);">';
    html += '            <span class="list-item__title" style="font-size:larger;margin-bottom: 5px;">' + arrayJson.cliente_nombre + '</span>';
    html += '            <span class="list-item__subtitle">Servicios: ' + arrayJson.cantidad_servicios + '</span>';
    html += '        </div>';
    html += '        <div class="right" style="font-size:large; color:#03C03C"> <span style="font-weight:bold">$' + new Intl.NumberFormat().format(arrayJson.costo_total) + '</span> </div>';
    html += '    </ons-list-item>';
    html += '</ons-card>';
    return html;
}
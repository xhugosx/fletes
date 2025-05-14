function setAgregarServicio() {
    var origen = $('#origen').val();
    var destino = $('#destino').val();
    var hrInicio = $('#hrInicio').val();
    var hrTermino = $('#hrTermino').val();
    var costo = $('#costo').val();
    var fecha = $('#fecha').val();
    var observaciones = $('#observaciones').val();
    var idCliente = $('#cliente').val();
    if (!vacio(origen, destino, hrInicio, hrTermino, costo, fecha, idCliente)) {
        servidor(myLink + "servicio/add.php?destino=" + destino + "&origen=" + origen + "&hrInicio=" + hrInicio + "&hrTermino=" + hrTermino + "&costo=" + costo + "&fecha=" + fecha + "&observaciones=" + observaciones + "&idCliente=" + idCliente, function (xhttp) {
            var respuesta = xhttp.responseText;
            if (respuesta == 1) {
                alerta("Servicio Registrado con Exito!");
                resetearPilaFunction(setBuscarHome);
            }
        });
    }
    else alerta("Espacios vacios!")

    //console.log(origen,destino,hrInicio,hrTermino,costo,fecha,observaciones);
}

function setBuscarClienteServicio() {
    servidor(myLink + "clientes/select.php", function (xhttp) {
        var respuesta = xhttp.responseText;
        //console.log(respuesta);
        var arrayJson = respuesta.split("|");
        for (i = 0; i < arrayJson.length - 1; i++) {
            arrayJson[i] = JSON.parse(arrayJson[i]);
            $("#cliente").append('<option value="' + arrayJson[i].id + '" >' + arrayJson[i].nombre + '</option>')
        }
    });
}
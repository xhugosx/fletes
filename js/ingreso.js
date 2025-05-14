function buscarDebenPagado() {
    var fecha1 = $("#fecha1").val();
    var fecha2 = $("#fecha2").val();

    if (vacio(fecha1, fecha2)) alerta("Selecciona una fecha");
    else {
        if (Date.parse(fecha1) > Date.parse(fecha2)) alerta('Fecha Incorrecta')
        else alerta('Felicidades!');
    }

    //console.log(fecha1,fecha2);
}
function eliminarIngreso(id) {
    //console.log(myLink+"ingreso/delete.php?id="+id);
    servidor(myLink + "ingreso/delete.php?id=" + id, function (xhttp) {
        var respuesta = xhttp.responseText;
        if (respuesta == 1) {
            alerta("Ingreso eliminado con Exito!");
            resetearPilaFunction(setBuscarClientesPagado);
        }
        //console.log(respuesta);
    });
}

function editarIngreso(id, fecha) {
    servidor(myLink + "ingreso/update.php?id=" + id + "&fecha=" + fecha, function (xhttp) {
        var respuesta = xhttp.responseText;
        if (respuesta == 1) {
            alerta("Fecha actualizada");
            setBuscarClientePagadoServicios(id_global_cliente);
        }
        //console.log(myLink + "ingreso/update.php?id=" + id + "&fecha=" + fecha);
    });
}
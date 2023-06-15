function buscarDebenPagado()
{
    var fecha1 = $("#fecha1").val();
    var fecha2 = $("#fecha2").val();

    if(vacio(fecha1,fecha2)) alerta("Selecciona una fecha");
    else 
    {
        if(Date.parse(fecha1) > Date.parse(fecha2)) alerta('Fecha Incorrecta')
        else alerta('Felicidades!');
    }

    console.log(fecha1,fecha2);
}


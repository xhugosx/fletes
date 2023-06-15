var chart;

var deben; 
var pagado;

var fecha1="", fecha2="";

function llenarFecha()
{

  if( $("#fecha1").val() != "" && $("#fecha2").val() != "" )
  {
    fecha1 = $("#fecha1").val();
    fecha2 = $("#fecha2").val();
    setBuscarHome();
  }
  
}

function setBuscarHome()
{
  console.log(fecha1,fecha2);
  servidor("https://fletes-delgado.000webhostapp.com/fletes/home/home.php?fecha1="+fecha1+"&fecha2="+fecha2,getBuscarHome);
}
function getBuscarHome(xhttp)
{
  var arreglo = xhttp.responseText.split('|');

  deben = Number.isNaN(parseFloat (arreglo[0])) ? 0 : parseFloat (arreglo[0]);
  pagado = Number.isNaN(parseFloat (arreglo[1])) ? 0 : parseFloat (arreglo[1]);

  $("#deben").text("$ " +new Intl.NumberFormat().format(deben));
  $("#pagado").text("$ " +new Intl.NumberFormat().format(pagado));
  $("#total").text("$ " + new Intl.NumberFormat().format(deben  + pagado))

  graficaPorcentajes();
  
}

function graficaPorcentajes()
{
  var _deben = (deben/(deben+pagado)) * 100;
  var _pagado = 100 - _deben;
  _deben = Math.trunc(_deben);
  _pagado = Math.trunc(_pagado); 
  //console.log(_deben,_pagado);
  if(chart) 
  {
    chart.data.datasets[0].data = [ _pagado , _deben];
    chart.update();
  }
  else
  {
    const data = {
        labels: [
          'Pagado %'+_pagado,
          'Deben %'+_deben
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [ _pagado , _deben],
          backgroundColor: [
            'rgba(163,221,203,0.8)',
            'rgba(229,112,126,0.8)'
            
          ],
          hoverOffset: 4
        }]
      };

      chart = new Chart(grafica,{
          type: "doughnut",
          data: data,
    });
  }

    
}

function bloquearFechas(e)
{
  var checked = e.target.checked;
  if(checked)
  {
    $("#fecha1").attr("disabled",true);
    $("#fecha2").attr("disabled",true);
    $("#fecha1").val("");
    $("#fecha2").val("");
    fecha1 = "";
    fecha2 = "";
    setBuscarHome()
  }
  else
  {
    $("#fecha1").attr("disabled",false);
    $("#fecha2").attr("disabled",false);
  }
}
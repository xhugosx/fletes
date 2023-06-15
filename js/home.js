var chart;

var deben; 
var pagado;

function setBuscarHome()
{
  servidor("https://fletes-delgado.000webhostapp.com/fletes/home/home.php",getBuscarHome);
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
  //console.log(xhttp.responseText);
}

function graficaPorcentajes()
{
  var _deben = (deben/(deben+pagado)) * 100;
  var _pagado = 100 - _deben;
  _deben = Math.trunc(_deben);
  _pagado = Math.trunc(_pagado);  

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

function bloquearFechas(e)
{
  var checked = e.target.checked;
  if(checked)
  {
    $("#fecha1").attr("disabled",true);
    $("#fecha2").attr("disabled",true);
  }
  else
  {
    $("#fecha1").attr("disabled",false);
    $("#fecha2").attr("disabled",false);
  }
}